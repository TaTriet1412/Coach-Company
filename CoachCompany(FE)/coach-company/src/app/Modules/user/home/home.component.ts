import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgwWowService } from "ngx-wow"
import { SearchScheduleComponent } from "../search-schedule/search-schedule.component";
import { ContactComponent } from '../contact/contact.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { PaymentService } from '../../../core/services/payment.service';
import { response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AboutComponent } from "../about/about.component";
import { Route } from '../../dto/route';
import { RouteService } from '../../../core/services/route.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@coreui/angular';
import { ShareModule } from "../../share/share.module";

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [SearchScheduleComponent, ContactComponent, AboutComponent, CommonModule, ShareModule]
})
export class HomeUserComponent implements  OnInit ,AfterViewInit{
  @ViewChild('spinner') spinnerElement!: ElementRef;
  routeList!: Route[];
  top6Routes!: Route[];
  new6Routes!: Route[];


  constructor(
    private wowService: NgwWowService,
    private routeService:RouteService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private snackBarService:SnackBarService,
    private paymentService:PaymentService,
    private cdr: ChangeDetectorRef,
  ){}

  async ngOnInit(): Promise<void> {
    // Time for spinner appear
    
    setTimeout(() => {
      if (this.spinnerElement.nativeElement.textContent.length) {
        this.spinnerElement.nativeElement.classList.remove('show');
      }
    }, 10);
    
    this.wowService.init();

    const routeListCurr = await firstValueFrom(this.routeService.getRoutes());
    this.routeService.setRoutes(routeListCurr);
    this.routeList = this.routeService.getRoutesCurrent().filter(route => route.enable);
    this.top6Routes = this.getTopRoutes(this.routeList, 6);
    this.new6Routes = this.getLastRoutes(this.routeList, 6);
    this.cdr.detectChanges();
  }

  async ngAfterViewInit(): Promise<void> {
      await this.ngOnInit();
  }

  getTopRoutes(routes: Route[], maxElements: number): Route[] { 
    return routes.length > maxElements ? routes.slice(0, maxElements) : routes; 
  }

  getLastRoutes(routes: Route[], maxElements: number): Route[] { 
    return routes.slice(-maxElements); 
  }

  updatePaymentStatus(){
    this.paymentService.processAfterPayed()
      .subscribe({
        next: (response:any) => {
          this.snackBarService.notifySuccessUser('Thanh toán thành công')
          this.router.navigate(['/'])
        }
      })
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  goToSchedule() {
    this.router.navigate(["/user/schedule"])
  }

  goToScheduleHasRouteId(routeId: number) {
    localStorage.setItem('start_point',this.routeService.getRouteById(routeId)?.start_point!);
    localStorage.setItem('end_point',this.routeService.getRouteById(routeId)?.end_point!);
    localStorage.setItem('date_choose',JSON.stringify(new Date()));
    this.router.navigate(["/user/schedule"])
  }
  
}
