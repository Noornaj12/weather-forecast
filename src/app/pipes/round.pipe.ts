import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true
})
export class RoundPipe implements PipeTransform {
  transform(value: number, decimals: number = 0): number {
    if (value == null) return value;
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
}