export interface WycieczkaData{
    id: number;
    name: string;
    country: string;
    startDate: Date;
    endDate: Date;
    price: number;
    currency: string;
    seats?: number;
    description: string;
    image_url: string;
    avaible_seats: number;
    plus_show: boolean;
    minus_show:boolean;
    rating: number;
    rating_count?: number;
    gallery?: string[];
    comments?: Comment[]
    cyclic?: Cyclic;
    seats_taken?: number[];
};

export interface Comment{
    author: string;
    comment: string;
}

export interface Cyclic{
    days?: number;
    weeks?: number;
    months?: number;
    long: number;
}