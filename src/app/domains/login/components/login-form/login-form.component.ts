import { Component, inject } from '@angular/core';
import { InputFormComponent } from '../../../../shared/input-form/input-form';
import { LoginControls } from '../../enums/login-controls.enum';
import { ClickLoginDirective } from "../../directives/click-login.directive";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LOGIN_FORM_CONTROLS } from '../../constants/login-form.constants';

@Component({
    selector: 'app-login-form',
    imports: [InputFormComponent, ClickLoginDirective, ReactiveFormsModule],
    templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
    protected readonly loginControls = LoginControls;
    private readonly _formBuilder = inject(FormBuilder)
    protected form = this._formBuilder.group(LOGIN_FORM_CONTROLS);


}
