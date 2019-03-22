import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

@IonicPage()
@Component({
  selector: 'page-novo-cliente',
  templateUrl: 'novo-cliente.html',
})
export class NovoClientePage {

  firestore = firebase.firestore();
  formGroup : FormGroup;
  uid : string;

  loader = this.loadingCtrl.create({
    content: "Aguarde...",
    duration: 3000
  });

  toast(text : string){
    let toast = this.toastCtrl.create({
      message: 'Cliente cadastrado com sucesso',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public firebaseauth : AngularFireAuth, 
    public storage : AngularFireStorage,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
      this.form();
  }

  form(){
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      telefone: ['', [Validators.required]]
    });
  }

  add() {
        this.loader.present(); // <----- Exibe o loading
        this.firestore.collection("cliente").add(this.formGroup.value) // tenta cadastrar
          .then(ref => { // Cadastro sucesso
            this.loader.dismiss(); // <----- Retira o loading
            this.toast('Cadastrado com sucesso');// <----- Exibe mensagem
            
        }).catch(err => { // Cadastro com erro
          this.loader.dismiss();// <----- Retira o loading
          this.toast(err.message); // <----- Exibe mensagem
        });
  }



}
