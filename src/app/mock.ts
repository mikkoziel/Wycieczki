import { add } from 'date-fns';
import { WycieczkaData } from "./wycieczkaData"

export const Wycieczki: WycieczkaData[] = [
    {
        id : 0,
        name: 'Podróż po Polsce',
        country: 'Polska',
        startDate: add(new Date(), { months: 2 }),
        endDate: add(new Date(), { months: 3 }),
        description: 'Najpekniejsze miejsca w Polsce',
        image_url: './assets/01.png',
        price: 1000,
        currency: "PLN",
        seats: 20,
        avaible_seats: 20,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
    },
    {
        id : 1,
        name: 'Podróż po Polsce',
        country: 'Polska',
        startDate: add(new Date(), { months: 3 }),
        endDate: add(new Date(), { months: 4 }),
        description: 'Najpekniejsze miejsca w Polsce',
        image_url: './assets/01.png',
        currency: "PLN",
        price: 150,
        seats: 15,
        avaible_seats: 15,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
    },
    {
        id : 2,
        name: 'Podróż po Polsce',
        country: 'Polska',
        startDate: add(new Date(), { months: 4 }),
        endDate: add(new Date(), { months: 5 }),
        description: 'Najpekniejsze miejsca w Polsce',
        image_url: './assets/01.png',
        currency: "PLN",
        price: 970,
        seats: 40,
        avaible_seats: 40,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
    },
    {
        id : 3,
        name: 'Podróż po Niemczech',
        country: 'Niemcy',
        startDate: add(new Date(), { months: 2 }),
        endDate: add(new Date(), { months: 3 }),
        description: 'Najpekniejsze miejsca w Niemczech',
        image_url: './assets/02.svg',
        currency: "PLN",
        price: 1300,
        seats: 30,
        avaible_seats: 30,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
    },
    {
        id : 4,
        name: 'Podróż po Niemczech',
        country: 'Niemcy',
        startDate: add(new Date(), { months: 3 }),
        endDate: add(new Date(), { months: 4 }),
        description: 'Najpekniejsze miejsca w Niemczech',
        image_url: './assets/02.svg',
        currency: "PLN",
        price: 1600,
        seats: 15,
        avaible_seats: 15,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
    },
    {
        id : 5,
        name: 'Podróż po Wlk. Brytanii',
        country: 'Wlk. Brytania',
        startDate: add(new Date(), { months: 2 }),
        endDate: add(new Date(), { months: 3 }),
        description: 'Najpekniejsze miejsca w Wlk. Brytanii',
        image_url: './assets/03.png',
        currency: "PLN",
        price: 2000,
        seats: 35,
        avaible_seats: 35,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
    },
    {
        id : 6,
        name: 'Podróż po Hiszpanii',
        country: 'Hiszpania',
        startDate: add(new Date(), { months: 2 }),
        endDate: add(new Date(), { months: 3 }),
        description: 'Najpekniejsze miejsca w Hiszpanii',
        image_url: './assets/04.svg',
        currency: "PLN",
        price: 2200,
        seats: 30,
        avaible_seats: 30,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
    },
    {
        id : 7,
        name: 'Podróż po Hiszpanii',
        country: 'Hiszpania',
        startDate: add(new Date(), { months: 2 }),
        endDate: add(new Date(), { months: 3 }),
        description: 'Najpekniejsze miejsca w Hiszpanii',
        image_url: './assets/04.svg',
        currency: "PLN",
        price: 2100,
        seats: 10,
        avaible_seats: 10,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
    }
]