import React from 'react';
import { Query } from 'react-apollo';
import Loader from 'react-loader-spinner'

import { CATEGORIES } from '../../graphql/query';
import Jokes from './jokes';
import './style.css';

const Home = props => {
    
    return(
        <div className="container" >
            <Query query={CATEGORIES}>
                {({loading, data, errors}) => {
                    if(loading) {
                        return (
                            <Loader
                                type="Bars"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                // timeout={3000}
                            />
                        )
                    } else if (data) {
                        if(Array.isArray(data.categories)) {
                            console.log('-->', data.categories)
                            return <Jokes categories={data.categories} />
                        }
                        return <div>
                                    Sorry there was an issue displaying jokes :(
                            </div>
                    }
                }}
            </Query>
        </div>
    );
}

export default Home;