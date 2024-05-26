import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class PasswordGeneratorComponent {
  passwordLength: number = 8;
  includeNumbers: boolean = false;
  includeSpecialCharacters: boolean = false;
  generatedPassword: string = '';

  constructor(private snackBar: MatSnackBar) {}

  generatePassword() {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (this.includeNumbers) {
      characters += '0123456789';
    }
    if (this.includeSpecialCharacters) {
      characters += '!@#$%^&*()_+[]{}|;:,.<>?';
    }
    this.generatedPassword = Array.from({ length: this.passwordLength }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }

  copyPassword() {
    const el = document.createElement('textarea');
    el.value = this.generatedPassword;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.snackBar.open('Copied!', 'Close', {
      duration: 1500,
      verticalPosition: 'top', // Position at the top
    });
  }
}
