import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
// models
import { IVideoObject } from '../../models';
import { IFavoriteVideo } from '../../modules/shared/models';
// services
import { IndexDbService } from '../../modules/shared/services';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCardComponent implements OnInit, OnDestroy {
  @Input() video: IVideoObject;
  @Input() size: 'small' | 'medium' = 'medium';

  public disableAdd = false;
  private destroy$: Subject<void> = new Subject();

  constructor(private indexDbService: IndexDbService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subToAlreadyAdded();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addToFavorites(video: IVideoObject): void {
    if (this.indexDbService.isConnected$.value) {
      this.indexDbService
        .addRecord(video.id, video.snippet.title)
        .pipe(
          switchMap(() => this.indexDbService.getAll()),
          tap(data => this.indexDbService.allRecords$.next(data)),
          takeUntil(this.destroy$),
        )
        .subscribe();
    }
  }

  public removeFromFavorites(video: IVideoObject): void {
    if (this.indexDbService.isConnected$.value) {
      this.indexDbService
          .deleteRecord(video.id)
          .pipe(
              switchMap(() => this.indexDbService.getAll()),
              tap(data => this.indexDbService.allRecords$.next(data)),
              takeUntil(this.destroy$),
          )
          .subscribe();
    }
  }

  private subToAlreadyAdded(): void {
    this.indexDbService.allRecords$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data.length) {
        this.disableAdd = !!data.find((item: IFavoriteVideo) => item.id === this.video.id);
      } else {
        this.disableAdd = false;
      }
      this.cdr.detectChanges();
    });
  }
}
