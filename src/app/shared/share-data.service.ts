import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  data: any;
  constructor() { }




  setData(data){
    this.data = data;
  }

  getData(){
    return this.data;
  }
}
