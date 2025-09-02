import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';
import { TranslatePrefixDirective } from './translate-prefix.directive';

@NgModule({
  imports: [TranslateModule, TranslatePrefixDirective, TranslateDirective, TranslatePipe],
  exports: [TranslateDirective, TranslatePipe, TranslatePrefixDirective],
})
export class NgaTranslateModule {}
