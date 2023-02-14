import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router) { }

  error = '';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
  
      this.authService.register(this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.password).subscribe(res => {
        if(res.success) {
          this.router.navigate(['/home']);
        } else {
          this.error = res.message
        }
      })
    }

}
