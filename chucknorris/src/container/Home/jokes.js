import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';
import { withApollo } from 'react-apollo';
import Loader from 'react-loader-spinner';

import './style.css';
import { CATEGORY_JOKES, JOKES } from '../../graphql/query';

const Jokes = ({ categories, client }) => {
    const [joke, setJoke] = useState(null);
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

    const [queryCategoryJokes, {called, loading, data}] = useLazyQuery(
        CATEGORY_JOKES,
        { variables: { category: clickedCategory }, fetchPolicy: "network-only" }
      );
    
    useEffect(() => {
        if(data) {
            setJoke(data.categoryJokes);
        }
    },[data]);

    const displayCategoryList = () => {
        if(Array.isArray(categories)) {
            return categories.map((categoryName, i) => {
                return(
                    <Button
                        key={i}
                        type="primary" ghost 
                        className="jokes_category___button"
                        onClick={() => {
                            setClickedCategory(categoryName);
                            queryCategoryJokes();
                        }
                        }
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
                <div style={{ margin: "6em" }}>
                    {displayCategoryList()}
                </div>
            </div>
            <div className="random_jokes_container">
                {loading ? (
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
