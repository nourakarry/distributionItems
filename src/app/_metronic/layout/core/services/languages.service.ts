import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import {
  ApplicationDefaultLanguage,
  ApplicationLanguages,
} from '../configs/config';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  public currentLanguageSubject: BehaviorSubject<string>;
  currentLanguage$: Observable<string>;

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private title: Title
  ) {
    this.currentLanguageSubject = new BehaviorSubject<string>(
      ApplicationDefaultLanguage
    );

    this.currentLanguage$ = this.currentLanguageSubject.asObservable();

    const prevLanguage = this.translateService.getDefaultLang();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.url.length > 1 ? event.url : event.urlAfterRedirects;
        const foundLanguage =
          ApplicationLanguages.find((lang) => url.includes(`/${lang}`)) ||
          ApplicationDefaultLanguage;

        if (!prevLanguage && prevLanguage !== foundLanguage) {
          this.configureLanguages(foundLanguage);
        }
      });

    const langParam = this.activatedRouter.snapshot.params['lang'] || null;

    if (!prevLanguage && langParam && prevLanguage !== langParam) {
      this.configureLanguages(langParam);
    }
  }

  configureLanguages(lang: string) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.currentLanguageSubject.next(lang);
    this.document.documentElement.lang = lang;
    this.document.documentElement.dir = this.getDirection(lang);
    // TODO: move to each page render
   // this.title.setTitle(this.translateService.instant('general.site-title'));
  }

  setLanguage(lang: string) {
    var pathWithoutLan =
      this.router.url.startsWith('/ar') || this.router.url.startsWith('/en')
        ? this.router.url.substring(3)
        : this.router.url;
    if (pathWithoutLan.startsWith('?code='))
      window.location.replace(`/${lang}`);
    else window.location.replace(`/${lang}${pathWithoutLan}`);
  }

  getDirection(lang: string) {
    return lang !== 'ar' ? 'ltr' : 'rtl';
  }

  instantTranslation(key: string): string {
    return this.translateService.instant(key);
  }

  getLanguageFromUrl(): string {
    const splittedUrl = this.router.url.split('/');
    if (ApplicationLanguages.includes(splittedUrl[1])) {
      return splittedUrl[1];
    }
    return ApplicationDefaultLanguage;
  }
}
