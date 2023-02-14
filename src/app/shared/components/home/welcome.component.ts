import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass'],
})
export class WelcomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  nickName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated()
    if(this.isLoggedIn) {
      this.nickName = this.authService.nickname;
    } else {
      this.nickName = '';
    }
  }

}
