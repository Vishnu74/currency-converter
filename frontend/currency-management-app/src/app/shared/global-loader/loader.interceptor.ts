import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader-service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private activeRequests = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.activeRequests++;
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
