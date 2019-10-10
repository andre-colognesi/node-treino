const express = require('express');
const router = express.Router();
const client = require('../../config/twitter');

router.get('/:termo/:tipo', (req, res) => {
    var termo = req.params.termo;
    var tipo = req.params.tipo;

    var params = {
        //screen_name: `${name}`
        q: termo,
        lang: 'pt',
        result_type: tipo
    };
    console.log(params);
    client.get('search/tweets', params, function(error, tweets, response) {
        if (!error) {
            res.json(tweets);
        } else {
            res.json(error);
        }
    });
})

router.get('/teste', (req, res) => {
    client.stream('statuses/filter', { track: 'twitter' }, function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
})


module.exports = router;