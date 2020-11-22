import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../Interfaces/wycieczkaData';

@Pipe({
  name: 'maxPriceProduct'
})
export class MaxPriceProductPipe implements PipeTransform {

  transform(products: WycieczkaData[], maxPrice: number): WycieczkaData[] {
    return products.filter(product => product.price <= maxPrice);
  };

}
