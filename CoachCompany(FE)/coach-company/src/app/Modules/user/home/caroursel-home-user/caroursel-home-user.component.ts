import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselComponent, CarouselModule } from '@coreui/angular';
@Component({
  selector: 'app-caroursel-home-user',
  templateUrl: './caroursel-home-user.component.html',
  styleUrl: './caroursel-home-user.component.css',
  standalone: true,
  imports: [CommonModule,CarouselComponent,CarouselModule]
})
export class CarourselHomeUserComponent implements OnInit{
  slides: any[] =  []
  selectedIndex = 0
 
  ngOnInit(): void {
    this.slides.push(
      {
        id: 0,
        src: '/assets/img/carousel-1.jpg',
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
        name: 'bus-1'
      },{
        id: 1,
        src: '/assets/img/carousel-2.jpg',
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        name: 'bus-2'
      })
  }

}
