import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../Interfaces/wycieczkaData';

@Pipe({
  name: 'endDatePipe'
})
export class EndDatePipe implements PipeTransform {

  transform(products: WycieczkaData[], endDate: Date): WycieczkaData[] {
    return products.filter(product => product.endDate <= endDate);
  }

}
