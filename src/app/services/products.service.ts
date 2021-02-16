import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // public productsList$ = new BehaviorSubject(Array<IProduct>());
  public productsList: Array<IProduct>;

  constructor() {
    this.productsList = [
      {id: 1, name: 'book', description: 'New book about Harry Potter', price: 20, creationDate: new Date()},
      {id: 1, name: 'apple', description: 'Tasty green apple', price: 3, creationDate: new Date()},
      {id: 1, name: 'car', description: 'Fast car', price: 3450, creationDate: new Date()},
      {id: 1, name: 'computer', description: 'New mac air', price: 300, creationDate: new Date()},
      {id: 1, name: 'Halk', description: 'The toy Halk from advanchers', price: 20, creationDate: new Date()}
    ];
  }

  public deleteProduct(id: number): void {
    const index = this.getProductIndexById(id);

    if ('undefined' === typeof index) {
      return;
    }

    this.productsList.splice(index, 1);
  }

  public update(product: IProduct): number | void {

    // Product has no id, so create new product
    if ('undefined' === typeof product.id) {
      return this.create(product);
    }

    // Find the product in productsList
    const index = this.getProductIndexById(product.id);

    if ('undefined' === typeof index) {
      throw new Error(`Product with id ${product.id} is not exists`);
    }

    this.productsList.splice(index, 1, product);
  }

  public create(product: IProduct): number {
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const newProduct = {...product, ...{id: id}}; // new product
    this.productsList.push(product);
    return id;
  }

  public get(id: number): IProduct;
  public get(id?: number): Array<IProduct> | IProduct {

    if ('undefined' === typeof id) {
      return this.productsList;
    }

    return this.productsList.find(product => product.id === id);
  }

  private getProductIndexById(id: number): any {
    return this.productsList.findIndex(b => b.id === id);
  }
}


export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  creationDate: Date;
}
