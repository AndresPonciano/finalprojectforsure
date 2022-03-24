const { ElasticSearchClient, PublicationsElasticSearchClient } = require("../elasticsearch/server");

module.exports = {
    Query: {
        authors: (_, { name = null, topic = null, offset = 0, limit = 10, sorted = "" }) => new Promise((resolve, reject) => {
            // console.log('limit is: ', limit);    
            console.log('name: ', name, "sorted: ", sorted, "topic: ", topic);

            if(topic === "None") 
                topic = null;

            let schema;
            let total;

            if(!name && topic && sorted === "") {
                console.log('case1')
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                        "terms": {
                            "topics": [topic]
                        }
                    }
                }
            } else if(!name && topic && ( sorted === "name_asc" || sorted === "name_desc" )) {
                console.log('case2')
                if( sorted == "name_asc" ) {
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
                } else if ( sorted == "name_desc" ) {
                    schema = {
                        "from": offset,
                        "size": limit,
                        "sort": [
                            {
                                "name.raw": {
                                    "order": "desc"
                                }
                            }
                        ],
                        "query": {
                            "terms": {
                                "topics": [topic]
                            }
                        }
                    }
                }
            } else if(name && !topic && sorted === "") {
                console.log('case3', name, topic)
                
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                        "match": {
                            "name": name
                        }
                    }
                }
            
            } else if( name && !topic && ( sorted === "name_asc" || sorted === "name_desc" ) ) {
                console.log('case4')
                if( sorted === "name_asc" ) {
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
                            "match": {
                                "name": name
                            }
                        }
                    }
                } else if ( sorted === "name_desc" ) {
                    schema = {
                        "from": offset,
                        "size": limit,
                        "sort": [
                            {
                                "name.raw": {
                                    "order": "desc"
                                }
                            }
                        ],
                        "query": {
                            "match": {
                                "name": name
                            }
                        }
                    }
                }
            } else if(name && topic && sorted === "") {
                console.log('case5')
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
            } else if(name && topic && ( sorted === "name_asc" || sorted === "name_desc" )) {
                console.log('case6')

                if ( sorted == "name_asc" ) {
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
                } else if ( sorted == "name_desc" ) {
                    schema = {
                        "from": offset,
                        "size": limit,
                        "sort": [
                            {
                                "name.raw": {
                                    "order": "desc"
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
                }
            } else if(!name && !topic && ( sorted === "name_asc" || sorted === "name_desc" )) {
                console.log('case7')

                if ( sorted === "name_asc" ) {
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
                            "match_all": {}
                        }
                    }
                } else if( sorted === "name_desc" ) {
                    schema = { 
                        "from": offset,
                        "size": limit,
                        "sort": [
                            {
                                "name.raw": {
                                    "order": "desc"
                                }
                            }
                        ],
                        "query": {
                            "match_all": {}
                        }
                    }
                }
            } else {
                console.log('case8')
                schema = { 
                    "from": offset,
                    "size": limit,
                    "query": {
                        "match_all": {}
                    }
                }
            }

            // TODO: MISSING CASE WHERE no name and no topic and sorted!!!

            // name, topic, sorted:
                // !name && topic && !sorted
                // !name && topic && sorted
                // name && !topic && !sorted
                // name && topic && !sorted
                // name && topic && sorted
                // 

            ElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                // console.log(_source.length, 'AAAAAAAAA', total)
                // resolve(_source);
                // console.log('please restul: ', _source[0])
                resolve({"totalCount": total, "authors": _source});
            });
        }),
        author: (_, { id = 3 }) => new Promise((resolve, reject) => {
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
            console.log('im here: ', typeof(id), id);
            
            const schema = {
                "from": offset,
                "size": limit,
                "query": {
                    "nested": {
                      "path": "pub_authors",
                      "query": {
                        "match": {
                          "pub_authors.id": id
                        }
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
        publications: (_, { searchTerm = null, offset = 0, limit = 10, sorted = "" }) => new Promise((resolve, reject) => {
            console.log('searchterm: ', searchTerm, "sorted by: ", sorted);
            
            let schema;
            let total;

            if(searchTerm && sorted === "") {
                console.log('case1')
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
            } else if (searchTerm && sorted === "num_citations_asc") {
                console.log('case2')
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
            } else if (searchTerm && sorted === "num_citations_desc") {
                console.log('case3')
                schema = {
                    "from": offset,
                    "size": limit, 
                    "sort": [
                    {
                       "num_citations": {
                         "order": "desc"
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
            } else if (searchTerm && sorted === "title_asc") {
                console.log('case4')
                schema = {
                    "from": offset,
                    "size": limit, 
                    "sort": [
                    {
                       "title.raw": {
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
            } else if (searchTerm && sorted === "title_desc") {
                console.log('case5')
                schema = {
                    "from": offset,
                    "size": limit, 
                    "sort": [
                    {
                       "title.raw": {
                         "order": "desc"
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
            } else {
                console.log('case6')
            }


            PublicationsElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                resolve(_source);
            });
        }),
        topPeople: (_, { topic = "None" }) => new Promise((resolve, reject) => {
            let schema;

            if(topic !== "None") {
                schema = {
                    "from": 0, 
                    "size": 15, 
                    "sort": [
                        {"total_citations": { "order": "desc"}},
                        {"h_index": { "order": "desc"}}
                    ],
                    "query": { "terms": {
                        "topics": [ topic ]
                      }
                    }
                }
            } else {
                schema = {
                    "from": 0, 
                    "size": 15, 
                    "sort": [
                        {"total_citations": { "order": "desc"}},
                        {"h_index": { "order": "desc"}}
                    ]
                }
            }

            ElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                resolve(_source);
            });
        }),
        peopleSuggestedSearch: (_, { prefix = "" }) => new Promise((resolve, reject) => {
            let schema;

            schema = {
                "sort": [
                    { "name.raw": { "order": "asc" } }
                ],
                "query": {
                    "match_phrase_prefix": {
                        "name": { "query": prefix }
                    }
                }
            }

            ElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                console.log(_source, 'AAAAAAAAA', total)
                resolve(_source);
                // resolve({"totalCount": total, "authors": _source});
            });
        }),
        pubSuggestedSearch: (_, { prefix = "" }) => new Promise((resolve, reject) => {
            let schema;

            schema = {
                "sort": [
                    { "title.raw": { "order": "asc" } }
                ],
                "query": {
                    "match_phrase_prefix": {
                        "title": { "query": prefix }
                    }
                }
            }

            PublicationsElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                console.log(_source, 'AAAAAAAAA', total)
                resolve(_source);
                // resolve({"totalCount": total, "authors": _source});
            });
        })
    }
}