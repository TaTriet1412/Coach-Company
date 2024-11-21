import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { UserService } from '../../../../core/services/user.service';
import { Contact } from '../../../dto/contact';

@Component({
  selector: 'app-process-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './process-contact.component.html',
  styleUrl: './process-contact.component.css'
})
export class ProcessContactComponent implements OnInit, AfterViewInit{
  contactId!: number;
  today!: string;

  constructor(
    private snackBarService: SnackBarService,
    private userService:UserService,
    private contactService:ContactService,
    private router:Router,private http:HttpClient,
    private activeRoute: ActivatedRoute) {}
  contactForm= new FormGroup({
    id: new FormControl(0),
    name_sender: new FormControl(''),
    email_sender: new FormControl(''),
    phone_sender: new FormControl(''),
    job_sender: new FormControl(''),
    address_sender: new FormControl(''),
    message_sender: new FormControl(''),
    message_processor: new FormControl(''),
  })

  handleProcessContact(event:Event){
    event.preventDefault();

    const email_sender = this.contactForm.get("email_sender")?.value?.trim()!;
    const message_processor = this.contactForm.get("message_processor")?.value?.trim()!;

     // Thông báo warning
     if(message_processor==""){
      this.snackBarService.notifyWarning("Vui lòng nhập phản hồi!");
    
    }else {
      const processor = this.userService.getUser();
      const processor_id = processor?.id;

      this.contactService.processContact(this.contactId,Number(processor_id),message_processor,email_sender)
      .subscribe({
        next: (response: Contact) => {
          this.snackBarService.notifySuccess("Phản hồi thành công");
          const updatedContactList = this.contactService.getContactsList().map(contact => contact.id === response.id ? response : contact );
          this.contactService.setContactList(updatedContactList);
        },
        error: (response:any) => this.snackBarService.notifyError(response.error.message)
      })
    }

  }


  backList() {
    this.router.navigate(['staff/contact']);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.contactId = +params['id'];
      this.loadContact();
    })


  }
  
  ngAfterViewInit(): void {
    const now = new Date(); 
    const month = ('0' + (now.getMonth() + 1)).slice(-2); 
    const day = ('0' + now.getDate()).slice(-2); 
    this.today = `${now.getFullYear()}-${month}-${day}`;
    
  }

  loadContact(): void { 
    const contact = this.contactService.getContactById(this.contactId); 
    this.contactForm.patchValue(contact!); 
    if(contact?.message_processor==undefined){
      this.contactForm.get("message_processor")?.setValue("");
    }
  }
}
