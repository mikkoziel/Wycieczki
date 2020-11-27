import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../interfaces/wycieczkaData';

@Pipe({
  name: 'startDatePipe'
})
export class StartDatePipe implements PipeTransform {
  // transform(value: any, ...args: any[]) {
  //   // throw new Error('Method not implemented.');
  // }
  transform(products: WycieczkaData[], startDate: Date): WycieczkaData[] {
    if(products == null){
      return [];
    }
    return products.filter(product => this.compareTime(product, startDate));
  }

  compareTime(product: WycieczkaData, startDate: Date){
    var flag = product.startDate.getTime() >= startDate.getTime()
    // console.log(flag);
    return flag;
  }

}
