import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// services
import { YoutubeService } from '../../services';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-video-searchbar',
  templateUrl: './video-searchbar.component.html',
  styleUrls: ['./video-searchbar.component.scss']
})
export class VideoSearchbarComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  constructor(private searchService: NbSearchService,
              private youtubeService: YoutubeService
  ) { }

  ngOnInit() {
    this.searchService.onSearchSubmit()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.youtubeService.searchQuery$.next(data.term);
        })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
