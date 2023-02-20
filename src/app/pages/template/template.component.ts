import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre:"",
    apellido:"",
    email:"",
    pais:""
  }

  paises : any[] = [];
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;
        this.paises.unshift({
          nombre:'[Seleccione un pais]',
          codigo: ''
        })
      })
  }

  guardar(f:NgForm){
    console.log(f.value);
    if (f.invalid) {
      Object.values(f.controls ).forEach(control => {
        control.markAsTouched();
      })
    }
  }

}
