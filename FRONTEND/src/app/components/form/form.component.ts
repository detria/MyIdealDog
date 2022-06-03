import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  numVecesSiguiente: number = 0;

  ngOnInit(): void {
  }

  siguientePregunta() {
    this.numVecesSiguiente++;
    this.preguntas();
  }
  
  anteriorPregunta() {
    this.numVecesSiguiente--;
    this.preguntas()
  };

  private preguntas():string[] {
    var pregunta = document.getElementById("question");
    var primeraOpcion = document.getElementById("first");
    var segundaOpcion = document.getElementById("second");
    var respuestaOpcion=document.querySelector('input[name="answer"]:checked')
    if(respuestaOpcion!=null){
      respuestaOpcion
    }
    var respuestas:string[]=[];
    switch (this.numVecesSiguiente) {
      case 1:
        if (pregunta != null && primeraOpcion != null && segundaOpcion != null) {
          pregunta.textContent = "¿¿Vives en un piso o en una casa?";
          primeraOpcion.textContent = "Piso";
          segundaOpcion.textContent = "Casa";
          
        }
        break;
        case 2:
        if (pregunta != null && primeraOpcion != null && segundaOpcion != null) {
          pregunta.textContent = "¿Has tenido algún otro perro anteriormente?";
          primeraOpcion.textContent = "Si";
          segundaOpcion.textContent = "No";
        }
        break;
      case 3:
        if (pregunta != null && primeraOpcion != null && segundaOpcion != null) {
          pregunta.textContent = "¿Cuanto tiempo libre tienes para dedicar a tu mascota?";
          primeraOpcion.textContent = "Entre 1h y media y 3h diarias";
          segundaOpcion.textContent = "Menos de 1h y media";
        }
        break;
      case 4:
        if (pregunta != null && primeraOpcion != null && segundaOpcion != null) {
          pregunta.textContent = "¿Necesitas un acompañante muy activo o más calmado?";
          primeraOpcion.textContent = "Activo";
          segundaOpcion.textContent = "Calmado";
        }
        break;
      case 5:
        if (pregunta != null && primeraOpcion != null && segundaOpcion != null) {
          pregunta.textContent = "¿Tienes niños en casa?";
          primeraOpcion.textContent = "Si";
          segundaOpcion.textContent = "No";
        }
        break;
      case 6:
        if (pregunta != null && primeraOpcion != null && segundaOpcion != null) {
          pregunta.textContent = "¿Podrías permitirte una raza que requiera muchos cuidados?";
          primeraOpcion.textContent = "Si";
          segundaOpcion.textContent = "No";
        }
        break;
      case 7:
        if (pregunta != null && primeraOpcion != null && segundaOpcion != null) {
          pregunta.textContent = "¿Estarías dispuesto a tener una raza ppp?";
          primeraOpcion.textContent = "Si";
          segundaOpcion.textContent = "No";
        }
        break;
      case 8:
        if (pregunta != null && primeraOpcion != null && segundaOpcion != null) {
          pregunta.textContent = "¿Te importaría una raza que suelte mucho pelo?";
          primeraOpcion.textContent = "Si";
          segundaOpcion.textContent = "No";
        }
        break;

        
    }
    return respuestas;
  }
}
