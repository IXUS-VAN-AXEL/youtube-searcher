import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

// services
import { YoutubeService } from '../../services';
import {IndexDbService} from '../../modules/shared/services';

// models
import { IVideoObject, ISearchListResponse } from '../../models';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnDestroy {
  public videos$: BehaviorSubject<IVideoObject[]> = new BehaviorSubject<IVideoObject[]>([]);

  private pageSize = 10;
  private pageToLoadNext$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private lastQString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private loading = false;
  private isQueried = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private youtubeService: YoutubeService,
              private indexDbService: IndexDbService) {
    this.indexDbService.connectToBase();
    this.indexDbService.openDataBase()
        .pipe(
            takeUntil(this.destroy$),
            switchMap(() => this.indexDbService.getAll()),
            tap(data => this.indexDbService.allRecords$.next(data)),
        ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.youtubeService.searchQuery$.pipe(takeUntil(this.destroy$)).subscribe(qString => {
      if (qString) {
        if (!this.isQueried || qString !== this.lastQString.value) {
          this.pageToLoadNext$.next('');
          this.videos$.next([]);
        }
        this.isQueried = true;
        this.lastQString.next(qString);
        this.youtubeService
          .getSearchingVideos(qString, this.pageSize, this.pageSize)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.updateList(data);
          });
      } else {
        if (this.isQueried) {
          this.pageToLoadNext$.next('');
          this.videos$.next([]);
        }
        this.isQueried = false;
        this.youtubeService
          .getMostPopularVideos(this.pageSize, this.pageToLoadNext$.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.updateList(data);
          });
      }
    });
  }

  private updateList(data: ISearchListResponse): void {
    const alreadyLoaded = this.videos$.value;
    alreadyLoaded.push(...data.items);
    this.videos$.next(alreadyLoaded);
    this.loading = false;
    this.pageToLoadNext$.next(data.nextPageToken);
  }
}
