import React, { useState } from 'react';
import { Button } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';

import './style.css';
import { CATEGORY_JOKES } from '../../graphql/query';

const Jokes = ({ categories, client }) => {
    const [joke, setJoke] = useState(null);
    const [clickedCategory, setClickedCategory] = useState(null);

    const [queryCategoryJokes, { called, loading, data }] = useLazyQuery(
        CATEGORY_JOKES,
        { variables: { category: clickedCategory } }
      );

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
                            queryCategoryJokes()
                        }}
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
            <div className="random_jokes_container">jokes</div>
        </div>
    );
};

export default Jokes;
