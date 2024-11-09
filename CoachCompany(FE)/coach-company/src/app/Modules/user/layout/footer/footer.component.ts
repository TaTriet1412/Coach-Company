import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterUserComponent {
  @ViewChild('backToTop') backToTopElement!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  OnScroll(){
    if(window.scrollY > 300) {
      this.backToTopElement.nativeElement.classList.remove('showFadeOut')
      this.backToTopElement.nativeElement.classList.add('showFadeIn')
    }else {
      this.backToTopElement.nativeElement.classList.remove('showFadeIn')
      this.backToTopElement.nativeElement.classList.add('showFadeOut')  
    }
  }

  
}
