import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

interface User {
  id?: number;
  name: string;
  age: number;
  city: string;
  state: string;
  pincode: string;
}

@Component({
  selector: 'app-list-users',
  templateUrl: '../../../add-user.component.html',
  // styles can be added or moved to a separate css file
})
export class ListUsersComponent implements OnInit {
  userForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  loading = false;
  users: User[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]],
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.http
      .get<User[]>('/api/users')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => (this.users = data || []),
        (err) => {
          console.error('Failed to load users', err);
          this.errorMessage = 'Failed to load users.';
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      );
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: User = this.userForm.value;
    this.loading = true;

    this.http
      .post<User>('/api/users', user)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (created) => {
          this.successMessage = 'User added successfully.';
          this.errorMessage = '';
          this.userForm.reset();
          // reset validation state
          Object.keys(this.userForm.controls).forEach((k) => {
            this.userForm.get(k)?.setErrors(null);
          });
          this.fetchUsers();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        (err) => {
          console.error('Failed to add user', err);
          this.errorMessage = 'Failed to add user.';
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      );
  }

  deleteUser(id?: number): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.http.delete(`/api/users/${id}`).subscribe(
      () => {
        this.successMessage = 'User deleted.';
        this.fetchUsers();
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (err) => {
        console.error('Failed to delete user', err);
        this.errorMessage = 'Failed to delete user.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
