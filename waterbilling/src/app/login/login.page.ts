import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../database.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  selacctyp: string;
  adminAccData: adminAccData[];
  userData: usersData[];
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(public database: DatabaseService, public router:Router, public menuCtrl: MenuController) 
  {
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



  onlogin()
  {
    if(this.selacctyp == "admin")
    {
      this.database.onLogin().then((res) => {
        var i = 0; i < res.rows.length;
        if(this.email == res.rows.item(i).email_add && this.password == res.rows.item(i).pw)
        {
          alert('Login Successfully');
          this.router.navigateByUrl('admindashboard');
        }
        else
        {
          alert('Wrong Credentials');
          this.email="";
          this.password="";
        }
      });
    }

    if(this.selacctyp == "user")
    {
      this.database.onloginuacc(this.email, this.password).
      then((res) => {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            if(this.email == res.rows.item(i).email && this.password == res.rows.item(i).password)
            {
              alert('Login Successfully');
              this.router.navigateByUrl('userview');
            } 
          }
        }
        else
        {
          alert('Wrong Credentials');
          this.email="";
          this.password="";
        }
      });
    }  
  }

    
}

class adminAccData
{
  email:string;
  password:string;
}
class usersData
{
  fullname: string;
  email: string;
  password: string;
}

