import axios from 'axios';

// project imports
import { REST_API_URL as baseURL } from "../config";

class GatewayAPI {
    constructor() {
        this.init();
    }

    init(token) {
        this.token = token;
        const options = { baseURL };

        if (token) {
            options.headers = {
                Authorization: 'Token ' + token,
            }
        }

        this.req = axios.create(options);
    }

    async signin(name, password) {
        const res = await this.req.post('/signin', { name, password });
        this.init(res.data.token);
    }

    getTasks() {
        return this.req.get('/tasks');
    }

    createTask(user, email, desc) {
        return this.req.post('/task', { user, email, desc });
    }

    setTaskDone(id, done) {
        return this.req.patch('/done/' + id, { done });
    }

    editTask(id, desc) {
        return this.req.patch('/edit/' + id, { desc });
    }
}

const api = new GatewayAPI();
export { api };
