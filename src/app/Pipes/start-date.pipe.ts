import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../Interfaces/wycieczkaData';

@Pipe({
  name: 'startDatePipe'
})
export class StartDatePipe implements PipeTransform {

  transform(products: WycieczkaData[], startDate: Date): WycieczkaData[] {
    return products.filter(product => product.startDate <= startDate);
  }

}
