import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { config } from '../config.services';


@Injectable()
export class UserService{
    headers : any = {}
    url     : string ;
    constructor(private _http: HttpClient){
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.url     = config.base_url;


    }

    prueba(){
        return 'Hola mundo desde el service'
    }

    register(user : any): Observable<any>{
        let params = JSON.stringify(user);
        return this._http.post(this.url+'api/register',params, {headers : this.headers} )
    }
}
