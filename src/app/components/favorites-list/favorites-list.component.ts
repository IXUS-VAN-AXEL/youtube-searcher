import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, pluck, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

// services
import { YoutubeService } from '../../services';
import { IndexDbService } from '../../modules/shared/services';

// models
import { IVideoObject } from '../../models';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit, OnDestroy {
  public searchControl = new FormControl();
  public filterString$: Observable<string>;
  public originVideos$: ReplaySubject<IVideoObject[]> = new ReplaySubject<IVideoObject[]>(1);
  public filteredVideos$: Observable<any>;
  private destroy$: Subject<void> = new Subject();

  constructor(private youtubeService: YoutubeService, private indexDbService: IndexDbService) {}

  ngOnInit() {
    this.getAllRecords();
    this.subToAddedToFavorites();
    this.configurateFilter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAllRecords(): void {
    this.indexDbService.isConnected$
      .pipe(
        filter(data => data),
        switchMap(() => this.indexDbService.getAll()),
        map(data => {
          return data.map(item => item.id);
        }),
        switchMap(ids => this.youtubeService.getVideosByIds(ids)),
        pluck('items'),
        takeUntil(this.destroy$),
      )
      .subscribe(data => {
        this.originVideos$.next(data);
      });
  }

  private subToAddedToFavorites(): void {
    this.indexDbService.allRecords$
      .pipe(
        takeUntil(this.destroy$),
        filter(data => !!data.length),
        tap(() => this.getAllRecords()),
      )
      .subscribe();
  }

  private configurateFilter(): void {
    this.filterString$ = this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      startWith(''),
    );
    this.filteredVideos$ = combineLatest(this.originVideos$, this.filterString$).pipe(
      takeUntil(this.destroy$),
      map(([videos, string]) => {
        return videos.filter((item: IVideoObject) => item.snippet.title.indexOf(string) !== -1);
      }),
    );
  }
}
