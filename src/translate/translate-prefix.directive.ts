import { Directive, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Directive({
  standalone: true,
  selector: '[ngaTranslatePrefix]',
})
export class TranslatePrefixDirective {
  ngaTranslatePrefix = input<string | null | undefined>();
  onPrefixChange = toObservable(this.ngaTranslatePrefix);
}
