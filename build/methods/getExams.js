"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const generateStandartConfig_1 = __importDefault(require("../generateStandartConfig"));
async function getExams({ token, dates, student }) {
    const data = JSON.stringify({
        "bundleVersion": `3128cbe28328d945ac28`,
        "requests": [
            {
                "moduleName": `exams`,
                "endpointName": `get-exams`,
                "parameters": {
                    "student": student,
                    "start": dates.start,
                    "end": dates.end //2022-01-16
                }
            }
        ]
    });
    const config = (0, generateStandartConfig_1.default)({ token, data });
    const res = await axios_1.default.request(config);
    const resData = res.data;
    try {
        return resData.results[0].data.map(e => { return { subject: { name: e.subject.name, abbreviation: e.subject.abbreviation }, comment: e.comment, createdAt: e.createdAt, updatedAt: e.updatedAt, date: e.date, startClass: e.startClassHour.number, endClass: e.endClassHour.number }; });
        // return resData.results[1].data.map(e => { return { classHour: e.classHour, date: e.date, actualLesson: e.actualLesson } })
    }
    catch (error) {
        return `There was an error, fetching the data. Is your Token correct?`;
    }
}
exports.default = getExams;
//# sourceMappingURL=getExams.js.map