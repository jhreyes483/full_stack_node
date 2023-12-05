import { UserService } from "../user/user.service";
import { Injectable } from "@angular/core"; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { config } from '../config.services';

@Injectable()

export class TopicService {
    headers : any;
    url     : string;
    token   : any;
    identity: any;

    constructor(
        private _http: HttpClient,
        private _userService : UserService
        ){
        this.url      = config.base_url;
        this.token    = null;
        this.identity = null;
        this.headers = this._userService.getToken() ? {
            'Content-Type' : 'application/json',
            'Authorization': this._userService.getToken(),
          } :
            {
              'Content-Type': 'application/json'
            }
        }

        prueba(){
            return 'Hola mundo desde topic'
        }

        addTopic(topic : any): Observable<any>{
            let params = JSON.stringify(topic);
            return this._http.post(this.url + 'api/topic', params, { headers: this.headers })
        }





    

}