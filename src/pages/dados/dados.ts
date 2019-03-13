import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';//<- add
import firebase from 'firebase';//<- add
import { Dados } from '../../model/dados';//<- add
import { AngularFireStorage } from 'angularfire2/storage';//<- add

@IonicPage()
@Component({
  selector: 'page-dados',
  templateUrl: 'dados.html',
})
export class DadosPage {
  
  firestore = firebase.firestore();//<- add
  uid : string; //<- add
  dados : Dados = new Dados(); //<- add
  imagem : any; // Recebe a imagem do formulário

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseauth : AngularFireAuth, //<- add
    public storage : AngularFireStorage) { //<- add
  
    this.uid = this.firebaseauth.auth.currentUser.uid //<- add

  }

  ionViewDidLoad() {
    
  }

  enviaArquivo(event){
    // Pega o arquivo do formulário
    this.imagem = event.srcElement.files[0];
    this.upload(); // 
  }

  // Enviar o arquivo para o servidor
  upload(){
    // Diretório + caminho imagem no servidor
    let ref = firebase.storage().ref().child(`usuario/${this.uid}.jpg`);
    // Executa o upload
    ref.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
      ref.getDownloadURL().then(url=>{
        //console.log(url); //Url para download    
        this.dados.foto = url;
    }).catch(err => {
      console.log(err); //Houve algum erro
    })
  })
  }

}
