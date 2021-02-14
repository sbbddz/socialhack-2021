import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  public form: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 onSubmit(formValue:any){

  }

}
