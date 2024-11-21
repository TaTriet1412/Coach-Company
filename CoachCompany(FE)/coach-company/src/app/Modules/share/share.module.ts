import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatNumberDot3Pipe } from '../../core/pipes/format-number-dot-3.pipe';
import { SafePipe } from '../../core/pipes/safe.pipe';



@NgModule({
  declarations: [FormatNumberDot3Pipe,SafePipe],
  imports: [
    CommonModule
  ],
  exports: [FormatNumberDot3Pipe,SafePipe],
})
export class ShareModule { }
