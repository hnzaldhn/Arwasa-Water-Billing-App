import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
  selectTabs='ogw';
  billdata: billData[];
  billhisdata: billhisData[];
  dData: detailsData[];
  enter: number;
  fname: string;
  metnumber: number;
  accnumber: number;
  monthof: string;
  private dateValue: any;
  paystatus: string;
  meterconsumption: number;
  editMode: boolean = false;
  editId: number = 0;

  constructor(public database: DatabaseService) {
    this.database.createDatabase().then(() =>{
      this.getDatas();
      this.getDatashistory()
    });
   }

   get date(): any {
    return this.dateValue;
  }
  set date(value: any) {
    this.dateValue = value;
  }

  ngOnInit() {
  }

  saveclient()
  {
    if(this.paystatus == "Pending")
    {
      const dateFromIonDatetime = this.date;
      const formattedString = format(parseISO(dateFromIonDatetime), 'MMM d, yyyy');
      this.database.addbilling(this.accnumber, this.metnumber, this.fname, this.monthof, this.meterconsumption,formattedString,this.meterconsumption,this.paystatus)
      .then(() => {
        alert('Bill Saved')
        this.getDatas();
        this.enter = null;
        this.fname = "";
        this.accnumber = null;
        this.metnumber = null;
        this.monthof = "";
        this.meterconsumption = null;
        this.paystatus = "";
      });
    }
    else
    {
      const dateFromIonDatetime = new Date().toISOString();
      const formattedString = format(parseISO(dateFromIonDatetime), 'MMM d, yyyy');
      this.database.addbillinghistory(this.accnumber, this.metnumber, this.fname, this.monthof, this.meterconsumption,formattedString,this.meterconsumption,this.paystatus)
      .then(() => {
        alert('Bill Saved')
        this.getDatashistory();
        this.enter = null;
        this.fname = "";
        this.accnumber = null;
        this.metnumber = null;
        this.monthof = "";
        this.meterconsumption = null;
        this.paystatus = "";
      });    
    }
  }
  onget()
  {
    this.dData=[];
    this.database.getDetails(this.enter)
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.dData.push(result.rows.item(i));
          alert('Please Enter Water Bill Consumption for ' + result.rows.item(i).fullname);
        }
      }
      else
      {
        alert('No Client Found');
      }
    });   
  }

  getDatas()
  {
    this.billdata=[]
    this.database.getBilling()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.billdata.push(result.rows.item(i));
        }
      }
    });
  }

  getDatashistory()
  {
    this.billhisdata=[]
    this.database.getbh()
    .then((result) => {
      if (result.rows.length > 0) {
        for (var i = 0; i < result.rows.length; i++) {
          this.billhisdata.push(result.rows.item(i));
        }
      }
    });
  }


  deleteBilling(id: number)
  {
    this.database.deleteBilling(id)
    .then((data) => {
      alert(data);
      this.getDatas();
    });
  }

}

class billData
{

}

class billhisData
{

}

class detailsData
{

}



