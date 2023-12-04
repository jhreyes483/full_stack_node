import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
  providers: [UserService]
})
export class UserEditComponent {
  public page_title  : string;
  public status      : string;
  public user        : User;
  public identity    : any;
  
  constructor(
    private _userService : UserService,
    private _route       : ActivatedRoute,
    private _router      : Router,

  ){
    this.page_title = 'Actualizar mi perfil'
    this.status     = ''
    this.identity   = this._userService.getIdentity()
    this.user       = new User (
      this.identity._id, 
      this.identity.name, 
      this.identity.surname, 
      this.identity.email,
      '',
      this.identity.image,
      this.identity.role
      );
  }

  onSubmit(form :any){
    
  }

  /*
        public _id: any,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public image: string,
        public role: string
  */

}
