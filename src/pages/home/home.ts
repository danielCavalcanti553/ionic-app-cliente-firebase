import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, ToastController, LoadingController, AlertController } from 'ionic-angular';
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

  loader = this.loadingCtrl.create({
    content: "Aguarde...",
    duration: 3000
  });

  toast(text : string){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  constructor(public navCtrl: NavController, 
    public menuCtrl : MenuController, 
    public firebaseauth : AngularFireAuth, 
    public storage : AngularFireStorage,
    public toastCtrl : ToastController, // mensagem
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController // loading - carregamento
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
        
        firebase.storage().ref().child('usuario/'+c.id+'.jpg') // Referência do arquivo no servidor
        .getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
          c.foto = url; // foto baixada com sucesso
        }).catch(()=>{ // foto não existe, pega foto padrão
          c.foto = "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
        })        
        
        this.clientes.push(c); // adiciona na lista de clientes
      });
     
    });
  }

  editar(c : Cliente){
    this.navCtrl.push('ClienteDetalhePage',{'cliente' : c});
  }



   excluir(c : Cliente){
    const confirm = this.alertCtrl.create({
      title: 'Mensagem', // Título Caixa 
      message: 'Deseja Excluir?', // Mensagem
      buttons: [
        {
          text: 'Cancelar', // Nome do botão
          handler: () => {
            // Código Cancelar, não executa nada
          }
        },
        {
          text: 'Confirmar', // Nome do botão
          handler: () => {
            // Código Confirmar excluir
            this.loader.present(); // inicia o loading

            this.firestore.collection('cliente').doc(c.id).delete().then(()=> { 
              this.loader.dismiss(); // encerra o carregamento
              this.navCtrl.setRoot('HomePage')
              this.toast('Excluído com sucesso'); // exibe mensagem no tost
            }).catch(function(error) {
              this.loader.dismiss(); // encerra o carregamento
              this.toast('Erro ao excluir!'); // exibe mensagem no tost
             });
            // Fim código confirmar
          }
        }
      ]
    });
    confirm.present();
  }

  downloadFoto(uid : string) : any{
    
    let ref = 'usuario/'+uid+'.jpg'; // Pasta do servidor
    let gsReference = firebase.storage().ref().child(ref); // Referência do arquivo no servidor
  
    gsReference.getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
      return url; // foto baixada com sucesso
    }).catch(()=>{ // foto não existe, pega foto padrão
      return "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
    })

  }
}

