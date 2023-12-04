import { Component } from '@angular/core';
import {User} from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:  [UserService]
})
export class RegisterComponent {
  public page_title : string;
  public user       : User;
  public status     : string;

  constructor(
    private _userService : UserService
  ){
    this.page_title = 'Registrate';
    this.user       = new User ('', '', '', '','','','ROLE_USER');
    this.status     = '';
  }

  onSubmit(form : any){
    this._userService.register(this.user).subscribe(
      response =>{
        console.log(response,'response')
        if(response.user &&  response.user._id){
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error =>{
          console.log(error)
      }
    )


    console.log(this._userService.prueba(), 'service');
    console.log(this.user)
  }

}
