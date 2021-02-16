import { Component, OnInit } from '@angular/core';
import { IProduct, ProductsService } from 'src/app/services/products.service';

const NEW_PRODUCT_TEMPLATE: IProduct = {
  id: undefined,
  name: '',
  description: '',
  price: 0,
  creationDate: new Date()
};

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {

  public product: IProduct;

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
  }

  public deleteProduct(index: number): void {
    this.productsService.deleteProduct(index);
  }

  public create(): void {
    this.product = NEW_PRODUCT_TEMPLATE;
  }

  public updateProduct(product: IProduct): void {
    const id = this.productsService.update(product);

    if ('undefined' !== typeof id) {
      this.product = this.productsService.get(id);
    }
  }

  public selectProduct(product: IProduct): void {
    this.product = product;
  }

}
