import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Cliente } from '../../model/cliente';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {
  
  firestore = firebase.firestore();
  uid : string;
  clientes : Cliente[] = [];

  
  constructor(public navCtrl: NavController, 
    public menuCtrl : MenuController, 
    public firebaseauth : AngularFireAuth, 
    public storage : AngularFireStorage
    ) {

      this.firebaseauth.authState.subscribe( user => {
        if (user) { this.uid = user.uid }
      });
      this.menuCtrl.enable(true);
      
      
  }

  ionViewDidLoad(){
    this.getList(); // Inicia a lista ao carregar a página
  }

  getList(){ // Retorna a lista de clientes
    firebase.firestore().collection("cliente").get().then(query => { // Retorna coleção cliente
      query.forEach(doc => { // Comando de repetição 
        let c = new Cliente(); // A cada repetição, cria um objeto
        c.id = doc.id; // Pega o ID do documento
        c.setDados(doc.data()); // adiciona os dados do firebase no objeto
        this.clientes.push(c); // adiciona na lista de clientes
      });
    });
  }

  editar(c : Cliente){
    this.navCtrl.push('ClienteDetalhePage',{'cliente' : c});
  }
}
