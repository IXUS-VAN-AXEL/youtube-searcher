import { NgModule } from '@angular/core';

// pipes
import {
    VideoTitlePipe,
    VideoDurationPipe
} from './pipes';

@NgModule({
    declarations: [
        VideoTitlePipe,
        VideoDurationPipe
    ],
    imports: [

    ],
    exports: [
        VideoTitlePipe,
        VideoDurationPipe
    ]
})
export class SharedModule {}
