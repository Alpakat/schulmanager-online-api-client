"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateStandartConfig({ token, data }) {
    const config = {
        method: `post`,
        url: `https://login.schulmanager-online.de/api/calls`,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": `application/json`
        },
        timeout: 5000,
        data: data
    };
    return config;
}
exports.default = generateStandartConfig;
//# sourceMappingURL=generateStandartConfig.js.map