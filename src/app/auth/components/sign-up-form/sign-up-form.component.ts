import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Authenticate } from '@app/auth/models/authentication.model';

@Component({
  selector: 'tja-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent implements OnInit {
  @Input()
  error: string | null;

  @Input()
  set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  @Output()
  submitted = new EventEmitter<Authenticate>();

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    const value: Authenticate = this.loginForm.value;

    if (this.loginForm.valid) {
      this.submitted.emit(value);
    }
  }
}
