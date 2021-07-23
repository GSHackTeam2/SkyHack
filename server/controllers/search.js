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
    searchString = req.query.text;
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
  };


module.exports = { elasticClient, list };
