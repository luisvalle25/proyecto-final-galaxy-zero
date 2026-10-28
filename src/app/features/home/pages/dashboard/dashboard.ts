import { Component } from '@angular/core';

import { TituloPage } from "../../components/titulo-page/titulo-page"

@Component({
  imports: [TituloPage],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
