import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private getUrl = '/api/getusers';
  private postUrl = '/api/postuser';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.postUrl, user);
  }
}
