import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteDetalhePage } from './cliente-detalhe';

@NgModule({
  declarations: [
    ClienteDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteDetalhePage),
  ],
})
export class ClienteDetalhePageModule {}
