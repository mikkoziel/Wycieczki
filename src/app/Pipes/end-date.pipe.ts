import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../interfaces/wycieczkaData';
import { add } from 'date-fns';

@Pipe({
  name: 'endDatePipe'
})
export class EndDatePipe implements PipeTransform {
  // transform(value: any, ...args: any[]) {
  //   // throw new Error('Method not implemented.');
  // }
  transform(products: WycieczkaData[], endDate: Date): WycieczkaData[] {
    if(products == null){
      return [];
    }
    return products.filter(product => this.compareTime(product, endDate));
  }
  
  compareTime(product: WycieczkaData, endDate: Date){
    var flag = false;
    if(product.cyclic){
      new Array(product.cyclic.long).fill(null).map((_, i) => {
        return add(product.startDate, { days: i*product.cyclic.days, 
                                        weeks: i*product.cyclic.weeks, 
                                        months: i*product.cyclic.months})
          
      }).forEach(x=>{ 
        flag = flag || x.getTime() <= endDate.getTime();
      });
    } else{
      flag = product.startDate.getTime() <= endDate.getTime()
    }
    
    return flag;
  }
}
