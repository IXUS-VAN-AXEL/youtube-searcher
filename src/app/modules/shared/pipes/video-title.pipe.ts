import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoTitle',
})
export class VideoTitlePipe implements PipeTransform {
  transform(value: string, size: number = 62): string {
    const dots = '...';

    if (value.length > size + 3) {
      value = value.substring(0, size) + dots;
    }

    return value;
  }
}
