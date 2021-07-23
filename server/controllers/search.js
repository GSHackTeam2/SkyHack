var https = require('https')
var aws4 = require('aws4')
require('dotenv').config()
const Post = require('../models/post');

const list = async (req, res) => {
    if (!req.query) {
        return res.json({});
    }
    search = req.query.text;

    var index = 'posts'

    var opts = { 
        host: 'search-post-es-hgy7q3zf65w7yfxf5yjocuubq4.us-east-2.es.amazonaws.com', 
        path: ('/' + index + '/' + '_search?q=' + search), 
        service: 'es', 
        region: 'us-east-2', 
    }

    aws4.sign(opts, { accessKeyId: process.env.ES_ACCESS_KEY_ID, secretAccessKey: process.env.ES_SECRET_KEY})

    https.request(opts, resp => { 
        let data = '';

        resp.on('data', (chunk) => {
        data += chunk;
        });
    
        resp.on('end', async () => {
            results = JSON.parse(data);
            if (!results || !results.hits || !results.hits.hits) {
                res.status(500).json([]);
            } else {
                const postIds = results.hits.hits.map(x => x._id);
                let foundPosts = await Promise.all(postIds.map(async id => {
                    return await Post.get( {"id" : id } );
                }));
                res.json(foundPosts.filter(x => x));
            }
        });
    
    })
    .end(opts.body || '')
  };

module.exports = { list };
