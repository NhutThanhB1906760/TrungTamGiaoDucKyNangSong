import createApiClient from "./api.service";

class AccountService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get(`/`)).data;
    }
    async Login(data) {
        return (await this.api.post("/login",data)).data;
    }
    async gegister(data) {
        return (await this.api.post("/register", data)).data;
    }
    async logOut() {
        return (await this.api.post(`/logout`)).data;
    }
    async getAcPer() {
        return (await this.api.get(`/findAcPer`)).data;
    }
    async updateUser(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new AccountService();
