import React, { Component } from 'react';
import Tweet from './tweet';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFeather } from '@fortawesome/free-solid-svg-icons';

import '../css/tweetcomposer.css';
import { write } from 'fs';

import { Query, ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";

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

library.add(faFeather);

class SubTweetComposer extends Component {
    state = {
        tweets: [],
        userName: "",
        err: {},
        tweet: '',
        renderQuery: ""
    }

    componentDidMount = async () => {
        // get the tweets of the the authorised user 
        // and display it in the tweets section...
        let userName = "badih76";

        const { data } = await this.props.client.query({
            query: GET_USER_TWEETS, 
            variables: {uid: userName},
            fetchPolicy: 'network-only'
        });
        this.setState({ tweets: data.userTweets });

    }

    handleInputChange = (event) => {
        const { currentTarget } = event;
        let tweet = currentTarget.value;

        this.setState({ tweet });
    }

    handlePostClick = (client) => {
        // check if the userName is not empty and run the fetch API...
        const { tweet } = this.state;
        const userName = "badih76";

        if(tweet)
        {
            fetch('http://localhost:3001/statuses/update/'+tweet,
                {
                    method: 'post'
                })
                .then(response => {
                    return client.query({
                        query: GET_USER_TWEETS, 
                        variables: {uid: userName},
                        fetchPolicy: 'network-only'
                    });
                })
                .then(response => {
                    this.setState({ tweets: response.data.userTweets });
                })
                .catch(err => {
                    this.setState({ err });
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="divTitle">Tweet Composer</div>
                <div id="divTweets">
                    {this.state.tweets && this.state.tweets.length > 0 ? 
                        this.state.tweets.map(t => {
                            return <Tweet key={t.id_str} tweet={t} />
                        }) :
                        "No Tweets to Display"
                    }
                </div>
                <div id="divCoposer" className="composerDiv">
                    <div className="textAreaDiv">
                        <textarea className="form-control" value={this.state.tweet}
                            onChange={this.handleInputChange}>

                        </textarea>
                    </div>
                    <div className="composeButtonDiv">
                        <button className="btn btn-primary"
                            onClick={() => this.handlePostClick(this.props.client)}>
                                <FontAwesomeIcon icon={faFeather} />
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

class TweetComposer extends Component {
    render () {
        return (
            <ApolloConsumer>
                {client => (
                    <SubTweetComposer {...this.props} client={client} />
                )}
            </ApolloConsumer>
        )
    }

}

export default TweetComposer;
