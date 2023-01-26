import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user_name: string = '';
  password: string = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.user_name, this.password).subscribe(res => {
      if(res.token) {
        console.log('lol')
        this.router.navigate(['']);
      } else {
        this.error = res.message
      }
    })
  }
}
