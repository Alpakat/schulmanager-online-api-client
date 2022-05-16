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
}): Promise<string | {
    classHour: import("../types/scheduleResponse").ClassHour;
    date: string;
    actualLesson: import("../types/scheduleResponse").ActualLesson;
    originalLesson: import("../types/scheduleResponse").ActualLesson | undefined;
}[]>;
//# sourceMappingURL=getSchedules.d.ts.map