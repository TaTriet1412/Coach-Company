import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../dto/company';
import { CompanyService } from '../../../core/services/company.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../dto/contact';
import { ShareModule } from '../../share/share.module';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ShareModule]
})
export class ContactComponent implements OnInit {
  @ViewChild("iframe") iframe!:ElementRef;
  map!: string;
  company!: Company;

  contactForm= new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    job: new FormControl(''),
    address: new FormControl(''),
    message: new FormControl(''),
  })

  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private snackBarService: SnackBarService,
    private cdf: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    this.companyService.getCompany()
      .subscribe({
        next: (response: Company) => {
          this.companyService.setCompany(response);
          this.company = response;
          this.map = this.company.map;
          this.cdf.detectChanges();
        },
        error: (response: any) => this.snackBarService.notifyError(response.error.message)
      })
  }

 

  handleCreateContact(event:Event) {
    const email = this.contactForm.get("email")?.value?.trim()!;
    const name = this.contactForm.get("name")?.value?.trim()!;
    const phone = this.contactForm.get("phone")?.value?.trim()!;
    const address = this.contactForm.get("address")?.value?.trim()!;
    const job = this.contactForm.get("job")?.value?.trim()!;
    const message = this.contactForm.get("message")?.value?.trim()!;
    // Warning
    if(name==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập họ tên!");
    
    }else if(phone==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập số điện thoại!");
    
    }else if(email==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập email!");
    
    }else if(message==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập tin nhắn!");
          
    }else{

      this.contactService.createContact(name,email,phone,address,job,message)
        .subscribe({
          next: (response: Contact) => this.snackBarService.notifySuccessUser("Tin nhắn đã gửi thành công"),
          error: (response: any) => this.snackBarService.notifyErrorUser("Tin nhắn gửi thất bại")
        })

    }
  }
}
