
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GRANT_TYPES } from 'src/app/_metronic/layout/core/services/enums/grant-types.enum';
import { isPlatformBrowser } from '@angular/common';
import { LanguagesService } from '../services/languages.service';
import { environment } from 'src/environments/environment';
import { AuthModel } from 'src/app/modules/auth/models/auth.model';
import { Router } from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(
    //public toasterService: ToastrService,
    private languagesService: LanguagesService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('api/login')) {
      return this.handleRequest(req, next);
    }

    if (isPlatformBrowser(this.platformId)) {
      const authModel = this.getAuthFromLocalStorage();
      if (authModel?.authToken) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authModel.authToken}`,
          },
        });
      }
    }

    req = req.clone({
      setHeaders: {
        'Accept-Language': this.languagesService.getLanguageFromUrl(),
      },
    });

    return this.handleRequest(req, next);
  }
  getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }
  handleRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => {
        if (isPlatformBrowser(this.platformId)) {
          if (err instanceof HttpErrorResponse) {
            try {
              /*this.toasterService.error(
                err.error.errors.join('').replace(/\n/g, '</br>'),
                this.languagesService.instantTranslation('errors.error'),
                {
                  enableHtml: true,
                }
              );*/
              if (err.status === 401) {
                this.logout();
              }

              if (err.status === 401) {
                // if not authorized: try geting new access_token using refresh_token (once)
                /*this.authService
                  .login(GRANT_TYPES.REFRESH_TOKEN)
                  .subscribe((user) => {
                    if (user === undefined) {
                      // if not authorized, logout!
                      this.authService.logout();
                    }
                  });*/
              } else {
                /*this.toasterService.error(
                  err.error.errors.join('').replace(/\n/g, '</br>'),
                  this.languagesService.instantTranslation('errors.error'),
                  {
                    enableHtml: true,
                  }
                );*/
              }
            } catch (e) {
              if (!req.url.includes('api/login')) {
                /*this.toasterService.error(
                  '',
                  this.languagesService.instantTranslation('errors.error')
                );*/
              }
            }
          }
        }
        return of(err);
      })
    );
  }
}
