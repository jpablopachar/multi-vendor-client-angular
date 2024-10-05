import { Pipe, type PipeTransform } from '@angular/core'
import { DateTime } from 'luxon'

@Pipe({
  name: 'fromNow',
  standalone: true,
})
export class FromNowPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return '';

    const date = DateTime.fromJSDate(new Date(value));

    const startOfHour = date.startOf('hour');

    const now = DateTime.local();

    return startOfHour.toRelative({ base: now }) || '';
  }
}
