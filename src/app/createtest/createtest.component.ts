import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../model/model.component';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { registerLocaleData } from '@angular/common';


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

  Month()
{
  const date=new Date();
  const month=date.getMonth()+1;
  var newMonth;
  if(month==1)newMonth=12;
  else newMonth=month;
  return newMonth;
}
Day()
{
  const date=new Date();
  const day=date.getDay()+5;
  return day;
}
deleteFromDataBase()
{
  
  
  const month=this.Month();
  const day=this.Day();
  const refCollection= this.db.collection('Tests').ref;
  refCollection
  .where('month','==',month)
  .where('day','==',day)
  .get()
  .then(
    reg=>reg.forEach(
      i=>{
        this.verifyUserHasAccount(i.data().email);
       // this.db.doc(`Tests/${i.id}`).delete();
      }
    )
  )

}

verifyUserHasAccount(email:string)
{
  const refCollection= this.db.collection('Users').ref;
  refCollection
  .get()
  .then
  {
    reg=>reg.forEach(
    i=>
    {
      console.log(i.data().email);
      // if(i.data().email===email)console.log("good");
      // else console.log("bad");
          
    }
    )
  }
}

  storeToDataBase(email:string)
{
  
 const month=new Date().getMonth()+1;
 const day=new Date().getDay()+5;
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
  "month":month,
  "day":day,

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
