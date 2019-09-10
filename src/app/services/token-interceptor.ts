import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

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
