module.exports = {
    Query: {
        launches: (_, __, { dataSources }) => 
            dataSources.launchAPI.getAllLaunches(),
        profiles: (_, __, { dataSources }) =>
            dataSources.profileAPI.getAllProfiles(),
        profile: (_, { id }, { dataSources }) =>
            dataSources.profileAPI.getProfileById({ id: id })        
    }
}