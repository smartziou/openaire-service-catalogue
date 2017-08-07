/**
 * Created by stefania on 8/1/17.
 */

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from "../../../domain/user";
import { UserService } from "../../../services/user.service";

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls:  ['./sign-up.component.css']
})

export class SignUpComponent {

    private signUpForm: FormGroup;
    private user: User;
    private errorMessage: string = null;
    private successMessage: string = null;
    private submitted = false;

    constructor(fb: FormBuilder, private userService: UserService) {
        // this.registrationForm = fb.group({
        //     "name": ["", Validators.required],
        //     "surname": ["", Validators.required],
        //     "username": ["", Validators.required],
        //     "email": ["", Validators.required],
        //     'passwords': fb.group({
        //         password: ['', Validators.required],
        //         confirmPassword: ['', Validators.required]
        //     }, {validator: this.areEqual}),
        //     "affiliation": [""],
        // });
        this.signUpForm = fb.group({
            "name": ["", Validators.required],
            "surname": ["", Validators.required],
            "username": ["", Validators.required],
            "email": ["", Validators.required],
            'password': ['', Validators.required],
            'confirmPassword': ['', Validators.required],
            "affiliation": [""],
            "providerAdministrator": [false],
            "provider": [""],
        });
    }

    onSubmit(myUser: User, isValid: boolean) {

        //TODO: check if model is valid
        console.log(myUser, isValid);

        if(isValid) {
            this.userService.registerUser(myUser).subscribe(
                user => this.registerUser(user),
                error => this.errorMessage = <any>error);
        } else {
            this.errorMessage = 'Form not valid';
        }
    }

    registerUser(user: User) {
        this.user = user;
        this.submitted = true;
        console.log('registered User', this.user);
    }

    // areEqual(group: FormGroup) {
    //     let val;
    //     let valid = true;
    //
    //     for (name in group.controls) {
    //         if (val === undefined) {
    //             val = group.controls[name].value
    //         } else {
    //             if (val !== group.controls[name].value) {
    //                 valid = false;
    //                 break;
    //             }
    //         }
    //     }
    //
    //     if (valid) {
    //         return null;
    //     }
    //
    //     return {
    //         areEqual: true
    //     };
    // }
    //
    // matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    //     return (group: FormGroup): {[key: string]: any} => {
    //         let password = group.controls[passwordKey];
    //         let confirmPassword = group.controls[confirmPasswordKey];
    //
    //         if (password.value !== confirmPassword.value) {
    //             return {
    //                 mismatchedPasswords: true
    //             };
    //         }
    //     }
    // }
}