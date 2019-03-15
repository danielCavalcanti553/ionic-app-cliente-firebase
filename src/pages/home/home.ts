import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Post } from '../../model/post';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {
  
  firestore = firebase.firestore();
  formGroup : FormGroup;
  uid : string;
  posts : Post[] = [];
  
  constructor(public navCtrl: NavController, 
    public menuCtrl : MenuController, 
    public firebaseauth : AngularFireAuth, 
    public storage : AngularFireStorage,
    public formBuilder: FormBuilder
    ) {

      this.firebaseauth.authState.subscribe( user => {
        if (user) { this.uid = user.uid }
      });
      this.menuCtrl.enable(true);
      this.form();
      
  }

  ionViewDidLoad(){
    this.getList();
    
  }

  form(){
    this.formGroup = this.formBuilder.group({    
      uid : ['', [Validators.required]],
      nome: ['', [Validators.required]],
      mensagem: ['', [Validators.required]]
    });
  }

  // listar os posts
  getList(){

    var postRef = firebase.firestore().collection("post");

    postRef.get().then(query => {
      query.forEach(doc => {
        let p = new Post();
        p.setDados(doc.data());
        this.posts.push(p);
      });
      
    });
    
  }

  // Cadastrar
  add(){

    // será modificado
    this.formGroup.controls['uid'].setValue(this.uid);
    this.formGroup.controls['nome'].setValue('Daniel');
    
      // Tenta cadastrar a mensagem
      this.firestore.collection("post").add(this.formGroup.value)
        .then(ref => {
        // Sucesso
        this.posts = [];
        this.getList();
        

      }).catch(err => {
        console.log(err.message);
      });
  }
  
  
  
  
  
  downloadFoto(uid : string) : any{
  
    let ref = 'usuario/'+'z1bnrOyow9YmjzN7iYI3s6DM7Iq2'+'.jpg'; // Pasta do servidor
    let gsReference = firebase.storage().ref().child(ref); // Referência do arquivo no servidor
  
    gsReference.getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
      return url; // foto baixada com sucesso
    }).catch(()=>{ // foto não existe, pega foto padrão
      return "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
    })

  }


}
