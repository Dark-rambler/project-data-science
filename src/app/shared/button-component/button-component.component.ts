import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-component.component.html',
})
export class ButtonComponentComponent {
  public label = input<string>('Enviar');

  public color = input<'blue' | 'red' | 'green'>('blue');

  public loading = input<boolean>(false);

  public classes = computed(() => {
    const color = this.color();
    const base =
      'flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-medium transition-all duration-200 shadow-md';
    const variants = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      red: 'bg-red-600 hover:bg-red-700',
      green: 'bg-green-600 hover:bg-green-700',
    };
    return `${base} ${variants[color]}`;
  });
}
