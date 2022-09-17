import { User } from "./types/loginResponse";
/**
 * Interface for the SMO Api.
 *
 * @class
 */
export declare class SchulmanagerAPI {
    #private;
    /**
* Login to the SMO API
* @exports schulmanager-online-api.default
* @param {storeToken} storeToken - NOT RECOMENDED: if true, token will be stored in a json file. Please use own secure storage and provide token in the login option.
*/
    constructor(storeToken: boolean);
    /**
* Login to the SMO API
* @param {email} email - Email of SMO Login
* @param {password?} password - Password of SMO Login. If not provided, and token is invalid, login will fail.
* @param {token?} token - Token of last Login. Recomended over storeToken of this library. If not given or expired, a new login will be created.
*/
    login(email: string, password?: string, token?: string): Promise<void>;
    /**
* Get info about user after login
* @return {Object} User
*/
    getUser(): User | undefined;
    /**
* Get token after login.
* @return {String} Token
*/
    getToken(): string | undefined;
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
    }): Promise<string | {
        classHour: import("./types/scheduleResponse").ClassHour;
        date: string;
        actualLesson: import("./types/scheduleResponse").ActualLesson;
        originalLesson: import("./types/scheduleResponse").ActualLesson | undefined;
    }[]>;
    /**
* Get an overview of the Curren Schedule.
* @return {Object} The Schedule
*/
    getExams(dates: {
        start: string;
        end: string;
    }): Promise<"There was an error, fetching the data. Is your Token correct?" | {
        subject: {
            name: string;
            abbreviation: string;
        };
        comment: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        startClass: string;
        endClass: string;
    }[]>;
    /**
* Get current infos.
* @return {Object} The Schedule
*/
    getInfos(): Promise<string | import("./types/infoResponse").default>;
}
//# sourceMappingURL=main.d.ts.map