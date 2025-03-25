import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-default-staff-ui',
  templateUrl: './default-staff-ui.component.html',
  styleUrl: './default-staff-ui.component.css'
})
export class DefaultStaffUiComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router) {

    // Check route 
    console.log(route);
    let url = sessionStorage.getItem('currentUrl');
    if (url && url != "#/user/login") {
      this.router.navigate(url.replace('#/', '').split('/'));
      sessionStorage.removeItem('currentUrl');
    }
  }
}
