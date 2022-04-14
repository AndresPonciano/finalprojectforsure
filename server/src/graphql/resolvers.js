const { ElasticSearchClient, PublicationsElasticSearchClient } = require("../elasticsearch/server");

module.exports = {
    Query: {
        people: (_, { name = null, topic = null, offset = 0, limit = 10, sorted = "" }) => new Promise((resolve, reject) => {
            if(topic === "None") 
                topic = null;

            let schema;
            let total;

            if( !name && topic && sorted === "" ) {
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                        "terms": {
                            "topics": [topic]
                        }
                    }
                }
            } else if( !name && topic && ( sorted === "name_asc" || sorted === "name_desc" )) {
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
            } else if( name && !topic && sorted === "" ) {
                
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                        "dis_max": {
                            "tie_breaker": 0.7,
                            "boost": 1.2,
                            "queries": [
                                { "match": { "name": name } },
                                { "terms": { "tag_cloud": [name] } }
                            ]
                        },
                    },
                    "highlight": {
                        "fields": {
                            "name": { "number_of_fragments": 0 }
                        }
                    }
                }
            
            } else if( name && !topic && ( sorted === "name_asc" || sorted === "name_desc" ) ) {
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
                            "dis_max": {
                                "tie_breaker": 0.7,
                                "boost": 1.2,
                                "queries": [
                                    { "match": { "name": name } },
                                    { "terms": { "tag_cloud": [name] } }
                                ]
                            },
                        },
                        "highlight": {
                            "fields": {
                                "name": { "number_of_fragments": 0 }
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
                            "dis_max": {
                                "tie_breaker": 0.7,
                                "boost": 1.2,
                                "queries": [
                                    { "match": { "name": name } },
                                    { "terms": { "tag_cloud": [name] } }
                                ]
                            },
                        },
                        "highlight": {
                            "fields": {
                                "name": { "number_of_fragments": 0 }
                            }
                        }
                    }
                }
            } else if( name && topic && sorted === "" ) {
                schema = {
                    "from": offset,
                    "size": limit,
                    "query": {
                      "dis_max": {
                        "tie_breaker": 0.7,
                        "boost": 1.2,
                        "queries": [
                          { "match": { "name": name } },
                          { "terms": { "tag_cloud": [name] } },
                          { "terms": { "topics": [topic] } }
                        ]
                      }
                    },
                    "highlight": {
                        "fields": {
                            "name": { "number_of_fragments": 0 }
                        }
                    }
                }
            } else if( name && topic && ( sorted === "name_asc" || sorted === "name_desc" ) ) {

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
                                    { "match": { "name": name } },
                                    { "terms": { "tag_cloud": [name] } },
                                    { "terms": { "topics": [topic] } }
                                ]
                            }
                        },
                        "highlight": {
                            "fields": {
                                "name": { "number_of_fragments": 0 }
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
                                    { "match": { "name": name } },
                                    { "terms": { "tag_cloud": [name] } }, 
                                    { "terms": { "topics": [topic] } }
                                ]
                            }
                        },
                        "highlight": {
                            "fields": {
                                "name": { "number_of_fragments": 0 }
                            }
                        }
                    }
                }
            } else if( !name && !topic && ( sorted === "name_asc" || sorted === "name_desc" ) ) {
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
                schema = { 
                    "from": offset,
                    "size": limit,
                    "query": {
                        "match_all": {}
                    }
                }
            }

            ElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = 
                        item.highlight ? 
                        { ...item._source, highlight: item.highlight.name } 
                        : 
                        { ...item._source, highlight: null }
                        );
        
                resolve({"totalCount": total, "people": _source});
            });
        }),
        person: (_, { id = 3 }) => new Promise((resolve, reject) => {
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
                let person = _source[0]._source;    

                resolve(person);
            });
        }),
        personPublications: (_, { id = 979, offset = 0, limit = 10 , sorted = "" }) => new Promise((resolve, reject) => {                    
            let schema;

            if( sorted === "" ) {
                schema = {
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
            } else if( sorted === "num_citations_asc" ) {
                schema = {
                    "from": offset,
                    "size": limit,
                    "sort": [
                        {
                           "num_citations": {
                             "order": "asc"
                           }
                        }
                    ],
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
            } else if( sorted === "num_citations_desc" ) {
                schema = {
                    "from": offset,
                    "size": limit,
                    "sort": [
                        {
                           "num_citations": {
                             "order": "desc"
                           }
                        }
                    ],
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
            } else if( sorted === "title_asc" ) {
                schema = {
                    "from": offset,
                    "size": limit,
                    "sort": [
                        {
                           "title.raw": {
                             "order": "asc"
                           }
                        }
                    ],
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
            } else if( sorted === "title_desc" ) {
                schema = {
                    "from": offset,
                    "size": limit,
                    "sort": [
                        {
                           "title.raw": {
                             "order": "desc"
                           }
                        }
                    ],
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
                    },
                    "highlight": {
                        "fields": {
                            "title": { number_of_fragments: 0 },
                            "abstract": { number_of_fragments: 0 },
                        }
                    }
                }
            } else if (searchTerm && sorted === "num_citations_asc") {
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
                   },
                   "highlight": {
                       "fields": {
                            "title": { number_of_fragments: 0 },
                            "abstract": { number_of_fragments: 0 },
                       }
                   }
                }
            } else if (searchTerm && sorted === "num_citations_desc") {
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
                   },
                   "highlight": {
                       "fields": {
                            "title": { number_of_fragments: 0 },
                            "abstract": { number_of_fragments: 0 },
                       }
                   }
                }
            } else if (searchTerm && sorted === "title_asc") {
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
                   },
                   "highlight": {
                       "fields": {
                            "title": { number_of_fragments: 0 },
                            "abstract": { number_of_fragments: 0 },
                       }
                   }
                }
            } else if (searchTerm && sorted === "title_desc") {
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
                   },
                   "highlight": {
                       "fields": {
                            "title": { number_of_fragments: 0 },
                            "abstract": { number_of_fragments: 0 },
                       }
                   }
                }
            }


            PublicationsElasticSearchClient({...schema})
                .then(r => {
                total = r['hits']['total']['value'];
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = 
                    item.highlight ?
                    { ...item._source, highlight: item.highlight }
                    :
                    { ...item._source, highlight: null }
                    );
        
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
        
                resolve(_source);
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
        
                resolve(_source);
            });
        })
    }
}