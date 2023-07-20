import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-userview',
  templateUrl: './userview.page.html',
  styleUrls: ['./userview.page.scss'],
})
export class UserviewPage implements OnInit {
  selectTabs = 'ogw'
  showPassword = false;
  passwordToggleIcon = 'eye';
  enter: number;
  billdata: any[];
  editMode: boolean = false;
  editId: number = 0;


  constructor(public menuCtrl: MenuController, public database: DatabaseService) {

   }

   ionViewWillEnter()
   {
     this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

  togglePassword()
  {
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == 'eye')
    {
      this.passwordToggleIcon = 'eye-off';
    }
    else
    {
      this.passwordToggleIcon = 'eye'
    }
  }

  viewBill()
  {
    this.billdata=[];
    this.database.getBillingUser(this.enter)
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.billdata.push(result.rows.item(i));
          alert('Success!');
        }
      }
      else
      {
        alert('No Water Bill Record Found!');
      }
    });    
  }
}
