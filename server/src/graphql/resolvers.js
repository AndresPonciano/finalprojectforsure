const { paginateResults, edgesToReturn } = require("./utils");
const elasticSearchSchema = require("../elasticsearch/schema");
const { ElasticSearchClient, PublicationsElasticSearchClient } = require("../elasticsearch/server");

module.exports = {
    Query: {
        launches: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allLaunches = await dataSources.launchAPI.getAllLaunches();
            allLaunches.reverse();

            const launches = paginateResults({
                after,
                pageSize,
                results: allLaunches
            });

            return {
                launches,
                cursor: launches.length ? launches[launches.length - 1].cursor : null,
                // if the cursor at the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: launches.length
                    ? launches[launches.length - 1].cursor !==
                    allLaunches[allLaunches.length - 1].cursor
                    : false
            };
        },
        profiles: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allProfiles = await dataSources.profileAPI.getAllProfiles();

            // pageSize is equivalent to "first" in the graphql specs
            return edgesToReturn({allEdges: allProfiles, first: pageSize, after})
        },
        profile: (_, { id }, { dataSources }) =>
            dataSources.profileAPI.getProfileById({ id: id }),
        authors: (_, { name = null, topic = null }) => new Promise((resolve, reject) => {
            let schema;
            
            if(!name && topic) {
                console.log('we no have name')
                schema ={
                    "query": {
                        "terms": {
                            "topics": [topic]
                        }
                    }
                }
            } else if(!topic && name) {
                console.log('we no have topic')
                schema = {
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
                    "query": {
                        "match_all": {}
                    }
                }
            }

            console.log('shcema is: ', schema)

            ElasticSearchClient({...schema})
                .then(r => {
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                console.log(_source.length, 'AAAAAAAAA')
                resolve(_source);
            });
        }),
        publications: () => new Promise((resolve, reject) => {
            PublicationsElasticSearchClient({...elasticSearchSchema})
                .then(r => {
                let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);
        
                resolve(_source);
            });
        }),
    }
}