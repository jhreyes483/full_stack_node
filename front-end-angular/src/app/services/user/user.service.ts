import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { config } from '../config.services';


@Injectable()
export class UserService{
    headers  : any;
    url      : string ;
    token    : any;
    identity : any;
    constructor(private _http: HttpClient){
        this.url       = config.base_url; 
        this.token     = null;
        this.identity  = null;
       // this.headers   = new HttpHeaders().set('Content-Type', 'application/json');

      this.headers =  this.getToken()  ? {
        'Content-Type': 'application/json',
        'Authorization': this.getToken(),
      } :
      {
        'Content-Type': 'application/json'
      } 
    }

    prueba(){
        return 'Hola mundo desde el service'
    }

    register(user : any): Observable<any>{
        let params = JSON.stringify(user);
        return this._http.post(this.url+'api/register',params, {headers : this.headers} )
    }

    signup(user : any, gettoken : any  = null  ) : Observable<any>{
        if(gettoken != null){
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
        return this._http.post(this.url+'api/login',params, {headers : this.headers} )
    }

    getToken() {
        if (typeof localStorage !== 'undefined') {
          let token = localStorage.getItem('token');
          if (token && token != "undefined" && token != undefined && token != null ) {
            this.token = token;
          } else {
            this.token = null;
          }
        } else {
          console.log('storage not 1')
          this.token = null;
        }
    
        return this.token;
      }
    
      getIdentity() {
        if (typeof localStorage !== 'undefined') {
          let json = localStorage.getItem('identity');
          if (json && json != "undefined" && json != null && json != undefined) {
            this.identity = JSON.parse(json)
          } else {
            this.identity = this.getClearIdentity();
            console.log('storage not 2')
          }
        }
        //console.log(this.identity,'storage_identity')
        return this.identity;
      }
      
      getClearIdentity(){
        return null;
        //return {id:'',name:'',surname:'',email:'', image:'',description:''};
      }


}
