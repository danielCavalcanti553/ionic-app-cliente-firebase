import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-cliente-detalhe',
  templateUrl: 'cliente-detalhe.html',
})
export class ClienteDetalhePage {

  formGroup : FormGroup;
  cliente : Cliente;
  firestore = firebase.firestore();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder) {
      this.cliente = this.navParams.get('cliente');
      this.form();
  }

  form(){
    this.formGroup = this.formBuilder.group({
      nome: [this.cliente.nome, [Validators.required]],
      email: [this.cliente.email, [Validators.required]],
      endereco: [this.cliente.endereco, [Validators.required]],
      bairro: [this.cliente.bairro, [Validators.required]],
      cidade: [this.cliente.cidade, [Validators.required]],
      cep: [this.cliente.cep, [Validators.required]],
      telefone: [this.cliente.telefone, [Validators.required]]
    });
  }

  atualizar(){
    this.firestore.collection("cliente").doc(this.cliente.id)
      .update(this.formGroup.value).then(()=> {
        this.navCtrl.setRoot('HomePage');
      })
      .catch(function(error) {
          console.error("Error: ", error);
      });
  }


}
