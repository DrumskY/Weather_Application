import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateTime',
  standalone: true
})
export class FormatDateTimePipe implements PipeTransform {
    transform(value: string): string {
      if (!value) return '';
  
      // Parse the date string
      const date = new Date(value);
  
      // Extract day abbreviation (Sun, Mon, etc.)
      const dayAbbr = date.toLocaleString('en-US', { weekday: 'short' });
  
      // Extract hour and minute
      const hours = date.getHours();
      const minutes = date.getMinutes();
  
      // Format time as "H:mm" (remove leading zero for hours except 00)
      const time = hours === 0 
        ? '00:00' 
        : `${hours}:${minutes.toString().padStart(2, '0')}`;
  
      return `${dayAbbr} ${time}`;
    }
}