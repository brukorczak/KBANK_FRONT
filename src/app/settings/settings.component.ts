// settings.component.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userId: number | null = null;
  userName: string | null = null;
  userAge: number | null = null;
  userPhone: string | null = null;
  userAddress: string | null = null;
  editingMode = false;

  constructor(
    private loginService: LoginService,
    private settingsService: SettingsService,
    private router:Router,
  ) {}

  ngOnInit() {
    this.userId = this.loginService.getAuthenticatedUserId();
    this.userName = this.loginService.getAuthenticatedUserName();

    if (this.userId !== null) {
      // Fetch user information for editing
      this.settingsService.getUserInfoById(this.userId).subscribe(
        (user: any) => {
          this.userAge = user.age;
          this.userPhone = user.phone;
          this.userAddress = user.address;
        },
        (error) => {
          console.error('Error getting user information:', error);
        }
      );
    }
  }

  enterEditMode() {
    this.editingMode = true;
  }

  confirmEdit() {
    if (this.userId !== null) {
      const userData = {
        name: this.userName,
        age: this.userAge,
        phone: this.userPhone,
        address: this.userAddress,
      };

      // Update user information
      this.settingsService.updateUser(this.userId, userData).subscribe(
        (response: any) => {
          console.log('User information updated successfully:', response);
          this.editingMode = false; // Exit editing mode
        },
        (error) => {
          console.error('Error updating user information:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.editingMode = false;
  }


  deleteAccount() {
    const confirmDelete = confirm('Deseja mesmo apagar a conta?');

    if (confirmDelete && this.userId !== null) {
      this.settingsService.deleteUser(this.userId).subscribe(
        () => {
          console.log('Conta deletada com sucesso');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erro ao deletar conta:', error);
        }
      );
    }
  }

}
