import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddUserComponent } from './add-user.component';
import { UserService } from '../../services/user.service';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation errors and not submit invalid form', () => {
    component.onSubmit();
    expect(component.userForm.invalid).toBeTrue();
  });

  it('should call addUser on valid submit', () => {
    component.userForm.setValue({ name: 'Test', age: 20, city: 'C', state: 'S', pincode: '12345' });
    component.onSubmit();

    const req = httpMock.expectOne('/api/postuser');
    expect(req.request.method).toBe('POST');
    req.flush(component.userForm.value);

    expect(component.successMessage).toBe('User added successfully');
  });
});
