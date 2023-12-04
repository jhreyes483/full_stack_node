import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title     = 'FORO EN ANGULAR';
  public identity : any;
  public token    : any;
  public url      : any;

  constructor(
    private _userService : UserService,
    private _router      : Router,
    private _route       : ActivatedRoute
  ){
    this.identity = this._userService.getIdentity()
    this.token    = this._userService.getToken()
    this.url      = this._userService.url
  }

  ngOnInit(): void {
    console.log(this.identity, 'identity a')
    console.log(this.token,'token a')
  }

  ngDoCheck(): void {
    this.identity = this._userService.getIdentity()
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.token    = null;
    this._router.navigate(['/incio'])
    
  }
}
