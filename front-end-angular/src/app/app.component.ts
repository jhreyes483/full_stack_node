import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title     = 'FORO EN ANGULAR';
  public identity : any;
  public token    : any;

  constructor(
    private _userService : UserService
  ){
    this.identity = this._userService.getIdentity()
    this.token    = this._userService.getToken()
  }

  ngOnInit(): void {
    console.log(this.identity, 'identity a')
    console.log(this.token,'token a')
  }
}
