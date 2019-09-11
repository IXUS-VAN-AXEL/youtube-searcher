import { NgxIndexedDB } from 'ngx-indexed-db';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// models
import { IFavoriteVideo, FavoriteVideo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class IndexDbService {
  public dataBase: any;
  public dataBaseName: string = 'FavoritesList';
  public tableName: string = 'videoList';
  public allRecords$: BehaviorSubject<IFavoriteVideo[]> = new BehaviorSubject<IFavoriteVideo[]>([]);
  public isConnected$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.dataBase = new NgxIndexedDB(this.dataBaseName, 1);
    this.openDataBase();
  }

  public connectToBase(): void {
    this.dataBase = new NgxIndexedDB(this.dataBaseName, 1);
  }

  public openDataBase(): Observable<any> {
    return from(
      this.dataBase.openDatabase(1, evt => {
        const objectStore = evt.currentTarget.result.createObjectStore(this.tableName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex('id', 'id', { unique: true });
        objectStore.createIndex('title', 'title', { unique: false });
      }),
    ).pipe(tap(() => this.isConnected$.next(true)));
  }

  public getByKey(key: string): Observable<any> {
    return from(this.dataBase.getByKey(this.tableName, key));
  }

  public getAll(): Observable<any> {
    return from(this.dataBase.getAll(this.tableName));
  }

  public addRecord(id: string, title: string): Observable<any> {
    return from(this.dataBase.add(this.tableName, new FavoriteVideo(id, title)));
  }

  public updateRecord(record): Observable<any> {
    return this.dataBase.update(this.dataBase, record);
  }

  public deleteRecord(key): Observable<any> {
    return from(this.dataBase.delete(this.tableName, key));
  }
}
