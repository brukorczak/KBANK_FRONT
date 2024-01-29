import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { IUser } from '../model/IUser';
import { IAccount } from '../model/IAccount';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  getUserInfoById(userId: number): Observable<IUser> {
    const url = `${this.apiUrl}/${userId}/info`;
    return this.http.get<IUser>(url);
  }

  getBalanceList(userId: number): Observable<IAccount[]> {
    const url = `${this.apiUrl}/balances/${userId}`;
    return this.http.get<IAccount[]>(url);
  }

  createAccount(userId: number, accountType: string): Observable<any> {
    const body = { accountType };
    const headers = { 'Content-Type': 'application/json' };

    console.log('Antes da solicitação de criação de conta...');

    return this.http.post(`${this.apiUrl}/${userId}/accounts`, body, {
      headers,
    }).pipe(
      tap(response => console.log('Resposta da criação de conta:', response)),
      catchError(error => {
        console.error('Erro na criação de conta:', error);
        throw error;
      })
    );
  }

}
