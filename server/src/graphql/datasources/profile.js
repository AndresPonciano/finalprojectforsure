const { DataSource } = require('apollo-datasource');

class ProfileAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    // TODO: do we need to intialize config or nah

    async getAllProfiles() {
        return await this.store.Profile.findAll();
    }

    async getProfileById({ id }) {
        const profile = await this.store.Profile.findAll( {where: { id }} )
        return profile[0];
    }
}

module.exports = ProfileAPI;