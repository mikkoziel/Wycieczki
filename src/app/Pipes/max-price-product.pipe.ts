import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../interfaces/wycieczkaData';

@Pipe({
  name: 'maxPriceProduct'
})
export class MaxPriceProductPipe implements PipeTransform {
  // transform(value: any, ...args: any[]) {
  //   // throw new Error('Method not implemented.');
  // }
  transform(products: WycieczkaData[], maxPrice: number): WycieczkaData[] {
    if(products == null){
      return [];
    }
    return products.filter(product => product.price <= maxPrice);
  }

}
