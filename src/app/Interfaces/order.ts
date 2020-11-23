import { WycieczkaData } from './wycieczkaData';

export interface Order{
    wycieczka: WycieczkaData;
    quantity: number;
    startDate: Date;
    endDate: Date;
    total_price: number;
}

export interface DateRange{
    startDate: Date;
    endDate: Date;
}