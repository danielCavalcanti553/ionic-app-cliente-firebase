import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {


  firestore = firebase.firestore();


  uid:any ;

  constructor(public firebaseauth : AngularFireAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
    
    this.uid = this.firebaseauth.auth.currentUser.uid;
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
