import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Product } from "../../../../@models/product.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product?: Product;
  @Output() backPageClicked = new EventEmitter();

  backPage() {
    this.backPageClicked.emit();
  }
}
