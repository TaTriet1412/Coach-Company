import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumberDot3'
})
export class FormatNumberDot3Pipe implements PipeTransform {

  transform(value: number): string { 
    if (value == null) { return ''; 

    } 
    return value.toLocaleString('en-US').replace(/,/g, '.');
  }
}
