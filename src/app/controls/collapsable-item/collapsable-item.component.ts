import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsable-item',
  templateUrl: './collapsable-item.component.html',
  styleUrls: ['./collapsable-item.component.less']
})
export class CollapsableItemComponent {

  @Input() isBold: boolean = false;
  @Input() textData: string; 
  @Input() 
  set text(text: string) {
    this._text = text;
  };
  _text: string = '';
  expanded: boolean = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
