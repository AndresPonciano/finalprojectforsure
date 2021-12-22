const { DataSource } = require('apollo-datasource');

class ProfileAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    // TODO: do we need to intialize config or nah

    // TODO: profilebyID function

    async getAllProfiles() {
        return await this.store.Profile.findAll();
    }
}

module.exports = ProfileAPI;