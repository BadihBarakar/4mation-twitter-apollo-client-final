import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

import '../css/tweets.css';

library.add(faHeart, faHeartBroken)
class Tweet extends Component {
    
    render() {
        const { tweet } =this.props;

        const heartColor = tweet.favorited ? "red" : "lightgray";

        return (
            <div className="tweetBox">
                <div className="tweetProp">
                    <div className="tweetLabel">
                        Created At: 
                    </div>
                    <div className="tweetValue">
                        {tweet.created_at}
                    </div>
                    <div className="tweetLike">
                        <FontAwesomeIcon icon={faHeart} 
                            style={{color: heartColor, cursor: "pointer"}} 
                            onClick={() => {
                                if(tweet.favorited) this.props.unlike(tweet.id_str)
                                else this.props.like(tweet.id_str);
                                 }}/>
                    </div>
                </div>
                <div className="tweetProp">
                    <div className="tweetLabel">
                        Tweeted by: 
                    </div>
                    <div className="tweetValue">
                        {tweet.user.screen_name + " (" + tweet.user.name + ")"}
                    </div>
                    <div className="tweetLike">
                        
                    </div>
                </div>
                <div className="tweetProp">
                    <div className="tweetLabel">
                        Tweet ID: 
                    </div>
                    <div className="tweetValue">
                        {tweet.id_str}
                    </div>
                    <div className="tweetLike">
                    </div>
                </div>
                <div className="tweetProp">
                    <div className="tweetLabel">
                        Tweet Text: 
                    </div>
                    <div className="tweetValue">
                        {tweet.text}
                    </div>
                    <div className="tweetLike">
                    </div>
                </div>
            </div>
        );
    }
}

export default Tweet;