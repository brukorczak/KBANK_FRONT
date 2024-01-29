import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  signUp(name: string, age: number, phone:number, address: string, cpf: string, password:string ): Observable<any> {
    const body = { name, age, phone, address, cpf, password};
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiUrl}`, body, { headers, withCredentials: true });
  }
}
