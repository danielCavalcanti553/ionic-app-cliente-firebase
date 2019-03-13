import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Dados } from '../model/dados';
import { AngularFireStorage } from 'angularfire2/storage';

export class DadosPage {
  
  firestore = firebase.firestore();
  uid;
  dados : Dados;
  imagem : any;
  gsReference : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public firebaseauth : AngularFireAuth, public storage : AngularFireStorage) {
  
    this.uid = this.firebaseauth.auth.currentUser.uid

  }

  ionViewDidLoad() {

    var docRef = this.firestore.collection("dados").doc(this.uid);
    console.log(this.uid);
    docRef.get().then(doc=> {

      if (doc.exists) {
        this.dados = new Dados(doc.data());
        this.donwloadFoto();
    } else {
        
      this.firestore.collection("dados").doc(this.uid).set(
          {'nome' : 'Daniel', 'telefone':'2185474', 'foto':''}
        ).then(ref => {
          // Sucesso
          console.log("Cadastrado com sucesso");
        }).catch(err => {
          console.log(err.message);
        });

        docRef.get().then(doc=> {

          if (doc.exists) {
            this.dados = new Dados(doc.data());
          }

          });



    }

    }).catch(function(error) {

     console.log("Error:", error);

    });
  }

  enviaArquivo(event){
    // Pega o arquivo 
    this.imagem = event.srcElement.files[0];
    this.add(this.uid);
  }

  add(id : string){
   
    // Diretório + caminho imagem no servidor
    let caminho = firebase.storage().ref().child(`usuario/${id}.jpg`);
    // Executa o upload
    caminho.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
      caminho.getDownloadURL().then(url=>{

        console.log("imagem enviada");
        this.donwloadFoto();
        
    }).catch(err => {
      //Houve algum erro
      console.log(err)
    })
  })

  }

donwloadFoto(){
  let ref = 'usuario/'+this.uid+'.jpg';
    
  let gsReference = firebase.storage().ref().child(ref);

  gsReference.getDownloadURL().then(url=>{
    this.dados.foto = url;
  });
}
}
