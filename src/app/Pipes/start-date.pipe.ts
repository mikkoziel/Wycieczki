import { Pipe, PipeTransform } from '@angular/core';
import { WycieczkaData } from '../Interfaces/wycieczkaData';

@Pipe({
  name: 'startDatePipe'
})
export class StartDatePipe implements PipeTransform {

  transform(products: WycieczkaData[], startDate: Date): WycieczkaData[] {
    return products.filter(product => this.compareTime(product, startDate));
  }

  compareTime(product: WycieczkaData, startDate: Date){
    var flag = product.startDate.getTime() >= startDate.getTime()
    // console.log(flag);
    return flag;
  }

}
