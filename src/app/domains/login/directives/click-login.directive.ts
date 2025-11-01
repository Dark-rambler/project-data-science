import { Directive, HostListener, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AuthService } from '../../../shared/services/auth.service';

@Directive({
  selector: '[appClickLogin]',
})
export class ClickLoginDirective {

  private readonly formGroupDirective = inject(FormGroupDirective);
  private readonly _authService = inject(AuthService);

  @HostListener('click')
  private logIn() {
    const formValue = this.formGroupDirective.form.value;
    const form = this.formGroupDirective.form;
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    this._authService.Authentication(formValue)
  }
}
