import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../Interfaces/wycieczkaData';

@Pipe({
  name: 'minPriceProduct'
})
export class MinPriceProductPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    // throw new Error('Method not implemented.');
  }
  // transform(products: WycieczkaData[], minPrice: number): WycieczkaData[] {
  //   return products.filter(product => product.price >= minPrice);
  // }

}
