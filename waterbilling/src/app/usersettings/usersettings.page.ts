import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.page.html',
  styleUrls: ['./usersettings.page.scss'],
})
export class UsersettingsPage implements OnInit {
  enter: number;
  editMode: boolean = false;
  editId: number = 0;
  fname: string;
  email: string;
  password: string;
  clientData: any[];
  showPassword = false;
  passwordToggleIcon = 'eye'

  constructor(public menuCtrl: MenuController, public database: DatabaseService) {
    this.database.createDatabase();
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

  onView()
  {
    this.clientData=[]
    this.database.getuserDetails(this.enter)
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.clientData.push(result.rows.item(i));
        }
      }
      else
      {
        alert('No Found!');
      }
    });
  }

  editUser(users: any)
   {
    this.editMode = true;
    this.fname = users.fullname;
    this.email = users.email;
    this.password = users.password;
    this.editId = users.id;
  }

  onSave()
  {
    if (this.editMode) {
      this.database.updateUAcc(this.fname,this.email, this.password, this.editId)
      .then((data) => {
        this.fname = "";
        this.email = "";
        this.password = "";
        (this.editMode = false), (this.editId = 0);
        alert(data);
      });
    } 
  }

}
