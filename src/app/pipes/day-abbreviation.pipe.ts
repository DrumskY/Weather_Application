import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayAbbreviation',
  standalone: true,
})
export class DayAbbreviationPipe implements PipeTransform {

  transform(dateString: string): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);

    const dayAbbreviation = date.toLocaleDateString('en-US', { weekday: 'short' });

    return dayAbbreviation;
  }
}