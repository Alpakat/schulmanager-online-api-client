

export interface Subject {
    id: number;
    name: string;
    abbreviation: string;
}

export interface StartClassHour {
    id: number;
    number: string;
    from: string;
    until: string;
    fromByDay: string[];
    untilByDay: string[];
}

export interface EndClassHour {
    id: number;
    number: string;
    from: string;
    until: string;
    fromByDay: string[];
    untilByDay: string[];
}

export interface Datum {
    subjectText?: any;
    subject: Subject;
    comment: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    typeId: number;
    date: Date;
    startClassHour: StartClassHour;
    endClassHour: EndClassHour;
}

export interface Result {
    status: number;
    data: Datum[];
}

export interface SystemStatusMessage {
    id: number;
    text: string;
    level: string;
    visibilities: string[];
    relevantModules: string[];
    roles: any[];
    platforms: string[];
}

export interface examsResponse {
    results: Result[];
    systemStatusMessages: SystemStatusMessage[];
}
