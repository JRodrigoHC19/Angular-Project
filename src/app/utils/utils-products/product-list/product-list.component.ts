import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/@models/product.model';


const product_void = {
  "id": -1,
  "title": "",
  "description": "",
  "features": [],
  "price": 0.0
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() spEvent = new EventEmitter<number>();

  selectProduct(id: number) { this.spEvent.emit(id) }
}
