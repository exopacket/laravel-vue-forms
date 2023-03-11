import axios from "axios";
import ApiResult from "./api-result.js";

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

export class ApiCall {

    parameters = []
    errors = []
    path = "";

    constructor (path, parameters = []) {
        parameters.forEach((item) => {
            this.push(item[0], item[1])
        })
        this.path = path
        return this
    }

    push(key, value, type = "STRING") {
        for(let i=0; i<this.parameters.length; i++) {
            let param = this.parameters[i]
            if(param.key === key) {
                param.value = value
                return this;
            }
        }
        this.parameters.push(new ApiParameter(key, value, type))
        return this;
    }

    encodeGetParams(p) {
        return Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&").toString();
    }
    save() {
        return this; //FIXME clear errors and so forth
    }

    json() {
        return JSON.stringify(this); //for use with return object
    }

    data() {
        let params = {};
        for(let i=0; i<this.parameters.length; i++) {
            params[this.parameters[i].key] = this.parameters[i].value;
        }
        params['csrf_token'] = token;
        return params;
    }

    async post() {
        let resp = {}
        try {
            let data = this.data();
            resp = await axios.post("/api" + this.path, data);
        } catch (e) {
            resp = e.response ?? false
        }
        let obj = new ApiResult(resp)
        return obj;
    }

    async get() {
        let resp = {}
        try {
            let data = this.data();
            let url = "/api" + this.path + "?" + this.encodeGetParams(data);
            resp = await axios.get(url);
        } catch (e) {
            resp = e.response ?? false
        }
        let obj = new ApiResult(resp)
        return obj;
    }

}

class ApiParameter {

    key = "";
    value = "";
    type = "";

    constructor(key, value, type) {
        this.key = key
        this.value = value
        this.type = type
    }

}
