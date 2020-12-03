import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';

  constructor(
    private http: HttpClient,
    private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const storedUser = localStorage.getItem('user');
    if(storedUser === null)
    this.accountService.setCurrentUser(undefined);
    else {
      const user: User = JSON.parse(storedUser);
      this.accountService.setCurrentUser(user);
    }
  }
}
