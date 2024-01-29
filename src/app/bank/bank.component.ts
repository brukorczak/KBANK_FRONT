import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importe o FormBuilder e Validators

import { BankService } from './bank.service';  // Importe o serviço

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent {
  formDeposit: FormGroup;  // Adicione o FormGroup para o formulário
  formWithdraw: FormGroup;
  formTransfer: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private router: Router,
    private bankService: BankService,
    private fb: FormBuilder  // Injete o FormBuilder
    ) {
      this.formDeposit = this.fb.group({
        accountNumber: ['', Validators.required],
        value: [null, [Validators.required, Validators.min(1)]]
      });

      this.formWithdraw = this.fb.group({
        accountNumber: ['', Validators.required],
        value: [null, [Validators.required, Validators.min(1)]]
      });

      this.formTransfer = this.fb.group({
        sourceAccountNumber: ['', Validators.required],
        targetAccountNumber: ['', Validators.required],
        value: [null, [Validators.required, Validators.min(1)]]
      });
    }

  deposit(): void {
    if (this.formDeposit.valid) {
      const { accountNumber, value } = this.formDeposit.value;
      this.bankService.deposit(accountNumber, value).subscribe(
        (response) => {
          this.mensagemSucesso = response;  // Agora, a mensagem de sucesso deve vir diretamente da resposta
          this.formDeposit.reset();
        },
        (error) => {
          this.mensagemErro = `Erro ao realizar depósito: ${error.message}`;
        }
      );
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  withdraw(): void {
    if (this.formWithdraw.valid) {
      const { accountNumber, value } = this.formWithdraw.value;
      this.bankService.withdraw(accountNumber, value).subscribe(
        (response) => {
          this.mensagemSucesso = response;  // Agora, a mensagem de sucesso deve vir diretamente da resposta
          this.formWithdraw.reset();
        },
        (error) => {
          this.mensagemErro = `Erro ao realizar saque: ${error.message}`;
        }
      );
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  transfer(): void {
    if (this.formTransfer.valid) {
      const { sourceAccountNumber, targetAccountNumber, value } = this.formTransfer.value;
      this.bankService.transfer(sourceAccountNumber, targetAccountNumber, value).subscribe(
        (response) => {
          this.mensagemSucesso = response;
          this.formTransfer.reset();
        },
        (error) => {
          this.mensagemErro = `Erro ao realizar transferência: ${error.message}`;
        }
      );
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
