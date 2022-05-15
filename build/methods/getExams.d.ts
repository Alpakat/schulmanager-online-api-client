export default function getExams({ token, dates, student }: {
    token: string;
    dates: {
        start: string;
        end: string;
    };
    student: {
        id: number;
        firstname: string;
        lastname: string;
        sex: string;
        classId: number;
    };
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
//# sourceMappingURL=getExams.d.ts.map