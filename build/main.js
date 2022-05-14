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
var _SchulmanagerAPI_token;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchulmanagerAPI = void 0;
const getLetters_1 = __importDefault(require("./methods/getLetters"));
const getSchedules_1 = __importDefault(require("./methods/getSchedules"));
/**
 * Interface for the SMO Api.
 *
 * @class
 */
class SchulmanagerAPI {
    /**
* Init the SMO Api
* @exports schulmanager-online-api.default
* @param {string} token - The JWS of your SMO Login.
*/
    constructor(token) {
        _SchulmanagerAPI_token.set(this, void 0);
        __classPrivateFieldSet(this, _SchulmanagerAPI_token, token, "f");
    }
    /**
 * Get an overview of all Letters.
 * @return {Object} An Array of the letters
 */
    getLetters() {
        return (0, getLetters_1.default)({ token: __classPrivateFieldGet(this, _SchulmanagerAPI_token, "f") });
    }
    /**
* Get an overview of the Curren Schedule.
* @return {Object} The Schedule
*/
    getSchedules(dates, student) {
        return (0, getSchedules_1.default)({ token: __classPrivateFieldGet(this, _SchulmanagerAPI_token, "f"), dates: dates, student });
    }
}
exports.SchulmanagerAPI = SchulmanagerAPI;
_SchulmanagerAPI_token = new WeakMap();
//# sourceMappingURL=main.js.map