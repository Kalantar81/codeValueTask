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

    this.form.patchValue(product);
  }

  @Output() updateProduct: EventEmitter<IProduct> = new EventEmitter();

  public form = new FormGroup({
    Id: new FormControl(),
    ProductName: new FormControl('', [Validators.maxLength(30)]),
    Description: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required]),
    CreationDate: new FormControl('', [Validators.required]),
  });

  constructor() { }

  public update(): void {
    // Add Validation for form
    if (!this.form.errors) {
      this.updateProduct.emit(this.form.getRawValue() as IProduct);
    }
  }


}
