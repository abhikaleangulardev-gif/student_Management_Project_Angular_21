import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllFirstLetterCaptalize]',
})
export class AllFirstLetterCaptalize {

  constructor() { }

  @HostListener('input', ['$event'])

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.value.length > 0) {
      input.value = input.value.toLowerCase().split(' ').map((char: any) => char.charAt(0).toUpperCase() + char.slice(1)).join(' ');
    }
  }
}
