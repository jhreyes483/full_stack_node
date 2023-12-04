import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent {
  public page_title : string;
  public user       : User;
  public status     : string;
  public identity   : any;
  public token      : any;

  constructor(
    private _userService : UserService,
    private _route       : ActivatedRoute,
    private _router      : Router,
  ){
    this.page_title = 'Identificate'
    this.user       = new User ('', '', '', '','','','ROLE_USER');
    this.status     = '';
  }

  onSubmit(form : any){
    console.log(this.user)
    this._userService.signup(this.user).subscribe(
      response =>{
        if(response.user && response.user._id){
            this.identity = response.user;
            this.token    = response.token;


            if(this.token){
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity',JSON.stringify(this.identity));
              console.log('Login_correcto')
            }
            if(localStorage.getItem('token')){
              this._router.navigate(['inicio']);
            }

        }else{
          this.status = 'error';
        }

        console.log(response,'response')
      },
      error =>{

          this.status = 'error';
          console.log(error)

      }
    )
  }


}
