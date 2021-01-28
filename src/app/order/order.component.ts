import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


import {DatabaseService}   from "../database.service";
import { OrderService } from '../shared/order.service';
import {openDB} from "idb/with-async-ittr-cjs";



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;


  // editable labels -> allow header edit
  OrderId: string  = "Order ID";
  OrderDate: string = "Order Date";
  Customer: string = "Customer";
  Status: string = "Status";
  userDefined: Array<any> = [];

  selectedFile:File;
  purchaseOrder: File;
  invoice: File;
  deliveryNote: File;
  localStorage: Storage;

  newFields: number = 0;
  id_: Array<any> = [];
  fullEditMode:boolean = false;

  onEdit: boolean;

  constructor(private fb: FormBuilder,private db: DatabaseService,
        private dialogueRef: MatDialogRef<OrderComponent>, private orderService: OrderService) { }

  ngOnInit(): void {
    let d = new Date();

    if(!window.indexedDB){
      alert("please use a browser that supports indexedDB");
    }
    this.orderForm = this.fb.group({
      OrderId : 0,
        OrderDate : d.toDateString(),
        Customer: '',
        Status: "New",
        newFieldName: '',
      entireForm :this.fb.array([])
    })
//
this.dialogueRef.beforeClosed().subscribe(result =>{
this.onEdit = false;
console.log("onedit", this.onEdit)
})


// when the dialogues opens
    this.dialogueRef.afterOpened().subscribe(result => {
      this.onEdit = true;
      console.log("onedit", this.onEdit)

      this.orderService.getData().then((result)=>{



        if (result.isEdit){


// start of if statement
          if(result.data.additionalfields){
          for (let additional of result.data.additionalfields){
            for (var key in additional) {
              if(additional.hasOwnProperty(key)){
                console.log(key)
                const field = this.fb.group({
                  UserField: key,
                  UserEntry: additional[key]
                });


                   this.entireForm.push(field);
                   console.log(result.isEdit);
              }
            }


      }
    }
    // end of if statement
    this.orderForm.setValue({
      OrderId : result.data.OrderId,
        OrderDate :result.data.OrderDate,
        Customer: result.data.Customer,
        Status: result.data.Status,
        newFieldName:  "",
        entireForm: this.entireForm

    })


   console.log("orderform",this.entireForm)

        }
      })
    })
  }


  get entireForm() {
    return this.orderForm.get("entireForm") as FormArray;
 }
// dynamic fields start
 addDynamicFields() {
  const dynamicField = this.fb.group({
    UserField: "",
    UserEntry: ""
  })


  let id =  this.newFields.toString()
 this.id_.push(id)

  this.entireForm.push(dynamicField);

  this.newFields++;
}

// countfields start
countFields(){



  for(let form of this.entireForm.controls){
    console.log(form.value)

  }

}

// edit starts  redundat   remove after confirming it does not break anything
fullEdit(){
  this.fullEditMode = true;
  this.orderForm.setValue({
    OrderId : this.OrderId,
      OrderDate : this.OrderDate,
      Customer: this.Customer,
      Status: this.Status,
      newFieldName:  "",
      entireForm: this.entireForm

  })
}
// redundat   remove after confirming it does not break anything
confirmEdit(){
   this.fullEditMode = false;

 const vals = this.orderForm.value;
 this.OrderId = vals.OrderId;
 this.OrderDate = vals.OrderDate;
 this.Customer = vals.Customer;
 this.Status = vals.Status;

 this.orderForm.setValue({
  OrderId : 0,
    OrderDate : Date.now(),
    Customer: "",
    Status: "",
    newFieldName:  "",
    entireForm: this.entireForm

})

}



// data entry to db, use service
saveOrder(){

  const formData = this.orderForm.value
  let data = {
    OrderId:  formData.OrderId,
    OrderDate: formData.OrderDate,
    Customer: formData.Customer,
    Status: formData.Status,
    documents: [],
    additionalfields: []


  }


  // get documents
  if(this.invoice){
    data.documents.push({name: "invoice", doc: this.invoice})
  }

  if(this.purchaseOrder){
    data.documents.push({name: "Purchase Order", doc: this.purchaseOrder})
  }


  if(this.deliveryNote){
    data.documents.push({name: "Delivery Note", doc: this.deliveryNote})
  }


  // add dynaic fields
  for(let form of this.entireForm.controls){
    console.log(form.value)
    let add = {}
    add[form.value.UserField] = form.value.UserEntry;

    data.additionalfields.push(add)

  }
    // save

      console.log("not edit mode")
      this.db.sendData(data).then(result =>{
        this.dialogueRef.close();
       });

// forseen: if the user changes order id, a new document is created, since it is indexedDB
// handle in the future





   }




// files change event
   onFileChangedDeliveryNote(event){
    this.deliveryNote = event.target.files[0];
   }



   onFileChangedPurchaseOrder(event){
    this.purchaseOrder = event.target.files[0];
  }

  onFileChangedInvoice(event){
    this.invoice = event.target.files[0];
  }

  deleteField(index){
    this.entireForm.removeAt(index)
    console.log(index);
    console.log(this.userDefined[index])
  }

}
