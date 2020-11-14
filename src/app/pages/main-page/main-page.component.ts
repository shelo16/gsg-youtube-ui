import { Component, OnInit } from '@angular/core';
import {AuthDataService} from '../../../utils/service/auth-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    public authDataService: AuthDataService
  ) { }

  ngOnInit(): void {
  }

}
