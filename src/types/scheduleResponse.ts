export interface ScheduleResponse {
    results: [Result2]
    systemStatusMessages: any[]
}

export interface Result {
    status: number
    data: Data
}

export interface Data {
    status: number
    data: Daum[]
}

export interface Daum {
    name: string
    dates: string[]
    untisKey: any
    id: number
    createdAt: string
    updatedAt: string
    termId: number
}


export interface Result2 {
    status: number
    data: Daum2[]
}

export interface Daum2 {
    date: string
    classHour: ClassHour
    actualLesson: ActualLesson,
    originalLessons?: ActualLesson[]
}

export interface ClassHour {
    id: number
    number: string
}

export interface ActualLesson {
    room: Room
    subject: Subject
    teachers: Teacher[]
    classes: Class[]
    studentGroups: StudentGroup[]
    comment: any
    subjectLabel: string
    lessonId: number
    courseId: number
}

export interface Room {
    id: number
    name: string
}

export interface Subject {
    id: number
    abbreviation: string
    name: string
    isPseudoSubject: boolean
}

export interface Teacher {
    id: number
    abbreviation: string
    firstname?: string
    lastname?: string
}

export interface Class {
    id: number
    name: string
}

export interface StudentGroup {
    id: number
    name: string
    classId?: number
}