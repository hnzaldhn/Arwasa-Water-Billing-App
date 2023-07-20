import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: SQLiteObject;
  tables = {
    adminAcc: "adminAcc",
    clients: "clients",
    userAcc: "userAcc",
    metrics: "metrics",
    bills: "bills",
    bh: "bh",
  };

  constructor(private sqlite: SQLite, ) {}

  async createDatabase() {
    await this.sqlite
      .create({
        name: 'data.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.db = db;
      })
      .catch((e) => {
        alert("error on creating database " + JSON.stringify(e));
      });

    await this.createTables();
    await this.addadmin();
    await this.addMetrics();
  }

  async createTables()
  {
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.adminAcc} (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname VARCHAR(100) NOT NULL, email_add VARCHAR(100) NOT NULL, pw VARCHAR(100) NOT NULL)`,[])
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.clients} (id INTEGER PRIMARY KEY AUTOINCREMENT, accnumber INT, metnumber INT, fullname VARCHAR(100) NOT NULL, contact VARCHAR(100) NOT NULL, address VARCHAR(100) NOT NULL, emailadd VARCHAR(100) NOT NULL, connstats VARCHAR(100) NOT NULL)`,[])
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.bills} (id INTEGER PRIMARY KEY AUTOINCREMENT, accnumber INT, metnumber INT, fullname VARCHAR(100) NOT NULL, monthof VARCHAR(100) NOT NULL, prevread INT, presread INT, duedate VARCHAR(100) NOT NULL, total_amount VARCHAR(100) NOT NULL, paystatus VARCHAR(100) NOT NULL)`,[])
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.bh} (id INTEGER PRIMARY KEY AUTOINCREMENT, accnumber INT, metnumber INT, fullname VARCHAR(100) NOT NULL, monthof VARCHAR(100) NOT NULL, prevread INT, presread INT, duedate VARCHAR(100) NOT NULL, total_amount VARCHAR(100) NOT NULL, paystatus VARCHAR(100) NOT NULL)`,[])
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.userAcc} (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL)`,[])
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.metrics} (id INTEGER PRIMARY KEY AUTOINCREMENT, metcost INT)`,[])
  }

  async addadmin()
  {
    let query: string=`INSERT or IGNORE INTO ${this.tables.adminAcc} (fullname, email_add, pw) VALUES ('Administrator','arwasa_admin@gmail.com','arwasabatangas1960')`;
    this.db.executeSql(query,[])   
  }

  async addadministrator(fname: string, email:string, pw: string)
  {
    let query: string=`INSERT or IGNORE INTO ${this.tables.adminAcc} (fullname, email_add, pw) VALUES ('${fname}','${email}','${pw}')`;
    this.db.executeSql(query,[])   
  }

  async deleteadministrator(id: number)
  {
    return this.db.executeSql(`DELETE FROM ${this.tables.adminAcc} WHERE id = ${id}`, [])
    .then(() => {
      return "Client Deleted";
    })
    .catch((e) => {
      return "ERROR ON DELETING CLIENT" + JSON.stringify(e);
    }); 
  }

  async updateMetrics(metcost: number, id: number)
  {
    return this.db.executeSql(`UPDATE ${this.tables.metrics} SET metcost = '${metcost}' WHERE id= ${id}`,[])  
    .then(() => {
      return "Metrics Updated";
    });
  }
  async onLogin()
  {
    return this.db.executeSql(`SELECT * FROM ${this.tables.adminAcc}`,[])    
  }

  async addClient(accnumber: number, metnumber: number, fname: string, mname: string, lname: string, contact: string, address: string, emailadd: string, connstats: string)
  {
    let query: string = `INSERT OR IGNORE INTO ${this.tables.clients} (accnumber, metnumber, fullname, contact, address, emailadd, connstats) VALUES  ('${accnumber}','${metnumber}', '${fname +' '+mname+ ' '+lname}', '${contact}', '${address}', '${emailadd}', '${connstats}')`;
    this.db.executeSql(query,[]) 
  }

  async deleteClient(id: number)
  {
    return this.db.executeSql(`DELETE FROM ${this.tables.clients} WHERE id = ${id}`, [])
    .then(() => {
      return "Client Deleted";
    })
    .catch((e) => {
      return "Error on Deleting Client" + JSON.stringify(e);
    });
  }

  async deleteUser(id: number)
  {
    return this.db.executeSql(`DELETE FROM ${this.tables.userAcc} WHERE id = ${id}`, [])
  }
  
  async editClient(accnumber: number, metnumber: number, fname: string, mname: string, lname: string, contact: string, address: string, emailadd: string, connstats: string, id: number) {
    return this.db.executeSql(`UPDATE ${this.tables.clients} SET accnumber = ${accnumber}, metnumber = ${metnumber}, fullname = '${fname + ' ' + mname + ' '+lname}', contact = '${contact}', address = '${address}', emailadd = '${emailadd}', connstats = '${connstats}' WHERE id = ${id}`,[])
    .then(() => {
      return "Client Updated";
    })
    .catch((e) => {
      return "Error on Updating Client" + JSON.stringify(e);
    });
  }

  async addbilling(accnumber: number, metnumber: number, fname: string, monthof: string, presread: number, dd: string, total_amount: number, ps: string)
  {
    let query: string = `INSERT OR IGNORE INTO ${this.tables.bills} (accnumber, metnumber, fullname, monthof, prevread, presread, duedate, total_amount, paystatus) VALUES  ('${accnumber}','${metnumber}', '${fname}', '${monthof}', ' ', '${presread}', '${dd}','${total_amount}','${ps}')`;
    this.db.executeSql(query,[])
  }

  async addbillinghistory(accnumber: number, metnumber: number, fname: string, monthof: string, presread: number, dd: string, total_amount: number, ps: string)
  {
    let query: string = `INSERT OR IGNORE INTO ${this.tables.bh} (accnumber, metnumber, fullname, monthof, prevread, presread, duedate, total_amount, paystatus) VALUES  ('${accnumber}','${metnumber}', '${fname}', '${monthof}', ' ', '${presread}', '${dd}','${total_amount}','${ps}')`;
    this.db.executeSql(query,[])
  }

  async deleteBilling(id: number)
  {
    return this.db.executeSql(`DELETE FROM ${this.tables.bills} WHERE accnumber = ${id}`, [])
    .then(() => {
      return "Bill Deleted";
    })
    .catch((e) => {
      return "ERROR ON DELETING BILL" + JSON.stringify(e);
    }); 
  }

  async getbh()
  {
    return this.db.executeSql(`SELECT bh.accnumber, bh.metnumber, bh.fullname, bh.monthof, lag(bh.presread * metrics.metcost) over (partition by bh.accnumber) as prevread, bh.presread * metrics.metcost as presread, presread * metrics.metcost - lag(bh.presread * metrics.metcost) over (partition by bh.accnumber) as totalcons, bh.duedate, bh.paystatus, (presread * metrics.metcost - lag(bh.presread * metrics.metcost) over (partition by bh.accnumber)) * metrics.metcost as total_amount FROM bh, metrics WHERE metrics.id=1`,[])
  }

  async getbhuser(accnumber: number)
  {
    return this.db.executeSql(`SELECT bh.accnumber, bh.metnumber, bh.fullname, bh.monthof, lag(bh.presread * metrics.metcost) over (partition by bh.accnumber) as prevread, bh.presread * metrics.metcost as presread, presread * metrics.metcost - lag(bh.presread * metrics.metcost) over (partition by bh.accnumber) as totalcons, bh.duedate, bh.paystatus, (presread * metrics.metcost - lag(bh.presread * metrics.metcost) over (partition by bh.accnumber)) * metrics.metcost as total_amount FROM bh, metrics WHERE accnumber = '${accnumber}' AND metrics.id=1`,[])
  }

  async getBilling()
  {
    return this.db.executeSql(`SELECT bills.accnumber, bills.metnumber, bills.fullname, bills.monthof, lag(bills.presread * metrics.metcost) over (partition by bills.accnumber) as prevread, bills.presread * metrics.metcost as presread, presread * metrics.metcost - lag(bills.presread * metrics.metcost) over (partition by bills.accnumber) as totalcons, bills.duedate, bills.paystatus, (presread * metrics.metcost - lag(bills.presread * metrics.metcost) over (partition by bills.accnumber)) * metrics.metcost as total_amount FROM bills, metrics WHERE metrics.id=1`,[])
  }

  async getBillingUser(accnumber: number)
  {
    return this.db.executeSql(`SELECT bills.accnumber, bills.metnumber, bills.fullname, bills.monthof, lag(bills.presread * metrics.metcost) over (partition by bills.accnumber) as prevread, bills.presread * metrics.metcost as presread, presread * metrics.metcost - lag(bills.presread * metrics.metcost) over (partition by bills.accnumber) as totalcons, bills.duedate, bills.paystatus, (presread * metrics.metcost - lag(bills.presread * metrics.metcost) over (partition by bills.accnumber)) * metrics.metcost as total_amount FROM bills, metrics WHERE accnumber = '${accnumber}' AND metrics.id=1`,[])
  }

  async getConnected()
  {
    return this.db.executeSql(`SELECT COUNT(*) AS totalconnected FROM ${this.tables.clients} WHERE connstats='Connected'`,[])   
  }

  async getDisconnected()
  {
    return this.db.executeSql(`SELECT COUNT(*) AS totaldc FROM ${this.tables.clients} WHERE connstats='Disconnected'`,[])   
  }

  async getCClients()
  {
    return this.db.executeSql(`SELECT COUNT(*) AS totalclients FROM ${this.tables.clients}`,[])   
  }

  async getOg()
  {
    return this.db.executeSql(`SELECT COUNT(*) AS totalOg FROM ${this.tables.bills}`,[])   
  }

  async getDatas()
  {
    return this.db.executeSql(`SELECT * FROM ${this.tables.clients}`,[])
  }
  async getDatasU(id: number)
  {
    return this.db.executeSql(`SELECT * FROM ${this.tables.clients} WHERE accnumber='${id}'`,[])
  }

  async searchC(accnumber:number)
  {
    return this.db.executeSql(`SELECT * FROM ${this.tables.clients} WHERE accnumber = '${accnumber}'`,[])
  }

  async searchOG(accnumber:number)
  {
    return this.db.executeSql(`SELECT bills.accnumber, bills.metnumber, bills.fullname, bills.monthof, lag(bills.presread * metrics.metcost) over (partition by bills.accnumber) as prevread, bills.presread * metrics.metcost as presread, presread * metrics.metcost - lag(bills.presread * metrics.metcost) over (partition by bills.accnumber) as totalcons, bills.duedate, bills.paystatus, (presread * metrics.metcost - lag(bills.presread * metrics.metcost) over (partition by bills.accnumber)) * metrics.metcost as total_amount FROM bills, metrics WHERE bills.paystatus = 'Pending' AND bills.accnumber='${accnumber}' AND metrics.id=1`,[])   
  }

  async getDetails(accnumber: number)
  {
    return this.db.executeSql(`SELECT * FROM ${this.tables.clients} WHERE connstats='Connected' and accnumber='${accnumber}'`,[])
  }

  async addUAcc(fname: string, mname: string, lname: string, uemail: string, password:string, contact: string)
  {
    let query: string=`INSERT or IGNORE INTO ${this.tables.userAcc} (fullname, email, password) VALUES ('${fname +' '+mname+ ' '+lname}','${uemail}','${password + contact}')`;
    this.db.executeSql(query,[])   
  }

  async updateUAcc(fullname: string, uemail: string, password:string, id: number)
  {
    return this.db.executeSql(`UPDATE ${this.tables.userAcc} SET fullname = '${fullname}', email = '${uemail}', password = '${password}' WHERE id= ${id}`,[])  
    .then(() => {
      return "User Updated";
    })
    .catch((e) => {
      if (e.code === 6) {
        return "User already exist";
      }

      return "Error in Updating User " + JSON.stringify(e);
    }); 
  }
 
  async getUAcc()
  {
    return this.db.executeSql(`SELECT * FROM ${this.tables.userAcc}`,[])
  }
 
  async onloginuacc(uemail: string, password: string)
  {
    return this.db.executeSql(`SELECT * FROM ${this.tables.userAcc} WHERE email='${uemail}' and password='${password}'`,[])
  }

  async addMetrics()
  {
    let query: string=`INSERT or IGNORE INTO ${this.tables.metrics} (metcost) VALUES ('1')`;
    this.db.executeSql(query,[])   
  }

  async getMetrics()
  {
    return this.db.executeSql(`SELECT * FROM ${this.tables.metrics}`,[])
  }

  async getuserView(email: string, password: string)
  {
    return this.db.executeSql(`SELECT bills.accnumber, bills.metnumber, bills.fullname, bills.monthof, bills.prevread, bills.presread, bills.duedate, bills.total_amount, bills.paystatus, userAcc.email, userAcc.fullname, userAcc.password from bills join userAcc USING(fullname) where email = '${email}' AND password='${password}'`,[])
  }

  async getuserDetails(accnumber: number)
  {
    return this.db.executeSql(`SELECT clients.accnumber, clients.metnumber, clients.fullname, clients.contact, clients.address, clients.emailadd, clients.connstats, userAcc.fullname, userAcc.email, userAcc.password from clients join userAcc USING(fullname) where clients.accnumber = '${accnumber}'`,[])   
  }

}
