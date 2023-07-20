import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  userData: usersData[];
  fname: string;
  email: string;
  password: string;
  editMode: boolean = false;
  editId: number = 0;
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(public database: DatabaseService) {
    this.database.createDatabase().then(() =>{
      this.getDatas();
    });
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
        this.getDatas();
      });
    } 
  }

  getDatas()
  {
    this.userData=[]
    this.database.getUAcc()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.userData.push(result.rows.item(i));
        }
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

}

class usersData
{
  fullname: string;
  email: string;
  password: string;
}
