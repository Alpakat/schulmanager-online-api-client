export interface LettersResponse {
    results:              Result[];
}

interface Result {
    status: number;
    data:   Datum[];
}

interface Datum {
    title:           string;
    id:              number;
    createdAt:       Date;
    studentStatuses: StudentStatus[];
}

interface StudentStatus {
    id:            number;
    readTimestamp: Date;
    sentTimestamp: Date;
    studentId:     number;
}
