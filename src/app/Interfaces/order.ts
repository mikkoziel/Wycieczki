import { WycieczkaData } from './wycieczkaData';

export interface Order{
    wycieczka: WycieczkaData;
    quantity: number;
    startDate: Date;
    endDate: Date;
    total_price: number;
    rating?: number;
}

export interface DateRange{
    id: number;
    startDate: Date;
    endDate: Date;
}