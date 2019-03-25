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

  firestore = firebase.firestore();
  uid : string; // <--
  imagem : any;// <--
  formGroup : FormGroup;
  cliente : Cliente;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder) {
      this.cliente = this.navParams.get('cliente');
      this.form();
      this.uid = this.cliente.id; // <--
  }

  ionViewDidLoad() { // <--
    this.downloadFoto(); // <--
  } // <--

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
      this.downloadFoto();
  })
  }


  downloadFoto(){
    let ref = 'usuario/'+this.uid+'.jpg'; 
    let gsReference = firebase.storage().ref().child(ref);  
    gsReference.getDownloadURL().then( url=>{ 
      this.cliente.foto = url;  // <--
    }).catch(()=>{ // foto não existe, pega foto padrão
      this.cliente.foto = "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
    })

  }

}
