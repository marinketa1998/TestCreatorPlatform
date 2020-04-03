import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ModelComponent } from '../model/model.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Component({
  selector: 'app-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.css']
})
export class CreatetestComponent implements OnInit {

  authError: any;
  model=new ModelComponent();
  arrayOfQuestion=new Array<ModelComponent>();


  constructor(
    private db: AngularFirestore,

  ) { }

  ngOnInit() {
    this.model=new ModelComponent();
    this.arrayOfQuestion.push(this.model);
  }

  storeToDataBase(email)
  {
    //this.Code=this.generateCode();
    this.onSubmit(email);
    const myArray=
    {
      "Questions":this.arrayOfQuestion.map((object=>{return Object.assign({}, object)}))
    }
    const obj =
  {
    "email":email,
    "array":myArray,
  }
    this.db.collection('Tests').add(obj);
  }

  addQuestion()
  {
  
    this.model=new ModelComponent();
    this.arrayOfQuestion.push(this.model);

  }

  generateCode()
  {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  onSubmit(email:string) {

 
    var code=this.generateCode();
    const message="Your uniq code for the test you habe just created is:"+code;
    const name="noreply@testcreatordatabase.firebaseapp.com";
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    
    let formRequest = {email,code};
    this.db.collection('Codes').add(formRequest);
  }



}
