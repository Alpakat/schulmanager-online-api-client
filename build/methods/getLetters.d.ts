export default function getLetters({ token }: {
    token: string;
}): Promise<{
    title: string;
    createdAt: Date;
    id: number;
    read: Date;
}[] | "There was an error, fetching the data. Is your Token correct?">;
//# sourceMappingURL=getLetters.d.ts.map