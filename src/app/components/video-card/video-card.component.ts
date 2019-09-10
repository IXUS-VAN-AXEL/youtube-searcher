import { Component, Input, OnInit } from '@angular/core';

// models
import { IVideoObject } from '../../models';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() video: IVideoObject;

  constructor() { }

  ngOnInit() {
  }

}
