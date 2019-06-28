import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import '../css/usertweets.css';
import Tweet from './tweet';

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { ApolloConsumer } from 'react-apollo';

const GET_USER_TWEETS = gql`
    query UserTweets($uid: String!) {
        userTweets(uid: $uid) {
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

class UserTweets extends Component {
    state = {
        tweets: [],
        userName: "",
        err: {},
        renderQuery: ""
    }

    handleLike = (id, client) => {
        const { userName } = this.state;
        console.log('it is not liked... like it...');

        // it is not liked... like it...
        fetch('http://localhost:3001/favorites/create/'+id,
            {
                method: 'post'
            })
            .then(response => {
                // console.log(response);
                return client.query({
                    query: GET_USER_TWEETS, 
                    variables: {uid: userName},
                    fetchPolicy: 'network-only'
                });
            })
            .then(response => {
                // console.log("Like: ", response.data);
                this.setState({ tweets: response.data.userTweets });
            })
            .catch(err => {
                console.log(err);
                this.setState({ err });
            })
    }

    handleUnLike = (id, client) => {
        const { userName } = this.state;
        
        // it is liked... unlike it...
        fetch('http://localhost:3001/favorites/destroy/'+id,
            {
                method: 'post'
            })
            .then(response => {
                // console.log(response);
                return client.query({
                    query: GET_USER_TWEETS, 
                    variables: {uid: userName},
                    fetchPolicy: 'network-only'
                });
            })
            .then(response => {
                // console.log("UnLike: ", response.data);
                this.setState({ tweets: response.data.userTweets });
            })
            .catch(err => {
                console.log(err);
                this.setState({ err });
            })
    }

    // handleLookupClick = () => {
    //     const { userName } = this.state;
    //     this.setState({ renderQuery: "" });
        
    //     // check if the userName is not empty and run the fetch API...
    //     if(userName)
    //     {
    //         // fetch('http://localhost:3001/statuses/tweets/'+userName,
    //         //     {
    //         //         method: 'get'
    //         //     })
    //         // .then(response => response.json())
    //         // .then(data => {
    //         //     let tweets = [...data];
    //         //     this.setState({ tweets });
    //         // })
    //         // .catch(err => {
    //         //     console.log(err);
    //         //     this.setState({ err });
    //         // })
    //         let uid = userName;
    //         let q = (<Query
    //                     query={GET_USER_TWEETS} variables={{ uid }} pollInterval={100}
    //                 >
    //                     {({ loading, error, data, startPolling, stopPolling }) => {
    //                         console.log('Running Query');
    //                     if (loading) return <p>Loading...</p>;
    //                     if (error) {
    //                         console.log(error);
    //                         return <p>Error :(</p>
    //                     };
    //                     if(startPolling) console.log('polling started');
    //                     if(stopPolling) console.log('polling stopped');

    //                     console.log("Tweets: ", data);
    //                     return data.userTweets.map((t) => <Tweet key={t.id_str} tweet={t} like={this.handleLike} unlike={this.handleUnLike}  />);
    //                     }}
    //                 </Query>);
    //         this.setState({ renderQuery: q });
    //     }
    //     else
    //     {
    //         this.setState({ renderQuery: "" });
    //     }
    // }

    handleInputChange = (event) => {
        const { currentTarget } = event;
        let userName = currentTarget.value;

        this.setState({ userName });
    }

    render() {
        return (
            <ApolloConsumer>
                {
                    client => (
                        <React.Fragment>

                            <div className="divTitle">User Tweets Lookup</div>
                            <div id="divLookup" className="lookupDiv">
                                <div className="textInputDiv">
                                    <input className="form-control"
                                        onChange={this.handleInputChange}></input>
                                </div>
                                <div className="buttonDiv">
                                    <button className="btn btn-primary"
                                        onClick={async () => {
                                                const { data } = await client.query({
                                                    query: GET_USER_TWEETS, 
                                                    variables: {uid: this.state.userName},
                                                    fetchPolicy: 'network-only'
                                                });
                                                this.setState({ tweets: data.userTweets });
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
                                {/* {this.state.renderQuery} */}
                            </div>
                        </React.Fragment>
                    )
                }
            </ApolloConsumer>
        );
    }
}

export default UserTweets;