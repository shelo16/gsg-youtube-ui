import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthDataService {


  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>(null);
  private jobTriggerSubject = new BehaviorSubject<number>(5);

  public loggedIn$ = this.loggedInSubject.asObservable();
  public username$ = this.usernameSubject.asObservable();
  public jobTrigger$ = this.jobTriggerSubject.asObservable();

  constructor() {
  }

  setAuthInfo(username, jobTriggerTime) {
    if (username != null) {
      this.usernameSubject.next(username);
      this.loggedInSubject.next(true);
      this.jobTriggerSubject.next(jobTriggerTime);
    }
  }

  setLogOutInfo() {
    this.usernameSubject.next(null);
    this.loggedInSubject.next(false);
  }
}
