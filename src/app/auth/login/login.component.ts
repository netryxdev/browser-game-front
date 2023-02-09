import { CheckboxControlValueAccessor, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.username, this.password).subscribe(res => {
      if(res.token) {
        console.log('lol')
        this.router.navigate(['']);
      } else {
        this.errorMessage = this.authService.errorMessage;
      }
    })
  }
}
