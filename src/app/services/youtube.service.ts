import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, pluck, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

// models
import { ISearchListResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  public searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchNextPageToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly apiUrl = 'https://www.googleapis.com/youtube/v3';
  private readonly apiKey: string = environment.youTubeApiKey;

  constructor(public http: HttpClient) {}

  public getVideosForChannel(channel: string, maxResults: number = 50): Observable<ISearchListResponse> {
    const params = new HttpParams()
      .set('channelId', channel)
      .set('order', 'date')
      .set('part', 'snippet')
      .set('type', 'video')
      .set('maxResults', maxResults.toString());
    return this.http.get<ISearchListResponse>(`${this.apiUrl}/search`, { params });
  }

  public getSearchingVideos(qSearch: string, pageSize: number, maxResults: number = 50): Observable<ISearchListResponse> {
    const params = new HttpParams()
      .set('q', qSearch)
      .set('part', 'snippet')
      .set('type', 'video')
      .set('videoEmbeddable', 'true')
      .set('pageToken', this.searchNextPageToken$.value)
      .set('order', 'viewCount')
      .set('maxResults', maxResults.toString());
    return this.http.get<ISearchListResponse>(`${this.apiUrl}/search`, { params }).pipe(
      tap(response => this.searchNextPageToken$.next(response.nextPageToken)),
      pluck('items'),
      map(items => items.map(item => item.id.videoId)),
      switchMap(ids => this.getVideosByIds(ids, pageSize)),
    );
  }

  public getVideosByIds(ids: string[], maxResults: number = 50): Observable<ISearchListResponse> {
    const params = new HttpParams()
      .set('id', ids.join(','))
      .set('part', 'snippet,contentDetails,statistics')
      .set('type', 'video')
      .set('videoEmbeddable', 'true')
      .set('maxResults', maxResults.toString());
    return this.http.get<ISearchListResponse>(`${this.apiUrl}/videos`, { params });
  }

  public getMostPopularVideos(maxResults: number, nextPageToken: string): Observable<ISearchListResponse> {
    const params = new HttpParams()
      .set('chart', 'mostPopular')
      .set('part', 'snippet,contentDetails,statistics')
      .set('type', 'video')
      .set('videoEmbeddable', 'true')
      .set('pageToken', nextPageToken)
      .set('maxResults', maxResults.toString());
    return this.http.get<ISearchListResponse>(`${this.apiUrl}/videos`, { params });
  }
}
