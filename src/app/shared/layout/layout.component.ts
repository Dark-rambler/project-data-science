import { Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    standalone: true,
    imports:[HeaderComponent]
})
export class LayoutComponent {
}
