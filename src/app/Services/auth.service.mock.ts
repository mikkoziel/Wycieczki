import { Observable, of } from "rxjs";
import { Order } from "../interfaces/order";
import { User } from "../interfaces/user";
import { Wycieczki } from "../mock";

export class MockAuthService {
    currentUser: Observable<User> = of(<User>{
      uid: "D5zHOxFtQ8fXfnIeqBQZlTKw34y2",
      orders: [
      ],
      cart: [],
    })
    isAdmin = of(true)

    login(mail, password){

    }

    logout(){

    }
  }
  