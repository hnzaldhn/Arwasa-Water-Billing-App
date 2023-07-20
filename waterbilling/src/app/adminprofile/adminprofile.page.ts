import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.page.html',
  styleUrls: ['./adminprofile.page.scss'],
})
export class AdminprofilePage implements OnInit {
  adminData: any[];
  fname: string;
  pw: string;
  email: string;
  editMode: boolean = false;
  editId: number = 0;
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(public database: DatabaseService) {
    this.database.createDatabase().then(()=>{
      this.getAdmin();
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
  
  getAdmin()
  {
    this.adminData=[]
    this.database.onLogin()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.adminData.push(result.rows.item(i));
        }
      }
    });
  }

  onAdd()
  {
    this.database.addadministrator(this.fname, this.email, this.pw)
    .then(() => {
      alert('Admin Added')
      this.getAdmin();
      this.fname = "";
      this.email = "";
      this.pw = "";
    });
   }

  deleteAdmin(id: number)
  {
    this.database.deleteadministrator(id)
    .then((data) => {
      alert(data);
      this.getAdmin();
    });
  }

  editAdmin(admin: any)
  {
    this.editMode = true;
    this.fname = admin.fullname;
    this.email = admin.email_add;
    this.pw = admin.pw;
  }
}
