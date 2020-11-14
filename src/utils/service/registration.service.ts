import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  endpoint: string = '/reg';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(private apiService: ApiService) {
  }


  public generateRegisterShortLink(gsgUser) {
    return this.apiService.postWithoutCredentials(`${this.endpoint}/register`,gsgUser,this.headers);
  }


}
