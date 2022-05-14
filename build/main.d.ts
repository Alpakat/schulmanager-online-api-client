/**
 * Interface for the SMO Api.
 *
 * @class
 */
export declare class SchulmanagerAPI {
    #private;
    /**
* Init the SMO Api
* @exports schulmanager-online-api.default
* @param {string} token - The JWS of your SMO Login.
*/
    constructor(token: string);
    /**
 * Get an overview of all Letters.
 * @return {Object} An Array of the letters
 */
    getLetters(): Promise<{
        title: string;
        createdAt: Date;
        id: number;
        read: Date;
    }[] | "There was an error, fetching the data. Is your Token correct?">;
    /**
* Get an overview of the Curren Schedule.
* @return {Object} The Schedule
*/
    getSchedules(dates: {
        start: string;
        end: string;
    }, student: {
        id: number;
        firstname: string;
        lastname: string;
        sex: string;
        classId: number;
    }): Promise<"There was an error, fetching the data. Is your Token correct?" | {
        classHour: import("./types/scheduleResponse").ClassHour;
        date: string;
        actualLesson: import("./types/scheduleResponse").ActualLesson;
        originalLesson: import("./types/scheduleResponse").ActualLesson | undefined;
    }[]>;
}
//# sourceMappingURL=main.d.ts.map