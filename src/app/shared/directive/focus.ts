import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class Focus implements AfterViewInit,OnChanges {

  @Input('appFocus')shouldFocus = false;

  constructor(private el:ElementRef){}

  ngAfterViewInit(): void {
      this.setFocus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['shouldFocus']){
      this.setFocus();
    }
  }

  private setFocus(){
    if(this.shouldFocus){
       setTimeout(() =>{ this.el.nativeElement.focus()},500);
    }
  }

}
