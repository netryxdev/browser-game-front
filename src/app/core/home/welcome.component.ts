import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  isLoggedIn: boolean = false; //verificar se funciona comecando com false

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated()
  }

}
