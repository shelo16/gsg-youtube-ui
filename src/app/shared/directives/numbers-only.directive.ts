import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  public text;

  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keypress', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);

    if (next.includes('.') || (next && !String(next).match(this.regex))) {
      event.preventDefault();
    }
  }
}
