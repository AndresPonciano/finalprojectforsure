const client = require('./client');
const elasticSearchSchema = require('./schema');

/**
 * TODO Ping the CLIENT to be sure 
 * *** ElasticSearch *** is up
 */
client.ping({
  requestTimeout: 30000,
}, function (error) {
  error
    ? console.error('ElasticSearch cluster is down!')
    : console.log('ElasticSearch is ok');
});

function ElasticSearchClient(body) {
  // perform the actual search passing in the index, the search query and the type
  return client.search({index: 'authors', body: body});
}

function PublicationsElasticSearchClient(body) {
  // perform the actual search passing in the index, the search query and the type
  return client.search({index: 'publications', body: body});
}

function ApiElasticSearchClient(req, res) {
  // perform the actual search passing in the index, the search query and the type
  ElasticSearchClient({...elasticSearchSchema})
    .then(r => res.send(r['hits']['hits']))
    .catch(e => {
      console.error(e);
      res.send([]);
    });
}

module.exports = {
  ApiElasticSearchClient,
  ElasticSearchClient,
  PublicationsElasticSearchClient
};
