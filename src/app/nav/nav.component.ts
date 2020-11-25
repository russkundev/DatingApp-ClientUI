import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  isLoggedIn: boolean = false;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  onLogin(): void {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.isLoggedIn = true;
    }, error=> {
      console.log(error);
    });
  }

  onLogout(): void {
    this.accountService.logout();
    this.isLoggedIn = false;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    }, error => {
      console.log(error);
    });
  }

}
