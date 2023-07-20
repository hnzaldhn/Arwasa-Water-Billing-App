import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  accnumber: number;
  metnumber: number;
  fname: string;
  mname: string;
  lname: string;
  contact: string;
  address: string;
  emailadd: string;
  connstats: string;
  clientData: any[];
  editMode: boolean = false;
  editId: number = 0;
  

  constructor(public database: DatabaseService, public router: Router) {
    this.database.createDatabase().then(()=>{
      this.getDatas();
    });

  }
  ngOnInit() {
  }

  saveclient()
  {
    if(this.editMode)
    {
      this.database.editClient(this.accnumber, this.metnumber, this.fname, this.mname, this.lname, this.contact, this.address, this.emailadd,this.connstats, this.editId)
      .then((data) => {
        this.accnumber = null;
        this.metnumber = null;
        this.editMode = false;
        this.editId = 0;
        this.fname = "";
        this.mname = "";
        this.lname = "";
        this.contact = "";
        this.address = "";
        this.emailadd = "";
        this.connstats = "";
        alert(data);
        this.getDatas();
      });
    }
    else
    {
      this.database.addClient(this.accnumber, this.metnumber, this.fname, this.mname, this.lname, this.contact, this.address, this.emailadd, this.connstats)
      .then(() => {
        alert("Client Added");
        this.getDatas();
        this.accnumber = null;
        this.metnumber = null;
        this.fname = "";
        this.mname = "";
        this.lname = "";
        this.contact = null;
        this.address = "";
        this.emailadd = "";
        this.connstats = "";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Client Already Exists";
        }
        return "error on creating client " + JSON.stringify(e);
      });
      this.database.addUAcc(this.fname, this.mname, this.lname, this.emailadd, this.lname, this.contact.replace(/.(?=.{4})/g, ''))
    }
  }

  getDatas()
  {
    this.clientData=[]
    this.database.getDatas()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.clientData.push(result.rows.item(i));
        }
      }
    });
  }

  editClient(clients: any)
  {
    this.editMode = true;
    this.accnumber = clients.accnumber;
    this.metnumber = clients.metnumber;
    this.contact = clients.contact;
    this.address = clients.address;
    this.emailadd = clients.emailadd;
    this.connstats = clients.connstats;
    this.editId = clients.id;
  }
  deleteClient(id: number)
  {
    this.database.deleteUser(id)
    this.database.deleteClient(id)
    .then((data) => {
      alert(data);
      this.getDatas();
    });
  }

}
