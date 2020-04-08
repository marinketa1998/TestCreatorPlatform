import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../model/model.component';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


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

  storeToDataBase(email:string)
{
  const code=this.generateCode();
  const myArray=
  {
    "Questions":this.arrayOfQuestion.map((object=>{return Object.assign({}, object)}))
  }
  const obj =
{
  "email":email,
  "array":myArray,
  "code":code,
}
  const Code=
  {
    "code":code,
  }
  this.db.collection('Tests').add(obj);
  this.db.collection('Codes').add(Code);
  
}

generateCode()
{
  return '_' + Math.random().toString(36).substr(2, 9);
}

addQuestion()
{
  this.model=new ModelComponent();
  this.arrayOfQuestion.push(this.model);
  
}

}
