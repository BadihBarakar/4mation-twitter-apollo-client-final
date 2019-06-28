var cors = require('cors');
const Twitter = require('twitter');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

const config = {
    consumer_key: 'YKdVZe147eJ94mxfIVsHGPJrJ',
    consumer_secret: 'ijeFjfsIgMBfu1hGBFLSz4dxBMMzwOBmI24vavrXFsGMIHCl1a',
    access_token_key: '2682232230-r7r6qN4zq3zraVvfpy8fMmZAelr5Z8iTfI8vZgO',
    access_token_secret: '2ub5so7AMEo7okHRHwG5PB2RLCY2zq70wKSibEoT7fEot'
  }
  
const client = new Twitter(config);

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        screen_name: {type: GraphQLString},
        name: {type: GraphQLString}
    })
})

const UserTweetType = new GraphQLObjectType({
    name: 'UserTweet',
    fields:() => ({
        created_at: {type: GraphQLString},
        id: {type: GraphQLInt},
        id_str: {type: GraphQLString},
        text: {type: GraphQLString},
        favorited: {type: GraphQLBoolean},
        user: {type: UserType}

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userTweet: {
            type: UserTweetType,
            args: {
                uid: {type: GraphQLString}
            },
            resolve(parentValue, args){
                // console.log('User ID: ', args.uid);
                const params = {screen_name: args.uid};
                return client.get('statuses/user_timeline', params)
                    .then((tweets) => {
                    // console.log('RESPONSE: ', response);      
                    return tweets[0];
                })
                .then(response => response);
            }
        },
        userTweets: {
            type: new GraphQLList(UserTweetType),
            args: {
                uid: {type: GraphQLString}
            },
            resolve(parentValue, args){
                // console.log('User ID: ', args.uid);
                const params = {screen_name: args.uid};
                return client.get('statuses/user_timeline', params)
                    .then((tweets) => {
                    // console.log('RESPONSE: ', response);      
                    return tweets;
                })
                .then(response => response);
            }
        },
        searchTweets: {
            type: new GraphQLList(UserTweetType),
            args: {
                keyword: {type: GraphQLString}
            },
            resolve(parentValue, args){
                console.log('Keyword: ', args.keyword);
                const params = {q: args.keyword};
                return client.get('search/tweets', params)
                    .then((tweets) => {
                    console.log('Tweets: ', tweets);
                    console.log("--------------------------------");      
                    return tweets.statuses;
                })
                .then(response => response);
            }
        },
        postTweet: {
            type: UserTweetType,
            args: {
                text: {type: GraphQLString}
            },
            resolve(parentValue, args){
                // console.log('User ID: ', args.uid);
                const params = {status: args.text};
                return client.post('statuses/update', params)
                    .then((tweet) => {
                    // console.log('RESPONSE: ', response);      
                    return tweet;
                })
                .then(response => response);
            }
        },
        likeTweet: {
            type: UserTweetType,
            args: {
                tid: {type: GraphQLString}
            },
            resolve(parentValue, args){
                // console.log('User ID: ', args.uid);
                const params = {id: args.tid};
                return client.post('favorites/create', params)
                    .then((tweet) => {
                    // console.log('RESPONSE: ', response);      
                    return tweet;
                })
                .then(response => response);
            }
        },
        unlikeTweet: {
            type: UserTweetType,
            args: {
                tid: {type: GraphQLString}
            },
            resolve(parentValue, args){
                // console.log('User ID: ', args.uid);
                const params = {id: args.tid};
                return client.post('favorites/destroy', params)
                    .then((tweet) => {
                    // console.log('RESPONSE: ', response);      
                    return tweet;
                })
                .then(response => response);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});