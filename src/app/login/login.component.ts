import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService, User } from '../../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public user = new User('', '');
  public errorMsg = '';

  constructor(
    private _service: AuthenticationService
  ) { }

  login() {
    if (!this._service.login(this.user)) {
      console.log('+++ USER LOGGATO ', this.user);
      this.errorMsg = 'Login fallito!';
      console.log('LOGIN ERROR MAESSAGE ', this.errorMsg);
    }
  }

  ngOnInit() {
  }

}
