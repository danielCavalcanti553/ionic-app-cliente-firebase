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
  
  firestore = firebase.firestore();
  uid : string;
  dados : Dados = new Dados();
  imagem : any; // Recebe a imagem do formulário

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseauth : AngularFireAuth, 
    public storage : AngularFireStorage) { 
  
    this.uid = this.firebaseauth.auth.currentUser.uid 

  }

  ionViewDidLoad() {
    // Referência para a coleção dados
    var docRef = this.firestore.collection("dados").doc(this.uid);
    
    docRef.get().then(doc=> { // Solicita o documento

      if (doc.exists) { // verifica se existe o documento
        this.dados.setDados(doc.data()); // Se existir, pega os dados
      }else{
        // Se não existir ele cria, este código será modificado
        this.firestore.collection("dados").doc(this.uid).set(
          {'nome' : 'Daniel', 'telefone':'2185474'}

        ).then(ref => {
          // Utiliza o mesmo dado acima, este código será modificado
          this.dados.setDados({'nome' : 'Daniel', 'telefone':'2185474'});
        });
      }
    })

    this.downloadFoto();// Foto carrega ao abrir a página

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

  // Recupera foto de perfil do servidor
  downloadFoto(){
  
    let ref = 'usuario/'+this.uid+'.jpg'; // Pasta do servidor
    let gsReference = firebase.storage().ref().child(ref); // Referência do arquivo no servidor
  
    gsReference.getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
      this.dados.foto = url; // foto baixada com sucesso
    }).catch(()=>{ // foto não existe, pega foto padrão
      this.dados.foto = "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
    })

  }
}
