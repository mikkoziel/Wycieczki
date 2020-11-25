import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../Interfaces/wycieczkaData';

@Pipe({
  name: 'endDatePipe'
})
export class EndDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    // throw new Error('Method not implemented.');
  }
  // transform(products: WycieczkaData[], endDate: Date): WycieczkaData[] {
  //   return products.filter(product => this.compareTime(product, endDate));
  // }
  
  compareTime(product: WycieczkaData, endDate: Date){
    var flag = product.endDate.getTime() <= endDate.getTime()
    // console.log(flag);
    return flag;
  }
}
