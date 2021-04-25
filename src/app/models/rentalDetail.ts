export class RentalDetail{
    carId: number;
    customerId: number;
    rentDate: Date;
    returnDate: Date;
    brandName: string;
    colorName: string;
    dailyPrice: number;
    description:string;
}

export const CartItems:RentalDetail[]=[];