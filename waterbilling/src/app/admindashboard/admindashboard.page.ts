import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.page.html',
  styleUrls: ['./admindashboard.page.scss'],
})
export class AdmindashboardPage implements OnInit {
  connectData: any[];
  cclientsData: any[];
  ogData: any[];
  dcData: any[];

  constructor(public database: DatabaseService, public menuCtrl: MenuController) {
    this.database.createDatabase().then(()=>{
      this.getConnected();
      this.getCClients();
      this.getDisconnected();
      this.getOg();
    });
   }

  ionViewWillEnter() 
  {
  this.menuCtrl.enable(true);
  }
  ionViewWillLeave() 
  {
  this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

  getConnected()
  {
    this.dcData=[]
    this.database.getDisconnected()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.dcData.push(result.rows.item(i));
        }
      }
    });
  }

  getDisconnected()
  {
    this.connectData=[]
    this.database.getConnected()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.connectData.push(result.rows.item(i));
        }
      }
    });
  }

  getCClients()
  {
    this.cclientsData=[]
    this.database.getCClients()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.cclientsData.push(result.rows.item(i));
        }
      }
    });
  }

  getOg()
  {
    this.ogData=[]
    this.database.getOg()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.ogData.push(result.rows.item(i));
        }
      }
    });
  }

}
