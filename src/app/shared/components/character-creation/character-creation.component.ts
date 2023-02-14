import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.sass']
})
export class CharacterCreationComponent implements OnInit {

  isLoggedIn: boolean = false; //verificar se funciona comecando com false
  nickName: string = '';
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated()
    if(this.isLoggedIn) {
      this.nickName = this.authService.nickname;
    } else {
      this.nickName = '';
    }
  }

}
