export interface IReviw {

    entities: {
        id: number,
        productName: string,
        userName: string,
        rating: number,
        comment: string,
        reviewDate: Date,
    }[],
    Count: number
}
