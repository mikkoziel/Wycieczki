import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../Interfaces/wycieczkaData';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  transform(products: WycieczkaData[], countries: String[]): WycieczkaData[] {
    return products.filter(product => countries.includes(product.country));
  }

}
