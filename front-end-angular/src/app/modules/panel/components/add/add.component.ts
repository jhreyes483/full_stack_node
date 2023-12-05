import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../../../models/topic';
import { UserService } from '../../../../services/user/user.service';
import { TopicService } from '../../../../services/topic/topic.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [UserService, TopicService]
})
export class AddComponent {
  public page_title : string;
  public topic      : Topic;
  public identity   : any;
  public token      : any;
  public status     : string;

  constructor(
    private _route        : Router,
    private _routes       : ActivatedRoute,
    private _userService  : UserService,
    private _topicService : TopicService
  ){
    this.page_title = 'Crear nuevo tema'
  
    this.status     = ''
    this.identity   = this._userService.getIdentity()
    this.topic      = new Topic('','','','','','',this.identity._id,'')
    this.token      = this._userService.getToken()
  }

  onSubmit(form : any){
      this._topicService.addTopic(this.topic).subscribe(
        response => {
          console.log(response,'ppp')
          if (response.status == 'success') {
            this.status = 'success'
            this._route.navigate(['/panel']);
          }
        },
        error => {
          console.log(error,'eee')
          this.status = 'error'
        }
      )

  }

}
