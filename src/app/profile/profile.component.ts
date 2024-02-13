import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { LoginService } from '../services/login.service';
import { IUser } from '../model/IUser';
import { IAccount } from '../model/IAccount';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId: number | null = null;
  userName: string | null = null;
  userAge: number | null = null;
  userPhone: string | null = null;
  userAddress: string | null = null;
  balanceList: IAccount[] = [];
  showAccountModal: boolean = false;
  selectedAccountType: string = '';
  showAccountInfo: boolean = false;
  subsForm = new Subscription();

  currentIndex = 0;
  editingMode = false;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService
  ) {}

  userIcons = [
    { value: 'luffy', image: 'assets/img_icons/luffy.jpeg', alt: 'luffy Icon' },
    { value: 'zoro', image: 'assets/img_icons/zoro.jpeg', alt: 'zoro Icon' },
    { value: 'nami', image: 'assets/img_icons/nami.jpeg', alt: 'nami Icon' },
    { value: 'sanji', image: 'assets/img_icons/sanji.jpeg', alt: 'sanji Icon' },
    { value: 'chopper', image: 'assets/img_icons/chooper.jpeg', alt: 'Chopper Icon'},
    { value: 'brook', image: 'assets/img_icons/brook.jpeg', alt: 'Brook Icon' },
    { value: 'robin', image: 'assets/img_icons/robin.jpeg', alt: 'Robin Icon' },
    { value: 'jinbe', image: 'assets/img_icons/jinbe.jpeg', alt: 'Jinbe Icon' },
  ];

  prevIcon() {
    this.currentIndex =
      (this.currentIndex - 1 + this.userIcons.length) % this.userIcons.length;
  }

  nextIcon() {
    this.currentIndex = (this.currentIndex + 1) % this.userIcons.length;
  }

  private saveSelectedImageIndex() {
    localStorage.setItem('selectedImageIndex', String(this.currentIndex));
  }

  enterEditMode() {
    this.editingMode = true;
  }

  confirmEdit() {
    this.editingMode = false;
    this.saveSelectedImageIndex();
  }

  cancelEdit() {
    this.editingMode = false;
  }

  ngOnInit() {
    this.userId = this.loginService.getAuthenticatedUserId();
    this.userName = this.loginService.getAuthenticatedUserName();

    if (this.userId !== null) {
      this.profileService.getUserInfoById(this.userId).subscribe(
        (user: IUser) => {
          this.userName = user.name;
          this.userAge = user.age;
          this.userPhone = user.phone;
          this.userAddress = user.address;
        },
        (error) => {
          console.error('Erro ao obter informações do usuário:', error);
        }
      );

      this.profileService.getBalanceList(this.userId).subscribe(
        (balanceList: IAccount[]) => {
          this.balanceList = balanceList;
        },
        (error) => {
          console.error('Erro ao obter lista da conta', error);
        }
      );
    }

    const storedIndex = localStorage.getItem('selectedImageIndex');
    this.currentIndex = storedIndex ? +storedIndex : 0;
  }

  //visibilidade infor
  toggleAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  //visibilidade modal
  toggleAccountModal() {
    this.showAccountModal = !this.showAccountModal;
    if (!this.showAccountModal) {
      document.body.classList.remove('modal-open');
    }
  }

  createAccount() {
    console.log('Criando conta...');
    if (this.userId !== null) {
      this.profileService
        .createAccount(this.userId, this.selectedAccountType)
        .subscribe(
          (response: any) => {
            console.log('Conta criada com sucesso:', response);
            this.closeAccountModal();
          },
          (error) => {
            console.error('Erro ao criar conta:', error);
          }
        );
    } else {
      console.error('ID do usuário não disponível.');
    }
  }

  closeAccountModal() {
    this.showAccountModal = false;
    document.body.classList.remove('modal-open');
  }

  hasAccountType(): boolean {
    return this.balanceList && this.balanceList.length > 0;
  }

  ngOnDestroy(): void {
    this.subsForm.unsubscribe();
  }
}
