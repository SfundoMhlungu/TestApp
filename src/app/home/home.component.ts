import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../shared/share-data.service';


import {openDB} from "idb/with-async-ittr-cjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  page = 0;
  resultsCount= 10;
  totalPages = 10;

 public data = [];


  bulkEdit = false;
  sortDirection = 0;


  sortKey = null;

  constructor( ) { }

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
      // this.share.setData(data);
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


  console.log(this.data)
})
}

// get data end
}
