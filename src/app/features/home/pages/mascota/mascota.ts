import { Component } from '@angular/core';

import { TituloPage } from "../../components/titulo-page/titulo-page";

@Component({
  imports: [TituloPage],
  selector: 'app-mascota',
  styleUrl: './mascota.css',
  templateUrl: './mascota.html',
})
export class Mascota {}
