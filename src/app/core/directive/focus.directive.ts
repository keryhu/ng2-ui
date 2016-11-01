import {Inject, ElementRef,Directive, Input} from "@angular/core";

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {

  @Input('appFocus') focus:boolean;

  constructor(@Inject(ElementRef) private element: ElementRef) {}
  protected ngOnChanges() {
    this.element.nativeElement.focus();
  }

}
