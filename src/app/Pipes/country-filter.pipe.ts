import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../Interfaces/wycieczkaData';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    // throw new Error('Method not implemented.');
  }

  // transform(products: WycieczkaData[], countries: String[]): WycieczkaData[] {
  //   return products.filter(product => countries.includes(product.country));
  // }

}
