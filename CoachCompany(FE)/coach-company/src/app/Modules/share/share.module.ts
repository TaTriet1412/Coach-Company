import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatNumberDot3Pipe } from '../../core/pipes/format-number-dot-3.pipe';



@NgModule({
  declarations: [FormatNumberDot3Pipe],
  imports: [
    CommonModule
  ],
  exports: [FormatNumberDot3Pipe],
})
export class ShareModule { }
