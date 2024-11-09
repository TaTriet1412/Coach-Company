import { FormsModule } from '@angular/forms';
import {ChangeDetectionStrategy, Component,ElementRef} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { Router } from '@angular/router';
@Component({
  selector: 'user-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  datePicker!: ElementRef;
  selectedDate!: Date;

  constructor(private router: Router){}

  goToChooseChair(){
    this.router.navigate(['/choose-chair'])
  }
}
