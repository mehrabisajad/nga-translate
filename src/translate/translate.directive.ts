import { Directive, ElementRef, inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { TranslateParser, TranslateService } from '@ngx-translate/core';

import { exchangeParam } from './util';
import { Subscription } from 'rxjs';

/**
 * A wrapper directive on top of the translate pipe as the inbuilt translate directive from ngx-translate is too verbose and buggy
 */
@Directive({
  selector: '[ngaTranslate]',
})
export class TranslateDirective implements OnChanges, OnInit, OnDestroy {
  @Input() ngaTranslate!: string;
  @Input() translateValues?: { [key: string]: unknown } | string;
  translateService = inject(TranslateService);
  translateParser = inject(TranslateParser);
  el = inject(ElementRef);

  defaults?: string | null;

  onTranslationChange: Subscription | undefined;
  onLangChange: Subscription | undefined;
  onDefaultLangChange: Subscription | undefined;
  onTranslationGets: Subscription[] = [];

  translationNotFoundMessage = 'translation-not-found';

  ngOnInit(): void {
    this.onTranslationChange = this.translateService.onTranslationChange.subscribe(() => this.getTranslation());
    this.onLangChange = this.translateService.onLangChange.subscribe(() => this.getTranslation());
    this.onDefaultLangChange = this.translateService.onDefaultLangChange.subscribe(() => this.getTranslation());
  }

  ngOnChanges(): void {
    this.getTranslation();
  }

  private getTranslation(): void {
    if (!this.defaults) {
      this.defaults = this.el.nativeElement.innerHTML;
    }

    if (!this.ngaTranslate) {
      this.applyDefault(this.ngaTranslate);
      return;
    }

    const onGet = this.translateService.get(this.ngaTranslate, this.translateValues).subscribe({
      next: (value: string) => {
        if (value === this.ngaTranslate) {
          this.applyDefault(value);
        } else {
          this.el.nativeElement.innerHTML = value;
        }
      },
      error: () => `${this.translationNotFoundMessage}[${this.ngaTranslate}]`,
    });

    this.onTranslationGets.push(onGet);
  }

  private applyDefault(value: string): void {
    if (typeof this.defaults === 'string' && this.defaults.length) {
      const validArgs: string = this.defaults.replace(/(')?(\w+)(')?(\s)?:/g, '"$2":').replace(/:(\s)?(')(.*?)(')/g, ':"$3"');
      try {
        const objectDefaults = JSON.parse(validArgs);
        const default1 = exchangeParam(objectDefaults[this.translateService.currentLang]);
        this.el.nativeElement.innerHTML = this.translateParser.interpolate(default1, this.translateValues) ?? '';
      } catch (e) {
        const defaults1 = exchangeParam(this.defaults);
        this.el.nativeElement.innerHTML = this.translateParser.interpolate(defaults1, this.translateValues);
      }
    } else if (this.defaults && this.translateService.currentLang in (this.defaults as Object)) {
      const default1 = exchangeParam((this.defaults as any)[this.translateService.currentLang]);
      this.el.nativeElement.innerHTML = this.translateParser.interpolate(default1, this.translateValues) ?? '';
    } else {
      this.el.nativeElement.innerHTML = value;
    }
  }

  /**
   * Clean any existing subscription to change events
   */
  private _dispose(): void {
    if (typeof this.onTranslationChange !== 'undefined') {
      this.onTranslationChange.unsubscribe();
      this.onTranslationChange = undefined;
    }
    if (typeof this.onLangChange !== 'undefined') {
      this.onLangChange.unsubscribe();
      this.onLangChange = undefined;
    }
    if (typeof this.onDefaultLangChange !== 'undefined') {
      this.onDefaultLangChange.unsubscribe();
      this.onDefaultLangChange = undefined;
    }
    for (const onTranslationGet of this.onTranslationGets) {
      if (typeof onTranslationGet !== 'undefined') {
        onTranslationGet.unsubscribe();
      }
    }
    this.onTranslationGets = [];
  }

  ngOnDestroy(): void {
    this._dispose();
  }
}
