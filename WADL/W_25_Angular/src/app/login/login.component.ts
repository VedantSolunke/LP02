import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginSubmit(username: String, password: String) {
    fetch('http://localhost:3000/users')
      .then((result) => result.json())
      .then((result) => {
        const user: any = result.find((user: any) => {
          return user.username == username && user.password == password;
        });

        if (user) {
          alert('Login Successfully');
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/profile';
        } else {
          alert('User not found');
        }
      })
      .catch((error) => {
        alert('problem occured');
      });

    return false;
  }
}
