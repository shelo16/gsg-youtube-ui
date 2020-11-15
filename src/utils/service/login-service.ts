import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint: string = '/auth';
  endpointDictionary: string = '/dictionary';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');


  constructor(private apiService: ApiService) {
  }


  public authenticate(authUser) {
    return this.apiService.postWithCredentials(`${this.endpoint}/authenticate`, authUser, this.headers);
  }

  public resetUserData(authUserData) {
    return this.apiService.postWithCredentials(`${this.endpoint}/reset`, authUserData, this.headers);
  }

  public getUserDataForReset() {
    return this.apiService.getWithCredentials(`${this.endpoint}/resetUserData`);
  }

  public getCountryDropDown() {
    return this.apiService.getWithoutCredentials(`${this.endpointDictionary}/country-drop-down`);
  }

  public checkIfAuthenticated() {
    return this.apiService.getWithCredentials(`${this.endpoint}/checkAuth`);
  }

  public logout() {
    return this.apiService.getWithCredentials(`${this.endpoint}/stop`);
  }

}
