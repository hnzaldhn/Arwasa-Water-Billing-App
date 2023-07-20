import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  selectTabs = 'ogw'
  selector: string;
  clientData: any[];
  billdata: any[]
  enter: number;
  constructor(public database: DatabaseService)
  {
    this.database.createDatabase().then(() => {
      this.onGet();
    });
  }

  ngOnInit() {
  }

  onGet()
  {
    if(this.selector == "Client")
    {
      this.clientData=[]
      this.database.searchC(this.enter)
      .then((result) => {
        if (result.rows.length > 0) {
          for (var i = 0; i < result.rows.length; i++) {
            this.clientData.push(result.rows.item(i));
            alert('Client Retrieved Successfully!');
          }
        }
        else
        {
          alert('No Client Found!')
        }
      });
    }
    if(this.selector == "Ongoing")
    {
      this.billdata=[]
      this.database.searchOG(this.enter)
      .then((result) => {
        if (result.rows.length > 0) {
          for (var i = 0; i < result.rows.length; i++) {
            this.billdata.push(result.rows.item(i));
            alert('Ongoing Bills Retrieved Successfully!');
          }
        }
        else
        {
          alert('No Client Found!')
        }
      });    
    }
  }

}
