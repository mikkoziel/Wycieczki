export interface WycieczkaData{
    id: number,
    name: string;
    country: string;
    startDate: Date;
    endDate: Date;
    price: number;
    currency: string;
    seats: number;
    description: string;
    image_url: string;
    avaible_seats: number;
    plus_show: boolean;
    minus_show:boolean;
    rating: number;
}