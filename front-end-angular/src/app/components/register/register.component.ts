import { Component } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public page_title : string;
  public user       : User;

  constructor(){
    this.page_title = 'Registrate';
    this.user       = new User ('', '', '', '','','','ROLE_USER');
  }

  onSubmit(form : any){
    console.log(this.user)
  }

}
