import React, { useState } from 'react';
import OptionsButtons from './components/optionsbuttons';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import './css/additionalstyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNavigator from './navigator.jsx/navigator';

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

function App() {
  const options = [
    {label: 'User Tweets', link: 'usertweets'}, 
    {label: 'Tweet', link: 'tweet'},
    {label: 'Lookup and Like', link: 'looklike'}];

  const [optionButtons, setOptionsButtons ] = useState(options);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <OptionsButtons options={optionButtons} />
        </header>
        <div className="bodyContents">
          <MyNavigator />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
