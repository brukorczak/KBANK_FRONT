import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup;
  loginClicado: boolean = false;
  mensagemErro: string = '';

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      cpf: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loginClicado = true;
    this.mensagemErro = '';

    if (this.formLogin.invalid) {
      this.mensagemErro = 'Preencha todos os campos.';
      return;
    }

    this.loginService.login(this.formLogin.value.cpf, this.formLogin.value.password).subscribe(
      (response: any) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro de autenticação:', error);
        this.mensagemErro = 'Usuário não encontrado ou senha incorreta';
      }
    );
  }

}
