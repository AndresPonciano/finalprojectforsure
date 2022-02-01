const { paginateResults, edgesToReturn } = require("./utils");
const elasticSearchSchema = require("../elasticsearch/schema");
const { ElasticSearchClient, PublicationsElasticSearchClient } = require("../elasticsearch/server");
const { size } = require("../elasticsearch/schema");

module.exports = {
    Query: {
        authors: (_, { name = null, topic = null, offset = 0, limit = 10, sorted = "" }) => new Promise((resolve, reject) => {
            console.log('limit is: ', limit);    
        
            let schema;
            let total;

            if(!name && topic && sorted === "") {
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
            } else if(!name && topic && sorted === "name") {
                console.log('we no have topic')
                schema = {
                    "from": offset,
                    "size": limit,
                    "sort": [
                        {
                            "name.raw": {
                                "order": "asc"
                            }
                        }
                    ],
                    "query": {
                        "terms": {
                            "topics": [topic]
                        }
                    }
                }
            } else if(name && !topic && sorted === "") {
                console.log('we have both', name, topic)
                
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                        "match": {
                            "name": name
                        }
                    }
                }
            } else if(name && topic && sorted === "") {
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                      "dis_max": {
                        "tie_breaker": 0.7,
                        "boost": 1.2,
                        "queries": [
                          { "term": { "name": {"value": name} } },
                          { "terms": { "topics": [topic]} }
                        ]
                      }
                    }
                }
            } else if(name && topic && sorted == "name") {
                schema = {
                    "from": offset,
                    "size": limit,
                    "sort": [
                        {
                            "name.raw": {
                                "order": "asc"
                            }
                        }
                    ],
                    "query": {
                      "dis_max": {
                        "tie_breaker": 0.7,
                        "boost": 1.2,
                        "queries": [
                          { "term": { "name": {"value": name} } },
                          { "terms": { "topics": [topic] } }
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

            // name, topic, sorted:
                // !name && topic && !sorted
                // !name && topic && sorted
                // name && !topic && !sorted
                // name && topic && !sorted
                // name && topic && sorted
                // 

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
        authorPublications: (_, { id = 979, offset = 0, limit = 10 }) => new Promise((resolve, reject) => {        
            const schema = {
                "from": offset,
                "size": limit,
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
        
                resolve(_source);
            });
        }),
        publications: (_, { searchTerm = null, offset = 0, limit = 10, sorted = "" }) => new Promise((resolve, reject) => {
            let schema;
            let total;

            if(searchTerm && sorted === "") {
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                        "multi_match": {
                            "query": searchTerm,
                            "fields": ["title", "abstract"]
                        }
                    }
                }
            } else if (searchTerm && sorted === "num_citations") {
                console.log('did we get here');
                schema = {
                    "from": offset,
                    "size": limit, 
                    "sort": [
                    {
                       "num_citations": {
                         "order": "asc"
                       }
                    }
                    ]
                   , "query": {
                        "multi_match": {
                            "query": searchTerm,
                            "fields": ["title", "abstract"]
                        }
                   }
                }
            }

            PublicationsElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                resolve(_source);
            });
        }),
    }
}