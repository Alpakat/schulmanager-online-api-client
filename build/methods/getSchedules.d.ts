export default function getSchedules({ token, dates, student }: {
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
    classHour: import("../types/scheduleResponse").ClassHour;
    date: string;
    actualLesson: import("../types/scheduleResponse").ActualLesson;
    originalLesson: import("../types/scheduleResponse").ActualLesson | undefined;
}[]>;
//# sourceMappingURL=getSchedules.d.ts.map