import { OrderService } from './../shared/order.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data:any;
  keys: Array<any> = [];
  constructor(private shared:  OrderService) { }

  ngOnInit(): void {

    this.shared.getData().then(result => {
   this.data = result.data;

   console.log(this.data)

   for( let data of this.data.additionalfields){
     console.log(data)
     var key = Object.keys(data);
     console.log(key)

       this.keys.push(key[0]);


   }

   console.log(this.keys)
   console.log(this.keys[0])
   console.log(this.data.additionalfields.key[0])
    })
  }

}
