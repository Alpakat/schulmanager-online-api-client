"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webcrypto_1 = require("@peculiar/webcrypto");
const axios_1 = __importDefault(require("axios"));
const crypto = new webcrypto_1.Crypto();
async function login(email, token, password) {
    if (token) {
        const loginStatus = await api_checkLoginStatus(token);
        if (loginStatus.data.isAuthenticated) {
            return { token: loginStatus.headers[`x-new-bearer-token`] || token, userData: loginStatus.data.user };
        }
    }
    if (!password) {
        throw new Error(`Login failed. Please provide password.`);
    }
    const loginResponse = await api_login(email, password);
    return { token: loginResponse.jwt, userData: loginResponse.user };
}
exports.default = login;
async function api_checkLoginStatus(token) {
    try {
        const res = await axios_1.default.post(`https://login.schulmanager-online.de/api/login-status`, {}, { headers: { "Authorization": `Bearer ` + token } });
        return res;
    }
    catch (error) {
        throw new Error(`Error checking login status`);
    }
}
async function api_getSalt(email) {
    try {
        const res = await axios_1.default.post(`https://login.schulmanager-online.de/api/get-salt`, { "emailOrUsername": email, "institutionId": null });
        return res.data;
    }
    catch (error) {
        throw new Error(`Error getting salt`);
    }
}
async function hashPasswordWithSalt(password, salt, iterations) {
    const binaryBuffer = Buffer.from(password, `binary`);
    const baseKey = await crypto.subtle.importKey(`raw`, binaryBuffer, {
        name: `PBKDF2`
    }, false, [`deriveBits`]);
    const algorithm = {
        name: `PBKDF2`,
        hash: `SHA-512`,
        salt: (new TextEncoder).encode(salt),
        iterations: iterations
    };
    const length = 4096;
    const s = await crypto.subtle.deriveBits(algorithm, baseKey, length);
    const array = new Uint8Array(s);
    const hash = Buffer.from(array).toString(`hex`);
    return hash;
}
async function api_login(email, password) {
    try {
        const res = await axios_1.default.post(`https://login.schulmanager-online.de/api/login`, { "emailOrUsername": email, "password": password, "mobileApp": false, "institutionId": null });
        return res.data;
    }
    catch (error) {
        throw new Error(`Error logging in`);
    }
}
//# sourceMappingURL=login.js.map