import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent {
  formDeposit: FormGroup;
  formWithdraw: FormGroup;
  formTransfer: FormGroup;
  mensagemSucessoDeposito: string = '';
  mensagemErroDeposito: string = '';

  mensagemSucessoSaque: string = '';
  mensagemErroSaque: string = '';

  mensagemSucessoTransferencia: string = '';
  mensagemErroTransferencia: string = '';

  constructor(
    private router: Router,
    private bankService: BankService,
    private fb: FormBuilder
  ) {
    this.formDeposit = this.fb.group({
      accountNumber: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(1)]],
    });

    this.formWithdraw = this.fb.group({
      accountNumber: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(1)]],
    });

    this.formTransfer = this.fb.group({
      sourceAccountNumber: ['', Validators.required],
      targetAccountNumber: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(1)]],
    });
  }

  deposit(): void {
    if (this.formDeposit.valid) {
      const { accountNumber, value } = this.formDeposit.value;
      this.bankService.deposit(accountNumber, value).subscribe(
        (response) => {
          this.mensagemSucessoDeposito = response;
          this.formDeposit.reset();
        },
        (error) => {
          this.mensagemErroDeposito = `Erro ao realizar depósito reveja os dados`;
        }
      );
    } else {
      this.mensagemErroDeposito =
        'Por favor, preencha todos os campos corretamente.';
    }
  }

  withdraw(): void {
    if (this.formWithdraw.valid) {
      const { accountNumber, value } = this.formWithdraw.value;
      this.bankService.withdraw(accountNumber, value).subscribe(
        (response) => {
          this.mensagemSucessoSaque = response;
          this.formWithdraw.reset();
        },
        (error) => {
          this.mensagemErroSaque = `Erro ao realizar saque, reveja os dados`;
        }
      );
    } else {
      this.mensagemErroSaque =
        'Por favor, preencha todos os campos corretamente.';
    }
  }

  transfer(): void {
    if (this.formTransfer.valid) {
      const { sourceAccountNumber, targetAccountNumber, value } =
        this.formTransfer.value;
      this.bankService
        .transfer(sourceAccountNumber, targetAccountNumber, value)
        .subscribe(
          (response) => {
            this.mensagemSucessoTransferencia = response;
            this.formTransfer.reset();
          },
          (error) => {
            this.mensagemErroTransferencia = `Erro ao realizar transferência, reveja os dados`;
          }
        );
    } else {
      this.mensagemErroTransferencia =
        'Por favor, preencha todos os campos corretamente.';
    }
  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
