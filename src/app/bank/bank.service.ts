import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  deposit(accountNumber: string, value: number): Observable<any> {
    const depositData = { accountNumber, value };
    return this.http.post(`${this.apiUrl}/deposit`, depositData, { responseType: 'text' });
  }

  withdraw(accountNumber: string, value: number): Observable<any> {
    const withdrawData = { accountNumber, value };
    const headers = { 'Content-Type': 'application/json' }; // Adicione cabeçalho JSON
    return this.http.post(`${this.apiUrl}/withdraw`, withdrawData, { headers, responseType: 'text' });
  }

  transfer(sourceAccountNumber: string, targetAccountNumber: string, value: number): Observable<any> {
    const transferData = { sourceAccountNumber, targetAccountNumber, value };
    const headers = { 'Content-Type': 'application/json' }; // Adicione cabeçalho JSON

    return this.http.patch(`${this.apiUrl}/transfer`, transferData, { headers, responseType: 'text' });
}

}
