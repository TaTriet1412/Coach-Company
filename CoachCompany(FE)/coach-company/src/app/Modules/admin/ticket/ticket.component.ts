import { Component } from '@angular/core';
import { LayoutCrudComponent } from "../layout-crud/layout-crud.component";
import { TICKETS } from '../../dto/ticket';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [LayoutCrudComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  createUrl = '/admin/ticket/create-ticket';
  updateUrl = '/admin/ticket/update-ticket';
  deleteUrl = '/admin/ticket/delete-ticket';
  pageType = 'ticket';
  headerList = ['Mã vé','Mã chuyến','Giá vé'];
  ticketList = TICKETS;
  

}

