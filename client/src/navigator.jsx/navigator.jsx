import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserTweets from '../components/usertweets';
import TweetComposer from '../components/tweetcomposer';
import TweetsLookup from '../components/tweetslookup';

class MyNavigator extends Component {
   render() {
      return (
        <Switch>
            <Route path="/usertweets" render={(props) => <UserTweets {...props} />} />
            <Route path="/tweet" render={(props) => <TweetComposer {...props} />} />
            <Route path="/looklike" render={(props) => <TweetsLookup {...props} />} />
        </Switch>
      );
   }
}

export default MyNavigator;