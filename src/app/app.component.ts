import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formulario: FormGroup;
  numeroMasSeRepite: string;
  numeroDEVecesQueSeRepite: number;


constructor(  private readonly fb: FormBuilder  ) {

}

ngOnInit(): void {
this.crearFormulario();
}


crearFormulario(): void {
  this.formulario = this.fb.group({
    inputNumero: [null, Validators.compose([
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(16)
  ])],
  });
}

capturarNumero(): void {
 const numeroFormulario = this.formulario.get('inputNumero').value;
 const arrayNumeros = this.convertirCadenaArray(numeroFormulario);
 const respuestaNumeroRepetido = this.recorrerArray(arrayNumeros);
 this.numeroMasSeRepite =  respuestaNumeroRepetido[0];
 this.numeroDEVecesQueSeRepite =  respuestaNumeroRepetido[1];
}

convertirCadenaArray( numeroFormulario: string ): string[] {
  return numeroFormulario.split('');
}

recorrerArray(arrayNumeros: string[]): any {
  if(arrayNumeros.length > 0) {
    let ocurrencia = new Map();

    arrayNumeros.forEach((valor: string, indice: number, arrayNumeros: string[]) => {
       ocurrencia.has(valor) ? ocurrencia.set(valor, ocurrencia.get(valor) + 1) : ocurrencia.set(valor, 1);
    });

    return [...ocurrencia.entries()].reduce( (valorA, valorB)  =>  valorB[1] > valorA[1] ? valorB : valorA);
  
  }

  
}


}
