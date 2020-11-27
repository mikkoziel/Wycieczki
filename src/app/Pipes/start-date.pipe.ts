import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../interfaces/wycieczkaData';
import { add } from 'date-fns';

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
    var flag = false;
    if(product.cyclic){
      new Array(product.cyclic.long).fill(null).map((_, i) => {
        return add(product.startDate, { days: i*product.cyclic.days, 
                                        weeks: i*product.cyclic.weeks, 
                                        months: i*product.cyclic.months})
          
      }).forEach(x=>{ 
        flag = flag || x.getTime() >= startDate.getTime();
      });
    } else{
      flag = product.startDate.getTime() >= startDate.getTime()
    }
    return flag;
  }

}
