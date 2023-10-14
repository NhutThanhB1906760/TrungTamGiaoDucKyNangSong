import createApiClient from "./api.service";

class SelectClassService {
    constructor(baseUrl = "/api/selectClass") {
        this.api = createApiClient(baseUrl);
    }
    async get(id) {
        return (await this.api.post(`/`,id)).data;
    }
}

export default new SelectClassService();
