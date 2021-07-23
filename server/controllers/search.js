var https = require('https')
var aws4 = require('aws4')
const elastic = require('elasticsearch');

const elasticClient = elastic.Client({
  host: 'localhost:9200'
});
// ping the client to be sure Elasticsearch is up
elasticClient.ping({
  requestTimeout: 30000,
}, function(error) {
// at this point, eastic search is down, please check your Elasticsearch service
  if (error) {
      console.error('Elasticsearch cluster is down!');
  } else {
      console.log('Elasticsearch is reachable');
  }
});


const list = async (req, res) => {
    if (!req.query) {
        return res.json({});
    }
    search = req.query.text;

    var index = 'posts'

    var opts = { host: 'search-post-temp-es-6tcdpx6xn6oxgsiui6wdic2rfm.us-east-2.es.amazonaws.com', path: ('/' + index + '/' + '_search?q=' + search), service: 'es', region: 'us-east-2' }

    // or it can get credentials from process.env.AWS_ACCESS_KEY_ID, etc
    // TODO: fix integration by taking secrets from environment
    aws4.sign(opts)

    https.request(opts, resp => { 
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
        data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            results = JSON.parse(data);
            if (!results || !results.hits || !results.hits.hits) {
                res.status(500).json({});
            } else {
                res.json({
                    posts: results.hits.hits
                });
            }
        });
    
    })
    .end(opts.body || '')

    // Commented code used for vanilla elastic search
    // Now switched to AWS elastic search
    /*
    var elasticQuery = {
        index: 'posts',
        q: searchString,
    }
    elasticClient.search(elasticQuery)
    .then(resp => {
        console.log(resp);
        res.json({
            posts: resp.hits.hits
        });
    })
    .catch(err => {
        console.log('Error in elastic query: ', err);
        res.status(500).json({});
    });
    */
  };


module.exports = { elasticClient, list };
