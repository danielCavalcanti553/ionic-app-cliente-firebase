import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Livro } from '../../model/livro';

@IonicPage()
@Component({
  selector: 'page-livro-detalhes',
  templateUrl: 'livro-detalhes.html',
})
export class LivroDetalhesPage {

  // Variável para os dados do livro
  livro : Livro;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // recebe o parâmetro livro -> { 'livro' : 'obj'}
    this.livro = this.navParams.get('livro');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LivroDetalhesPage');
  }

}
