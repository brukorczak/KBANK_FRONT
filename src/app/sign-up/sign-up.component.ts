import { Component, OnDestroy } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnDestroy {
  formSignUp: FormGroup;
  mensagemErro: string = '';
  signupClicado: boolean = false;
  subsForm = new Subscription();

  name: string = '';
  age: number | undefined = undefined;
  phone: number | undefined = undefined;
  cpf: string = '';
  password: string = '';
  address: string = '';

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formSignUp = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: ['', [Validators.required]],
      password: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  signUp() {
    this.signupClicado = true;
    this.mensagemErro = '';

    if (this.formSignUp.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const { name, age, phone, cpf, password, address } = this.formSignUp.value;

    this.subsForm = this.signUpService
      .signUp(name, age, phone, address, cpf, password)
      .subscribe(
        (response: any) => {
          console.log('Usuário Cadastrado:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erro de cadastro:', error);
          this.mensagemErro =
            'Erro ao cadastrar usuário. Verifique campos e dados e tente novamente.';
        }
      );
  }

  ngOnDestroy(): void {
    this.subsForm.unsubscribe();
  }
}
