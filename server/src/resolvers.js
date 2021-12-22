module.exports = {
    Query: {
        launches: (_, __, { dataSources }) => 
            dataSources.launchAPI.getAllLaunches(),
        profile: (_, __, { dataSources }) =>
            dataSources.profileAPI.getAllProfiles(),         
    }
}