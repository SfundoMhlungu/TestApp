import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  data: any;

  constructor() { }


 async setData(data: any) {
    this.data = data;
  }

  async getData(){
    return this.data;
  }
}
