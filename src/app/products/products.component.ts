import { Component, OnInit } from '@angular/core';

import { Product } from "../../@models/product.model";

import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  product?: Product;
  isDisabledPage: boolean = true;

  constructor (private databaseService: DatabaseService) { }

  ngOnInit(): void {
    console.log("Products initialized!");

    this.databaseService.getProduct_All().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      }
    })
  }

  selectProduct(id: number){
    this.product = this.products[id];
    this.isDisabledPage= false;
  }

  backPage(){
    this.isDisabledPage = true;
  }
}
