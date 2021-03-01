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

const formatYmd = (date: Date) => date.toISOString().slice(0, 10);

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
      // creationDate: product.creationDate.toDateString(),
      creationDate: formatYmd(product.creationDate),
    });
    this.date = product.creationDate;
    console.log(this.form);
  }

  @Output() updateProduct: EventEmitter<IProduct> = new EventEmitter();

  public form = new FormGroup({
    id: new FormControl(),
    productName: new FormControl(
      '', 
      [
        Validators.required,
        Validators.maxLength(30)
      ]
    ),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    creationDate: new FormControl('', [Validators.required]),
  });

  
  public date: Date;

  constructor() { }

  public update(): void {
    // Add Validation for form
    
    if (!this.form.errors) {
      const formData = {...this.form.value};
      const date = new Date(this.form.value.creationDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
      this.updateProduct.emit({
        id: undefined,
        name: formData.productName,
        description: formData.description,
        price: formData.price,
        creationDate: date
      });
    }
  }


}
