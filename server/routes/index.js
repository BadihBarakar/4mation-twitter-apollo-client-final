var express = require('express');
var cors = require('cors');
var router = express.Router();
const Twitter = require('twitter');

const config = {
  consumer_key: 'YKdVZe147eJ94mxfIVsHGPJrJ',
  consumer_secret: 'ijeFjfsIgMBfu1hGBFLSz4dxBMMzwOBmI24vavrXFsGMIHCl1a',
  access_token_key: '2682232230-r7r6qN4zq3zraVvfpy8fMmZAelr5Z8iTfI8vZgO',
  access_token_secret: '2ub5so7AMEo7okHRHwG5PB2RLCY2zq70wKSibEoT7fEot'
}

const client = new Twitter(config);

router.use('/use', function(req, res, next) {
  res.render('index', { title: 'Use Route' });
});

router.get('/search/tweets/:keyword', cors(), function(req, res, next) {
  var keyword = req.params.keyword;
  const params = {q: keyword};
  client.get('search/tweets', params, function(error, tweets, response) {
    console.log('RESPONSE: ', response);      
    if (error) console.log("ERROR: ", error);
    res.send(tweets);
  });
});


router.get('/statuses/tweets/:id', cors(), function(req, res, next) {
  var id = req.params.id;
  console.log('User ID: ', id);
  const params = {screen_name: id};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    // console.log('RESPONSE: ', response);      
    if (error) console.log("ERROR: ", error);
    res.send(tweets);
  });
});

router.get('/search/tweets/:keyword', cors(), function(req, res, next) {
  var keyword = req.params.keyword;
  const params = {q: keyword};
  client.get('search/tweets', params, function(error, tweets, response) {
    console.log('RESPONSE: ', response);  
    
    if (error) console.log("ERROR: ", error);
    res.send(tweets);
  });
});

router.post('/statuses/update/:tweet', cors(), function(req, res, next) {
  var tweet = req.params.tweet;
  const params = {status: tweet};
  
  client.post('statuses/update', params, function(error, response) {
    console.log('RESPONSE: ', response);  
    
    if (error) console.log("ERROR: ", error);
    res.send(response);
  });
});

router.post('/favorites/create/:tid', cors(), function(req, res, next) {
  var tid = req.params.tid;
  const params = {id: tid};
  
  client.post('favorites/create', params, function(error, response) {
    console.log('RESPONSE: ', response);  
    
    if (error) console.log("ERROR: ", error);
    res.send(response);
  });
});

router.post('/favorites/destroy/:tid', cors(), function(req, res, next) {
  var tid = req.params.tid;
  const params = {id: tid};
  
  client.post('favorites/destroy', params, function(error, response) {
    console.log('RESPONSE: ', response);  
    
    if (error) console.log("ERROR: ", error);
    res.send(response);
  });
});

module.exports = router;
