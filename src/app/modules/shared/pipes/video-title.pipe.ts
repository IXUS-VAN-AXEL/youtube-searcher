import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'videoTitle'
})
export class VideoTitlePipe implements PipeTransform {
    transform(value: any, args?: any[]): any {
        const dots = '...';

        if (value.length > 65) {
            value = value.substring(0, 62) + dots;
        }

        return value;
    }
}
