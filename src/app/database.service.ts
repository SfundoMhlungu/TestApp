import { Injectable } from '@angular/core';
import { openDB} from 'idb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  localStorage: Storage;
  data_: any;
  success: any;

  constructor() {
    this.localStorage = window.localStorage;
   }


 async sendData(data) {


    const db = await openDB("OrdersDB", 1, {
      upgrade(db) {
        const store = db.createObjectStore('OrderStoreDB', {
          keyPath: "OrderId",

        });

      }
    });


    db.put("OrderStoreDB",data).then(result =>{
      return result;
    })

  //   console.log(data);


  //    let request = window.indexedDB.open("OrdersDB", 1),
  //       db,
  //       tx,
  //      store,
  //      index;


  //  request.onupgradeneeded = (e) => {
  //   let db = request.result,
  //       store = db.createObjectStore("OrderStoreDB",
  //       {   keyPath: "OrderId",});


  //  }



  //  request.onerror = (error) => {
  //    console.log(error);
  //  }


  //  request.onsuccess = (e) => {
  //    console.log("success")
  //      db = request.result;
  //      tx = db.transaction("OrderStoreDB", "readwrite");
  //      store = tx.objectStore("OrderStoreDB");
  //      db.onerror = function(e) {
  //          console.log("ERR" + e.target.errorCode)
  //        }


  //   let inputData = store.put(data);



  //   inputData.onsuccess = function() {
  //      console.log(inputData.result)


  //    }

  //    inputData.onerror = function(e) {
  //      console.log(e)
  //    }



  //    tx.oncomplete = function(e) {
  //      db.close();
  //      console.log("closing")
  //    }
  //  }
  // }
}

}
