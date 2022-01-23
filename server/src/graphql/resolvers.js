const { paginateResults, edgesToReturn } = require("./utils");
const elasticSearchSchema = require("../elasticsearch/schema");
const { ElasticSearchClient, PublicationsElasticSearchClient } = require("../elasticsearch/server");

module.exports = {
    Query: {
        authors: (_, { name = null, topic = null, offset = 0, limit = 10 }) => new Promise((resolve, reject) => {
            console.log('limit is: ', limit);    
        
            let schema;
            let total;
            if(!name && topic) {
                console.log('we no have name')
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                        "terms": {
                            "topics": [topic]
                        }
                    }
                }
            } else if(!topic && name) {
                console.log('we no have topic')
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                      "term": {
                        "name": {
                          "value": name
                        }
                      }
                    }
                  }
            } else if(topic && name) {
                console.log('we have both', name, topic)
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                      "dis_max": {
                        "tie_breaker": 0.7,
                        "boost": 1.2,
                        "queries": [
                          {"term": { "name": {"value": name}}},
                          { "terms": { "topics": [topic]}
                          }
                        ]
                      }
                    }
                  }
            } else {
                console.log('we have no params')
                schema = { 
                    "from": offset,
                    "size": limit,
                    "query": {
                        "match_all": {}
                    }
                }
            }

            console.log('shcema is: ', schema)

            ElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                console.log(_source.length, 'AAAAAAAAA', total)
                // resolve(_source);
                resolve({"totalCount": total, "authors": _source});
            });
        }),
        author: (_, { id = 3 }) => new Promise((resolve, reject) => {
            console.log('IM IN RESOLVER: ', id)
            let schema;
            if(id === null) {
                schema = {
                    "query": {
                        "term": {
                            "id": {
                                "value": id
                            }
                        }
                    }
                }
            } else {
                schema = {
                    "query": {
                        "term": {
                            "id": {
                                "value": id
                            }
                        }
                    }
                }
            }

            ElasticSearchClient({...schema})
                .then(r => {
                let _source = r['hits']['hits'];
                let author = _source[0]._source;    

                resolve(author);
            });
        }),
        authorPublications: (_, { id = null }) => new Promise((resolve, reject) => {
            if(!id) {
                console.log('this should never run');
            }
            
            const schema = {
                "query": {
                    "match": {
                      "id": id
                    }
                }
            }

            PublicationsElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                console.log(_source.length, 'AAAAAAAAA', total)
                // resolve(_source);
                resolve({"totalCount": total, "publications": _source});
            });
        }),
        publications: (_, { title = null, offset = 0, limit = 10 }) => new Promise((resolve, reject) => {
            let schema;
            let total;
            console.log('here: ', offset);

            if(title) {
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                        "match": {
                            "title": title
                        }
                    }
                }
            } else{
                schema = elasticSearchSchema;
            }

            PublicationsElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                console.log(_source.length, 'AAAAAAAAA', total)
                // resolve(_source);
                resolve({"totalCount": total, "publications": _source});
            });
        }),
    }
}