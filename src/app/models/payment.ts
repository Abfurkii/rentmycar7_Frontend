export interface Payment{
    id?:number
    memberId:number
    cardId:number
    processDate?:Date
    totalPrice:number
}