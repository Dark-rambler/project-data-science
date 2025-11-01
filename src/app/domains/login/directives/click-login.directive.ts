import { Directive, HostListener, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[appClickLogin]',
})
export class ClickLoginDirective {

  // Inyectamos la referencia al formulario y al servicio
  private readonly formGroupDirective = inject(FormGroupDirective);
  private readonly loginService = inject(LoginService);

  @HostListener('click')
  private logIn() {
    const formValue = this.formGroupDirective.form.value;
    console.log('Datos del formulario:', formValue);
    const form = this.formGroupDirective.form;
    if (form.invalid) {
      form.markAllAsTouched();
      console.warn('Formulario inválido');
      return;
    }

    // Aquí podrías llamar directamente al servicio:
    // this.loginService.login(formValue).subscribe({
    //   next: (response) => console.log('Login exitoso:', response),
    //   error: (error) => console.error('Error en login:', error)
    // });
  }
}
