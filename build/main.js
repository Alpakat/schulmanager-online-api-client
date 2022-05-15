"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _SchulmanagerAPI_token, _SchulmanagerAPI_user, _SchulmanagerAPI_db;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchulmanagerAPI = void 0;
const getLetters_1 = __importDefault(require("./methods/getLetters"));
const getSchedules_1 = __importDefault(require("./methods/getSchedules"));
const login_1 = __importDefault(require("./methods/login"));
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const dotenv_1 = __importDefault(require("dotenv"));
const getExams_1 = __importDefault(require("./methods/getExams"));
dotenv_1.default.config();
/**
 * Interface for the SMO Api.
 *
 * @class
 */
class SchulmanagerAPI {
    /**
* Login to the SMO API
* @exports schulmanager-online-api.default
* @param {storeToken} storeToken - NOT RECOMENDED: if true, token will be stored in a json file. Please use own secure storage and provide token in the login option.
*/
    constructor(storeToken) {
        _SchulmanagerAPI_token.set(this, void 0);
        _SchulmanagerAPI_user.set(this, void 0);
        _SchulmanagerAPI_db.set(this, void 0);
        if (storeToken) {
            if (!process.env[`IGNORE-UNSAFE-TOKEN-STORAGE`]) {
                console.log(`\x1b[31m`, `SchulmanagerAPI - WARNING! NOT RECOMENDED: Token will be stored in a json file. Please use own secure storage and provide token in the login option. If you want to hide this error use "IGNORE-UNSAFE-TOKEN-STORAGE" as environment variable.`, `\x1b[0m`);
            }
            __classPrivateFieldSet(this, _SchulmanagerAPI_db, new node_json_db_1.JsonDB(new JsonDBConfig_1.Config(`SchulmanagerAPI`, true, false, `/`)), "f");
        }
    }
    /**
* Login to the SMO API
* @param {email} email - Email of SMO Login
* @param {password?} password - Password of SMO Login. If not provided, and token is invalid, login will fail.
* @param {token?} token - Token of last Login. Recomended over storeToken of this library. If not given or expired, a new login will be created.
*/
    async login(email, password, token) {
        if (__classPrivateFieldGet(this, _SchulmanagerAPI_db, "f")) {
            token = __classPrivateFieldGet(this, _SchulmanagerAPI_db, "f").exists(`/token/${email}`) ? __classPrivateFieldGet(this, _SchulmanagerAPI_db, "f").getData(`/token/${email}`) : undefined;
        }
        const loginResponse = await (0, login_1.default)(email, token, password);
        __classPrivateFieldSet(this, _SchulmanagerAPI_token, loginResponse.token, "f");
        __classPrivateFieldSet(this, _SchulmanagerAPI_user, loginResponse.userData, "f");
        if (__classPrivateFieldGet(this, _SchulmanagerAPI_db, "f")) {
            __classPrivateFieldGet(this, _SchulmanagerAPI_db, "f").push(`/token/${email}`, __classPrivateFieldGet(this, _SchulmanagerAPI_token, "f"));
        }
    }
    /**
 * Get an overview of all Letters.
 * @return {Object} An Array of the letters
 */
    getLetters() {
        if (!__classPrivateFieldGet(this, _SchulmanagerAPI_token, "f")) {
            throw new Error(`Please login first`);
        }
        return (0, getLetters_1.default)({ token: __classPrivateFieldGet(this, _SchulmanagerAPI_token, "f") });
    }
    /**
* Get an overview of the Curren Schedule.
* @return {Object} The Schedule
*/
    getSchedules(dates) {
        if (!__classPrivateFieldGet(this, _SchulmanagerAPI_token, "f") || !__classPrivateFieldGet(this, _SchulmanagerAPI_user, "f")) {
            throw new Error(`Please login first`);
        }
        return (0, getSchedules_1.default)({ token: __classPrivateFieldGet(this, _SchulmanagerAPI_token, "f"), dates: dates, student: __classPrivateFieldGet(this, _SchulmanagerAPI_user, "f").associatedStudent });
    }
    /**
* Get an overview of the Curren Schedule.
* @return {Object} The Schedule
*/
    getExams(dates) {
        if (!__classPrivateFieldGet(this, _SchulmanagerAPI_token, "f") || !__classPrivateFieldGet(this, _SchulmanagerAPI_user, "f")) {
            throw new Error(`Please login first`);
        }
        return (0, getExams_1.default)({ token: __classPrivateFieldGet(this, _SchulmanagerAPI_token, "f"), dates: dates, student: __classPrivateFieldGet(this, _SchulmanagerAPI_user, "f").associatedStudent });
    }
}
exports.SchulmanagerAPI = SchulmanagerAPI;
_SchulmanagerAPI_token = new WeakMap(), _SchulmanagerAPI_user = new WeakMap(), _SchulmanagerAPI_db = new WeakMap();
//# sourceMappingURL=main.js.map