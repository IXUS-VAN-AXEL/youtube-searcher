import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    let requestToForward: HttpRequest<T> = req;
    const token: string = environment.youTubeApiKey;

    if (token) {
      requestToForward = req.clone({
        setParams: { key: token },
      });
    }

    return next.handle(requestToForward);
  }
}
