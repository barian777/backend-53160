import * as url from "url"

const config = {

    PORT : 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() {return `${this.DIRNAME}/public/img`},
    MONGODB_URI: 'mongodb+srv://coderB-E_53160:back-end2024@clustercoder.i90trov.mongodb.net/coder-53160',
    MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/
}

export default config;