import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupSubmit(
    fullname: String,
    email: String,
    username: String,
    password: String
  ) {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullname,
        email,
        username,
        password,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        alert('Register Successfully');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.log(err);
        alert('problem occured');
      });

    return false;
  }
}
