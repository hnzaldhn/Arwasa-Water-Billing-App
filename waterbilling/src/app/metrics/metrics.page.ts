import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
})
export class MetricsPage implements OnInit {
  metcost: number;
  pcost: number;
  metrics: metricData[];
  editMode: boolean = false;
  editId: number = 0;

  constructor(public database: DatabaseService) {
    this.database.createDatabase().then(()=>{
      this.getDatas();
    });
   }

  ngOnInit() {
  }

  onSave()
  {
    if (this.editMode) {
      this.database.updateMetrics(this.metcost,  this.editId )
      .then((data) => {
        this.metcost = null;
        alert(data);
        this.getDatas();
      });
    } 
  }

  getDatas()
  {
    this.metrics=[]
    this.database.getMetrics()
    .then((result) => {
      var i = 0; i < result.rows.length; 
      this.metrics.push(result.rows.item(i));
    });
  }

  editMetrics(metrics: any) {
    this.editMode = true;
    this.metcost = metrics.metcost
    this.editId = metrics.id;
  }


}

class metricData
{
  metcost: number;

}
