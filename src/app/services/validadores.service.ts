import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {[s:string]:boolean}

@Injectable({
  providedIn: 'root'
})


export class ValidadoresService {

  constructor() { }

  existeUsuario(control:FormControl):Promise<ErrorValidate> | Observable<ErrorValidate>{
    if (!control.value) {
      return Promise.resolve(null); // esto para que no se ejecute la primera vez
    }

    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'negoveron') {
          resolve({existe:true})
        } else {
          resolve(null)
        }

      }, 3500);
    })
  }

  noHerrera(control:FormControl):ErrorValidate{
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      }
    }
    return null;
  }

  passwordsIguales(p1:string,p2:string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[p1];
      const pass2Control = formGroup.controls[p2];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({noEsigual:true})
      }
    }
  }
}
