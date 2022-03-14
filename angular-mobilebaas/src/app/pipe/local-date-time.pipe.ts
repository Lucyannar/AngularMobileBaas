import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(date: string): string {
    let dateOut : moment.Moment = moment(date,'YYYY-MM-DOTHH:mm:ss')
    return dateOut.format('DO/MM/YYYY');
  }

}
