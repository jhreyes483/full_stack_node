import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../../../models/topic';
import { UserService } from '../../../../services/user/user.service';
import { TopicService } from '../../../../services/topic/topic.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit  {
  public page_title : string;
  public topics      : any;
  public identity   : any;
  public token      : any;
  public status     : string;

  constructor(
    private _route        : Router,
    private _routes       : ActivatedRoute,
    private _userService  : UserService,
    private _topicService : TopicService,

  ){
    this.page_title = 'Mis temas'
    this.status     = ''
    this.identity   = this._userService.getIdentity()
    this.token      = this._userService.getToken()
    this.topics     = null;
  }

  ngOnInit(): void {
    this.getTopicsByUser();
    console.log(this.topics,'topics')
  }

  getTopicsByUser(){
    this._topicService.getTopicsByUser(this.identity._id).subscribe(
      response => {
   
        if (response.status == 'success') {
          this.topics = response.topics
        //  this.topics = null
          console.log(this.topics,'ffffa')
          this.status = 'success'
        }
      },
      error => {
        console.log(error,'eee')
        this.status = 'error'
      }
    )
  }

}
