import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;

  constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) {

   }

  ngOnInit() {

    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],

      callbacks: {
        signInSuccessWithAuthResult: this
        .onLoginSuccessfull
        .bind(this)
      }

      

    };
    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    this.ui.start('#firebaseui-auth-container',uiConfig);

  }
  onLoginSuccessfull(result) {
    //console.log("Firebase successfull", result);
    this.ngZone.run(() => this.router.navigateByUrl('/courses'));
    
  }
  ngOnDestroy() {
    this.ui.delete();
  }

}
