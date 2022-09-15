export default interface infoResponse{
    results: [
        status: number,
        data: [{
            date?: string,
            text?: string
        }] | null
    ]
}