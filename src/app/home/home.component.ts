import { Component, OnInit, ViewChild } from '@angular/core';
import {OrderService}  from "../shared/order.service";
import {OrderComponent} from "../order/order.component"


import {openDB} from "idb/with-async-ittr-cjs";
import {MatTableDataSource}  from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ["OrderId", "OrderDate", "Status", "actions"];
@ViewChild(MatSort) sort_: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
searchKey: string;
  page = 0;
  resultsCount= 10;
  totalPages = 10;

 public data = [];


  bulkEdit = false;
  sortDirection = 0;


  sortKey = null;

  constructor(private orderService: OrderService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();


  }

  // sort
  sortBy(key){
    this.sortKey = key;
    this.sortDirection++;
    this.sort();

  }

  sort(){
   if(this.sortDirection == 1){
      this.data = this.data.sort((a, b)=>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];

        return valA.localeCompare(valB);
      })
   }

   else if (this.sortDirection == 2){
    this.data = this.data.sort((a, b)=>{
      const valA = a[this.sortKey];
      const valB = b[this.sortKey];

      return valB.localeCompare(valA);
    })
   }

   else{
     this.sortDirection = 0;
     this.sortKey = null;
   }
  }

  // form funcs
  toggleBulkEdit(){
    console.log(this.data);
    }

    bulkDelete(){

    };


     sharedata(data){
      this.orderService.setData(data);
    }

// remove row start
  async removeRow(index, row){
    this.data.splice(index, 1);

    const db = await openDB("OrdersDB", 1, {
     upgrade(db) {
       const store = db.createObjectStore('OrderStoreDB', {
         keyPath: "OrderId",
       });

     }
   });

console.log(typeof row.OrderId)


db.delete("OrderStoreDB", row.OrderId)

db.getAllKeys("OrderStoreDB").then((keys) => {
 console.log(keys);


})


 }


// get data start
async getData(){
  const db = await openDB("OrdersDB", 1, {
    upgrade(db) {
      const store = db.createObjectStore('OrderStoreDB', {
        keyPath: "OrderId",

      });

    }
  });

console.log();


db.getAll("OrderStoreDB").then(result => {
  console.log(result)
  this.data = result;

 this.listData = new MatTableDataSource(this.data);
 this.listData.sort = this.sort_;
 this.listData.paginator = this.paginator;


  console.log(this.data)
})
}

// get data end

onSearchClear(){
  this.searchKey = "";
  this.applyFilter();
}

applyFilter(){
  this.listData.filter = this.searchKey.trim().toLowerCase();
}

onCreate(){
 const dialogueConfig = new MatDialogConfig();
 dialogueConfig.disableClose = false;
//  dialogueConfig.autoFocus = true;
 dialogueConfig.width = "80%";

this.dialog.open(OrderComponent, dialogueConfig);
this.dialog.afterAllClosed.subscribe(result => {
  this.getData();
})

}


}
