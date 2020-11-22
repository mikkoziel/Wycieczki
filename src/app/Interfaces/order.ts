import { WycieczkaData } from './wycieczkaData';

export interface Order{
    wycieczka: WycieczkaData;
    quantity: number;
    total_price: number;
}