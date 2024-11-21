import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../dto/user';
import { EmployeeService } from '../../../core/services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AboutComponent implements OnInit, AfterViewInit {
  employeeList: User[] = [];

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadEmployeeData();
  }

  private async loadEmployeeData(): Promise<void> {
    this.employeeService.getUsers().subscribe({
      next: (response: User[]) => {
        this.employeeService.setUserList(response);
        this.employeeList = this.employeeService.getUserListCurrent().slice(0, 4);
        this.cdr.detectChanges();
      },
      error: (response: any) => {
        console.error(response);
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
