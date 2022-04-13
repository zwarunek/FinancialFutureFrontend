import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl()',
    '(load)': 'load()',
    '[src]':'src'
  }
})
export class ImageDirectiveDirective {
  @Input() src?:string;
  @Input() default?:string;
  @HostBinding('class') className?: string

  updateUrl() {
    this.src = this.default;
  }
  load(){
    this.className = 'image-loaded';
  }
}
