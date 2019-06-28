import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Tweet from './tweet';
import '../css/usertweets.css';

import { Query, ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";

const GET_LOOKUP_TWEETS = gql`
    query SearchTweets($keyword: String!) {
        searchTweets(keyword: $keyword) {
            id_str,
            text,
            favorited,
            user {
                screen_name,
                name
            }
        }
    }
`;

library.add(faSearch);

class TweetsLookup extends Component {
    state = {
        keyword: '',
        tweets: []
    }

    handleLike = (id, client) => {
        console.log('it is not liked... like it...');

        // it is not liked... like it...
        fetch('http://localhost:3001/favorites/create/'+id,
            {
                method: 'post'
            })
            .then(response => {
                if(response.status === 200)
                {
                    // The like was successfull
                    // update the tweets in state...
                    let tweets = [...this.state.tweets];
                    let i = tweets.findIndex(t => t.id_str === id);
                    tweets[i].favorited = true;
                    this.setState({ tweets });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ err });
            })
    }


    handleUnLike = (id, client) => {        
        // it is liked... unlike it...
        fetch('http://localhost:3001/favorites/destroy/'+id,
            {
                method: 'post'
            })
            .then(response => {
                if(response.status === 200)
                {
                    // The unlike was successfull
                    // update the tweets in state...
                    let tweets = [...this.state.tweets];
                    let i = tweets.findIndex(t => t.id_str === id);
                    tweets[i].favorited = false;
                    this.setState({ tweets });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ err });
            })
    }

    handleInputChange = (event) => {
        const { currentTarget } = event;
        let keyword = currentTarget.value;

        this.setState({ keyword });
    }

    render() {
        return (
            <ApolloConsumer>
                {
                    client => (
                        <React.Fragment>
                            <div className="divTitle">Tweets Lookup & Like</div>
                            <div id="divLookup" className="lookupDiv">
                                <div className="textInputDiv">
                                    <input className="form-control" value={this.state.keyword}
                                        onChange={this.handleInputChange}></input>
                                </div>
                                <div className="buttonDiv">
                                    <button className="btn btn-primary"
                                        onClick={
                                            async () => {
                                                const { data } = await client.query({
                                                    query: GET_LOOKUP_TWEETS, 
                                                    variables: {keyword: this.state.keyword},
                                                    fetchPolicy: 'network-only'
                                                });
                                                this.setState({ tweets: data.searchTweets });
                                            }
                                        }>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                </div>
                            </div>
                            <div id="divTweets">
                                {this.state.tweets && this.state.tweets.length > 0 ? 
                                    this.state.tweets.map(t => {
                                        return <Tweet key={t.id_str} tweet={t}
                                                    like={() => this.handleLike(t.id_str, client)} 
                                                        unlike={() => this.handleUnLike(t.id_str, client)} />
                                    }) :
                                    "No Tweets to Display"
                                }
                                
                            </div>
                        </React.Fragment>
                    )
                }
            </ApolloConsumer>
        );
    }
}

export default TweetsLookup;