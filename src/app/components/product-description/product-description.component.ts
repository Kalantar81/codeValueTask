import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IProduct } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.less']
})
export class ProductDescriptionComponent  {

  public isCreate: boolean;

  @Input()
  public set product(product: IProduct) {
    this.isCreate = false;

    if ('undefined' === typeof product.id) {
      this.isCreate = true;
    }

    this.form.patchValue({
      productName: product.name,
      description: product.description,
      price: product.price,
      creationDate: product.creationDate,
    });
    console.log(this.form);
  }

  @Output() updateProduct: EventEmitter<IProduct> = new EventEmitter();

  public form = new FormGroup({
    id: new FormControl(),
    productName: new FormControl('', [Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    creationDate: new FormControl('', [Validators.required]),
  });

  constructor() { }

  public update(): void {
    // Add Validation for form
    if (!this.form.errors) {
      const formData = {...this.form.value};
      this.updateProduct.emit({
        id: undefined,
        name: formData.productName,
        description: formData.description,
        price: formData.price,
        creationDate: formData.creationDate
      });
    }
  }


}
