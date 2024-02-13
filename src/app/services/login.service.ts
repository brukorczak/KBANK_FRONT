import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/v1/users';
  private authenticatedUserId: number | null = null;
  private authenticatedUserName: string | null = null;

  constructor(private http: HttpClient) {
    const storedUserId = localStorage.getItem('authenticatedUserId');
    const storedUserName = localStorage.getItem('authenticatedUserName');

    if (storedUserId && storedUserName) {
      this.authenticatedUserId = +storedUserId;//converte para numero
      this.authenticatedUserName = storedUserName;
    }
  }

  login(cpf: string, password: string): Observable<any> {
    const body = { cpf, password };
    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .post(`${this.apiUrl}/login`, body, { headers, withCredentials: true })
      .pipe(
        tap((response: any) => {
          console.log('Resposta do login:', response);
          if (response && response.id) {
            this.authenticatedUserId = response.id;
            this.authenticatedUserName = response.name;

            localStorage.setItem(
              'authenticatedUserId',
              String(this.authenticatedUserId)
            );
            localStorage.setItem(
              'authenticatedUserName',
              this.authenticatedUserName || ''
            );
          }
        })
      );
  }

  getAuthenticatedUserId(): number | null {
    return this.authenticatedUserId;
  }

  getAuthenticatedUserName(): string | null {
    return this.authenticatedUserName;
  }
}
