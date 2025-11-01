import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.component.html',
})
export class ButtonComponentComponent {
  public label = input<"blue" | "red" | "green">("blue");
}
