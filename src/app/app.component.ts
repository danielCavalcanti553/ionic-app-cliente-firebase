import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage'; // Ionic Page

  pages: Array<{title: string, component: string}>; // Ionic Page

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public firebaseauth : AngularFireAuth) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [ // Ionic Page
      { title: 'Home', component:'HomePage' },
      { title: 'Novo Cliente', component: 'NovoClientePage' },
      { title: 'Logoff', component: 'LogoffPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.firebaseauth.authState
    .subscribe(
    user => {
        if (user) {
          this.rootPage = 'HomePage';
        } else {
          this.rootPage = 'LoginPage';
        }
      },
      () => {
        this.rootPage = 'HomePage';
      }
      );
}
  
  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
