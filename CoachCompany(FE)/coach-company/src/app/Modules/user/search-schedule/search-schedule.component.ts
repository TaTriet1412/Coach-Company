import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component,ElementRef, OnInit, ViewChild, Input, ViewEncapsulation, EventEmitter, Output, LOCALE_ID} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, MatOption, MatOptionModule, provideNativeDateAdapter} from '@angular/material/core';
import { Route } from '../../dto/route';
import { RouteService } from '../../../core/services/route.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-schedule',
  templateUrl: './search-schedule.component.html',
  styleUrl: './search-schedule.component.css',
  providers: [
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'vi-VN' },
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatSelectModule, MatFormFieldModule,MatDatepickerModule,MatOptionModule,MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SearchScheduleComponent implements OnInit{
  datePicker!: ElementRef;
  selectedDate!: Date;
  routeList!: Route[];
  filteredRoutesList: Route[] = [];
  today!: string;
  uniqueEndPoints: string[] = [];
  uniqueStartPoints: string[] = [];
  @ViewChild('startSelect') startSelect!: MatSelect;
  @ViewChild('endSelect') endSelect!: MatSelect;
  @Input('currPage') currPage: string = '';
  @Output() scheduleSearchClicked: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private routeService:RouteService,
    private snackBarService: SnackBarService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ){}

  
  tripForm= new FormGroup({
    start_point: new FormControl(''),
    end_point: new FormControl(''),
    date_choose: new FormControl(new Date()),
  })

  ngOnInit(): void {
    // Today
    const now = new Date(); 
    const month = ('0' + (now.getMonth() + 1)).slice(-2); 
    const day = ('0' + now.getDate()).slice(-2); 
    this.today = `${now.getFullYear()}-${month}-${day}`;

    // Load RouteList
    this.routeService.getRoutes().subscribe(
      {
        next: (response:Route[]) => {
          this.routeService.setRoutes(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.routeList = this.routeService.getRoutesCurrent();
    this.filteredRoutesList = this.routeList.filter(route =>route.enable==true);
    this.uniqueStartPoints = Array.from(new Set(this.filteredRoutesList.map(route => route.start_point)));
    this.uniqueEndPoints = Array.from(new Set(this.filteredRoutesList.map(route => route.end_point)));

    if(localStorage.getItem('start_point') && localStorage.getItem('end_point') && localStorage.getItem('date_choose')){
      this.tripForm.setValue({ 
        start_point: localStorage.getItem('start_point') || '', 
        end_point: localStorage.getItem('end_point') || '', 
        date_choose: JSON.parse(localStorage.getItem('date_choose')!) || null,
      })
    }
  }


  handleSearchTrip(event:Event) {
    event.preventDefault();
    const start_point = this.tripForm.get("start_point")?.value;
    const end_point = this.tripForm.get("end_point")?.value;
    const date_choose = this.tripForm.get("date_choose")?.value;

    if(start_point==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập điểm bắt đầu");
    
    }else if(end_point==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập điểm kết thúc");

    }else if(date_choose==null){
      this.snackBarService.notifyWarningUser("Vui lòng chọn ngày");

    }else {
      this.routeService.setRoutes(this.filteredRoutesList);
      
      // Router schedule page 
      if(this.currPage!='schedule') {
        this.router.navigate(['schedule']);
      }

      // store input
      localStorage.setItem('start_point',start_point!);
      localStorage.setItem('end_point',end_point!);
      localStorage.setItem('date_choose',JSON.stringify(date_choose)!);
      this.scheduleSearchClicked.emit();
    }
  }

  // Reload route when input
  filterRoutesStart(value: string) { 
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterValue = normalizeText(value.toLowerCase()); 
    this.filteredRoutesList = this.routeList.filter(route => 
      (normalizeText(route.start_point.toLowerCase()).includes(filterValue)) && route.enable == true
    );
    this.uniqueStartPoints = Array.from(new Set(this.filteredRoutesList.map(route => route.start_point)));
    this.cdr.detectChanges();

    this.tripForm.get('start_point')?.setValue(""); 

    // Open the dropdown if there are filtered routes if 
    if (this.filteredRoutesList.length > 0) { 
      this.startSelect.open(); 
    };
  }

  // Reload route when input
  filterRoutesEnd(value: string) { 
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterValue = normalizeText(value.toLowerCase()); 
    this.filteredRoutesList = this.routeList.filter(route => 
      (normalizeText(route.end_point.toLowerCase()).includes(filterValue) ) && route.enable == true
    );
    this.uniqueEndPoints = Array.from(new Set(this.filteredRoutesList.map(route => route.end_point)));
    this.cdr.detectChanges();

    this.tripForm.get('end_point')?.setValue(""); 



    // Open the dropdown if there are filtered routes if 
    if (this.filteredRoutesList.length > 0) { 
      this.endSelect.open(); 
    };
  }

  onStartRouteSearch(event: Event) { 
    const input = event.target as HTMLInputElement; 
    if (input) { 
      const value = input.value; 
      this.filterRoutesStart(value); 
    }
  }

  onEndRouteSearch(event: Event) { 
    const input = event.target as HTMLInputElement; 
    if (input) { 
      const value = input.value; 
      this.filterRoutesEnd(value); 
    }
  }


  
}
