import { Component, input } from '@angular/core';

import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'alpha-titulo',
  templateUrl: './titulo-page.html',
})
export class TituloPage {
  title = input<string>();
  router = input<string>();
  principalButton = input<boolean>(true);
}
