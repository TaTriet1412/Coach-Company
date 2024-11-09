// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-search-schedule',
//   standalone: true,
//   imports: [],
//   templateUrl: './search-schedule.component.html',
//   styleUrl: './search-schedule.component.css'
// })
// export class SearchScheduleComponent {

// }


import { FormsModule } from '@angular/forms';
import {ChangeDetectionStrategy, Component,ElementRef} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-search-schedule',
  templateUrl: './search-schedule.component.html',
  styleUrl: './search-schedule.component.css',
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchScheduleComponent {
  datePicker!: ElementRef;
  selectedDate!: Date;

}
