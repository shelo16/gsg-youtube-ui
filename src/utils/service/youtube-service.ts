import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  endpoint: string = '/youtube';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');


  constructor(private apiService: ApiService) {
  }

  public getYoutubeData() {
    return this.apiService.getWithCredentials(`${this.endpoint}`);
  }

}
