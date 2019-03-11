import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase'; // Passo 1: importar

@IonicPage()
@Component({
  selector: 'page-l ivros',
  templateUrl: 'livros.html',
})
export class LivrosPage {

  // Passo 2: configuração firestone
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firestore.settings(this.settings);// Passo 3 : Aplicar
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LivrosPage');
    this.listaLivro();
  }

  listaLivro(){
    var ref = firebase.firestore().collection("livro");

    ref.get().then(query => {

      query.forEach(doc => {
        console.log(doc.data());
      });

    });

  }

}
