import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray,  FormBuilder, Validators } from '@angular/forms';
import { Customer } from './customer.interface';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    public myForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            addresses: this._fb.array([
                this.initAddress(),
            ])
        });
    }

    initAddress() {
        return this._fb.group({
            street: ['', Validators.required],
            postcode: ['']
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

    save(model: Customer) {
        // call API to save
        // ...
        console.log(model);
        // console.log('gdd ' + JSON.stringify(model, this.replacer));
        const myaa = JSON.stringify(model);
        // console.log('gdd ' + JSON.stringify(model));
        console.log('gdd ' + JSON.parse(myaa));
    }


    replacer(key, value) {
    if (value == null || value === '' || (Object.keys(value).length === 0 && value.constructor === Object) || value === {}) {
      return undefined;
    } else if (value && typeof value === 'object') {
      let isEmptyObject = true;
      // tslint:disable-next-line:no-shadowed-variable
      Object.keys(value).forEach(key => {
        if (value[key] != null && value[key] !== '') {
          isEmptyObject = isEmptyObject && false;
        }
      });
      if (isEmptyObject) { return undefined; } else { return value; }
    } else { return value; }
  }
}
