import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


import {DatabaseService}   from "../database.service";



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

  constructor(private fb: FormBuilder,private db: DatabaseService,
        private dialogueRef: MatDialogRef<OrderComponent>) { }

  ngOnInit(): void {
    let d = new Date();

    if(!window.indexedDB){
      alert("please use a browser that")
    }
    this.orderForm = this.fb.group({
      OrderId : 0,
        OrderDate : d.toDateString(),
        Customer: '',
        Status: "New",
        newFieldName: '',
      entireForm :this.fb.array([])
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

// edit starts
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

    data[form.value.UserField] = form.value.UserEntry

  }
    // save
    this.db.sendData(data).then(result =>{
     this.dialogueRef.close();
    });





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
