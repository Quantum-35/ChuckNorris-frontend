import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';
import { withApollo } from 'react-apollo';
import Loader from 'react-loader-spinner';

import './style.css';
import { CATEGORY_JOKES, JOKES } from '../../graphql/query';

const Jokes = ({ categories, client }) => {
    const [joke, setJoke] = useState(null);
    const [fetchingJokes, setFetchingJokes] = useState(false);
    const [clickedCategory, setClickedCategory] = useState(null);

    const [queryRandomJokes, response] = useLazyQuery(
        JOKES,
        { fetchPolicy: "network-only" }
      );
    
    useEffect(() => {
        queryRandomJokes();
    }, []);

    useEffect(() => {
        if(response) {
            setJoke(response.data && response.data.jokes)
        }
    }, [response]);

    const queryCategoryJokes = async() => {
    setFetchingJokes(true);
    const res = await client.query({
        query: CATEGORY_JOKES,
        variables: {
            category: clickedCategory
        },
        fetchPolicy: "network-only"
    })
    setJoke(res.data.categoryJokes);
    setFetchingJokes(false);
};

    const displayCategoryList = () => {
        if(Array.isArray(categories)) {
            return categories.map((categoryName, i) => {
                return(
                    <Button
                        key={i}
                        type="primary" ghost 
                        className="jokes_category___button"
                        onClick={() => setClickedCategory(categoryName)}
                    >
                        {categoryName}
                    </Button>
                );
            });
        }
    }

    return(
        <div className="jokes__container" >
            <div className="jokes_categories__container">
                <div style={{ margin: "0 6em" }}>
                    {displayCategoryList()}
                <div className="random_jokes__fetch">
                    <span className="random_jokes_categoryName">Category: {clickedCategory || 'none'}</span>
                    <Button type="primary" loading={fetchingJokes} onClick={() => {queryCategoryJokes()}}>
                        Get Joke
                    </Button>
                </div>
                </div>
            </div>
            <div className="random_jokes_container">
                {fetchingJokes ? (
                    <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        // timeout={3000}
                    />
                ): (
                    <React.Fragment>
                        <img className="random_jokes__img" src={joke && joke.icon_url} alt="icon" />
                        <span style={{ fontSize: '1.5em'}}>Category: {joke && joke.categories && joke.categories[0]}</span>
                        <span style={{ fontSize: '1.5em'}}><u>Joke</u></span>
                        <span style={{ fontSize: '1.5em'}}>{joke && joke.value}</span>
                    </React.Fragment>
                )
                }
            </div>
        </div>
    );
};

export default withApollo(Jokes);
