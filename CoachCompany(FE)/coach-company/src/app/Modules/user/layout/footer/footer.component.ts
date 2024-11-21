import { Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Company } from '../../../dto/company';
import { CompanyService } from '../../../../core/services/company.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterUserComponent implements OnInit{
  @ViewChild('backToTop') backToTopElement!: ElementRef;
  company!: Company;

  constructor(
    private companyService: CompanyService,
    private snackBarService: SnackBarService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.companyService.getCompany()
      .subscribe({
        next: (response: Company) => {
          this.companyService.setCompany(response)
          this.company = response;
        },
        error: (response: any) => this.snackBarService.notifyError(response.error.message)
      })
  }

}
