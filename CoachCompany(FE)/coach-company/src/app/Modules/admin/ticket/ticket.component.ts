import { Component, OnInit, ChangeDetectorRef, ElementRef , ViewChild, ViewEncapsulation, AfterViewInit  } from '@angular/core';
import { RouteService } from '../../../core/services/route.service';
import { Route } from '../../dto/route';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataTablesModule} from "angular-datatables"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BusService } from '../../../core/services/bus.service';
import { Trip } from '../../dto/trip';
import { TripService } from '../../../core/services/trip.service';
import { Ticket } from '../../dto/ticket';
import 'datatables.net' ;
import { TicketService } from '../../../core/services/ticket.service';
import { Bus } from '../../dto/bus';
import { ShareModule } from '../../share/share.module';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule,DataTablesModule,ShareModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  createUrl = '/admin/ticket/create-ticket';
  updateUrl = '/admin/ticket/update-ticket';
  deleteUrl = '/admin/ticket/delete-ticket';
  pageType = 'ticket';
  headerList = ['Mã vé','Mã chuyến','Tên khách','Số điện thoại',
    'Email','Giá vé','Trạng thái','Ngày tạo'];
  ticketList!: Ticket[];
  routeList!: Route[];
  tripList!: Trip[];
  busList!: Bus[];
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;

  constructor(
    public routeService:RouteService,
    public busService:BusService,
    public tripService:TripService,
    public ticketService:TicketService,
    public router: Router,
    public http:HttpClient,
    public cdr: ChangeDetectorRef
  ){}
  
  ngOnInit(): void {
    //Load Ticket
    this.ticketService.getTickets().subscribe(
      {
        next: (response:Ticket[]) => {
          this.ticketService.setTicketList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.ticketList = this.ticketService.getTicketList();
    this.ticketList.forEach(ticket =>{
      this.ticketService.getPrice(ticket.id)
        .subscribe({
          next: (response: any) => {ticket.price = response},
          error: (response: any) => {}
        });
    })

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

    // Load busList khi da chon tuyen
    this.busService.getBuses().subscribe(
      {
        next: (response:Bus[]) => {
          this.busService.setBusList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.busList = this.busService.getBusList();
  
  
    //Load Trip
    this.tripService.getTrips().subscribe(
      {
        next: (response:Trip[]) => {
          this.tripService.setTripList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.tripList = this.tripService.getTripList();
  }

  dtTrigger: Subject<any> = new Subject<any>();

  
  // Store the DataTable options in a variable
  private dtOptions: any = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
    lengthMenu: [5, 10, 25, 50, 100],
    searching: true,
    language: {
      search: "Tìm kiếm:",
      searchPlaceholder: "Tìm kiếm",
      lengthMenu: "Hiển thị _MENU_ mục",
      info: "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
      infoEmpty: "Không có dữ liệu",
      paginate: {
        first: "Đầu",
        last: "Cuối",
        next: "Tiếp",
        previous: "Trước"
      },
      emptyTable: "Không có dữ liệu trong bảng"
    }
  };

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  initializeDataTable(): void {
    $('#dataTableTickets').DataTable({
      ...this.dtOptions,
      destroy: true 
    });

    this.dtTrigger.next(true);
  }

  createElement(){
    this.router.navigate([this.createUrl]);
  }

  updateElement(id: number){
      this.router.navigate([`${this.updateUrl}/${id}`]);
  }

  trackById(id: number, ticket: Ticket): number{
    return ticket.id
  }

}

