import {Component, OnDestroy, OnInit} from '@angular/core';
import {YoutubeService} from '../../../utils/service/youtube-service';
import {YoutubeLink} from '../../../utils/interfaces';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {SnackbarService} from '../../../utils/service/snackbar.service';
import {AuthDataService} from '../../../utils/service/auth-data.service';

@Component({
  selector: 'app-youtube-page',
  templateUrl: './youtube-page.component.html',
  styleUrls: ['./youtube-page.component.css']
})
export class YoutubePageComponent implements OnInit, OnDestroy {
  dataRefresher: any;
  youtubeData: YoutubeLink;
  iframe: SafeHtml = '';
  videoComment: string = '';
  jobtrigger: number = 60000;

  constructor(
    public youtubeService: YoutubeService,
    private sanitizer: DomSanitizer,
    public authDataService: AuthDataService
  ) {
  }

  ngOnInit(): void {
    this.refreshData();
    this.getData();
    this.authDataService.jobTrigger$.subscribe(data => {
      console.log('This data authdataservice : ', data);
      this.jobtrigger = this.jobtrigger * data;
    });
  }

  ngOnDestroy() {
    this.cancelPageRefresh();
  }

  getData() {
    console.log('youtube data ');
    if (this.authDataService.loggedIn$){
      this.youtubeService.getYoutubeData().subscribe(data => {
          console.log('dataaaa ::', data);
          this.videoComment = data.comment;
          this.iframe = this.sanitizer.bypassSecurityTrustHtml(
            '  <iframe width="420" height="315"\n' +
            '          src="' + data.videoLink + '">\n' +
            '  </iframe>'
          );

        },
        err => {
          console.log(err);
        });
    }
  }

  refreshData() {
    this.dataRefresher =
      setInterval(() => {
        this.getData();
      }, this.jobtrigger);
  }

  cancelPageRefresh() {
    if (this.dataRefresher) {
      clearInterval(this.dataRefresher);
    }
  }
}
