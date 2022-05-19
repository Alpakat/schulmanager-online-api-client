export interface AssociatedStudent {
    id: number;
    firstname: string;
    lastname: string;
    sex: string;
    classId: number;
    birthday?: any;
    isFullAged?: any;
}

export interface User {
    email: string;
    username?: any;
    localUsername?: any;
    id: number;
    hasAdministratorRights: boolean;
    lastSeenNotificationTimestamp: Date;
    firstname: string;
    lastname: string;
    associatedTeachers: any[];
    associatedStudent: AssociatedStudent;
    associatedParents: any[];
}

export interface loginStatusResponse {
    isAuthenticated: boolean;
    user: User;
}