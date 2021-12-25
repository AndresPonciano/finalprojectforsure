const { paginateResults, edgesToReturn } = require("./utils");

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
            dataSources.profileAPI.getProfileById({ id: id })        
    }
}