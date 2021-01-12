import { Subject } from "rxjs";

export class MockKoszykService {
    seats_taken = 0;
    seatsChange: Subject<number> = new Subject<number>();
    priceChange: Subject<number> = new Subject<number>();
  
    getItems(){
        return [];
    }
    
    getTotalPrice(){
        return 0;
    }

    getSeatsOfProduct() {
        return 0;
    }

    getTotalOrderItemPrice() {
        return 0;
    }

    addToCart() {

    }

    freeFromCart() {
        
    }
}