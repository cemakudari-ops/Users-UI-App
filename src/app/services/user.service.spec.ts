import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [UserService] });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch users', () => {
    const mockUsers: User[] = [{ name: 'Alice', age: 30, city: 'City', state: 'State', pincode: '12345' }];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/getusers');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should post user', () => {
    const newUser: User = { name: 'Bob', age: 25, city: 'C', state: 'S', pincode: '54321' };

    service.addUser(newUser).subscribe(u => {
      expect(u).toEqual(newUser);
    });

    const req = httpMock.expectOne('/api/postuser');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(newUser);
  });
});
