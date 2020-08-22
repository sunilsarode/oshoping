
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {
  }

  login() {

    this.authService.login();
    //does not work
    //this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());


  }
}
