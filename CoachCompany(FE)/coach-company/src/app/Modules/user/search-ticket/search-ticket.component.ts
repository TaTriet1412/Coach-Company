import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrl: './search-ticket.component.css'
})
export class SearchTicketComponent {
  protected aFormGroup!: FormGroup;
  siteKey:string = "6LdDG3QqAAAAAOFA5x6wPJPC8dMCICHGTuabMmkE";
  disabled:boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  handleSuccess(){
    this.disabled = false;
  }
}
