import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  imports: [TranslateModule],
  declarations: [TranslateDirective, TranslatePipe],
  exports: [TranslateDirective, TranslatePipe],
})
export class NgaTranslateModule {}
