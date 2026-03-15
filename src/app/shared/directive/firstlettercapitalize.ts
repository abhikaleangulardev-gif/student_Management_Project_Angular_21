import {  AfterViewInit, Directive, HostListener } from "@angular/core";

@Directive({
    selector:'[appFirstLetterCaptialize]'
})

export class FirstLetterCapitalize{
    constructor(){}
    
    @HostListener('input',['$event'])

    onInput(event:Event){
        const input = event.target as HTMLInputElement;

        if(input.value.length > 0){
            input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
        }
    }
}