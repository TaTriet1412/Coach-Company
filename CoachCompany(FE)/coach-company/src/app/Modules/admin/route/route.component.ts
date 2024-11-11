import { Component, OnInit } from '@angular/core';
import { LayoutCrudComponent } from '../layout-crud/layout-crud.component';
import { RouteService } from '../../../core/services/route.service';
import { Route } from '../../dto/route';
import { response } from 'express';

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [LayoutCrudComponent],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent implements OnInit {
  createUrl = '/admin/route/create-route';
  updateUrl = '/admin/route/update-route';
  deleteUrl = 'routes';
  pageType = 'route';
  headerList = ['Mã tuyến','Điểm bắt đầu','Các điểm dừng','Điểm kết thúc','Thời lượng','Khoảng cách','Trạng thái','Giá','Ngày Tạo'];
  routeList!: Route[];
  constructor(private routeService:RouteService){}  
  
  ngOnInit(): void {
      this.routeService.getRoutes().subscribe(
        {
          next: (response:Route[]) => {
            this.routeService.setRoutes(response)
          },
          error: (response: any) => console.log(response.error)
        }
      );
      this.routeList = this.routeService.getRoutesCurrent();
    }
}
