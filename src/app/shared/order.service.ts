import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  data: any;
  isEdit: boolean = false;
  constructor() { }


 async setData(data: any, isEdit:boolean) {
    this.data = data;
    this.isEdit = isEdit;
  }

  async getData(){
    let obj = {data: this.data, isEdit: this.isEdit};
    return obj;
  }
}
