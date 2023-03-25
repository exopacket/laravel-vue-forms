import { router } from '@inertiajs/vue3'

export default class ApiResult {

    status = -1
    statusText = "";
    error = null
    errorMessage = ""
    cookies = []
    headers = []
    data = {}
    path = ""
    callback = null

    constructor(obj, callback) {

        this.status = obj.status;
        this.statusText = obj.statusText
        this.error = obj.data.error.is;
        this.errorMessage = obj.data.error.message;
        this.cookies = obj.cookies;
        this.headers = obj.headers;
        this.data = obj.data;
        this.path = obj.config.url;
        this.callback = callback;

    }

    handle(callback = null) {

        if(callback === null && this.callback) callback = this.callback

        if(this.data.redirect.is) {
            router.visit(this.data.redirect.href, { method: 'get' })
            return false;
        } else if(this.data.error.is) {
            if(callback !== null) {
                callback({
                    type: "error",
                    message: this.errorMessage,
                    problems: [this.errorMessage],
                    style: "danger",
                })
            }
            return false;
        } else if(this.data.success.is) {
            if (this.data.success.message && callback !== null) {
                callback({
                    type: this.data.success.type,
                    message: this.data.success.message,
                    style: "success",
                    opts: this.data.success.opts
                })
            }
        }
        return this.data.response.content
    }

    response() {
        return this.data.response.content
    }

}
