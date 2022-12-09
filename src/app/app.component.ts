import { Component } from '@angular/core';
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angtweets';

  constructor(private auth: AuthService){
    // this.isLogin()
  }

//   isLogin(){
//     if(localStorage.getItem("oauth_token")) {
//       console.log('yes i have it!')
//     } else {window.location.href='http://localhost:4200/signin'}
//   }
}
