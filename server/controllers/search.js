var https = require('https')
var aws4 = require('aws4')
require('dotenv').config()

const list = async (req, res) => {
    if (!req.query) {
        return res.json({});
    }
    search = req.query.text;

    var index = 'posts'

    var opts = { host: 'search-post-temp-es-6tcdpx6xn6oxgsiui6wdic2rfm.us-east-2.es.amazonaws.com', path: ('/' + index + '/' + '_search?q=' + search), service: 'es', region: 'us-east-2' }

    aws4.sign(opts, { accessKeyId: process.env.ES_ACCESS_KEY_ID, secretAccessKey: process.env.ES_SECRET_KEY})

    https.request(opts, resp => { 
        let data = '';

        resp.on('data', (chunk) => {
        data += chunk;
        });
    
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

  };

module.exports = { list };
