import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit{
  
  authError: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  createUser(frm) {
    
    this.auth.createUser(frm.value);
  }

 
}
