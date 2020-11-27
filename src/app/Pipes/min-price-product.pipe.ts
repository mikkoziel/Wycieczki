import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../interfaces/wycieczkaData';

@Pipe({
  name: 'minPriceProduct'
})
export class MinPriceProductPipe implements PipeTransform {
  // transform(value: any, ...args: any[]) {
  //   // throw new Error('Method not implemented.');
  // }
  transform(products: WycieczkaData[], minPrice: number): WycieczkaData[] {
    if(products == null){
      return [];
    }
    return products.filter(product => product.price >= minPrice);
  }

}
