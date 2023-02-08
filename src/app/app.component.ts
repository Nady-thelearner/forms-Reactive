import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserName = ['nady1', 'nady2'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenName.bind(this),
        ]),
        // username: new FormControl(null, Validators.required),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail
        ),
      }),

      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
    this.signupForm.valueChanges.subscribe((value) => console.log(value));
    this.signupForm.statusChanges.subscribe((status) => console.log(status));

     this.signupForm.setValue({
      'userData' : {
        'username' : 'Nady',
        'email' : 'nady@test.com'
      },
      'gender' : 'male',
      'hobbies' : []
    });

    this.signupForm.patchValue({
      'userData' : {
        'username' : 'Nady',
      }
    });
  }


  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
      return { 'name is forbidden': true };
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
