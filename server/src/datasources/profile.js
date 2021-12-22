const { DataSource } = require('apollo-datasource');

class ProfileAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    // initialize(config) {
    //     this.context = config.context;
    // }

    // async findProfile({profileId}) {
    //     const profile = await this.db.profiles.findAll({
    //         where: {profileId}
    //     })

    //     return profile && profile.length > 0;
    // }

    async getAllProfiles() {
        console.log('hi', this.store)
        const bruh = await this.store.Profile.findAll();
        console.log('AAA', bruh[0])

        return bruh && bruh.length > 0;
    }
}

module.exports = ProfileAPI;