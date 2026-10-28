import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'alpha-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {}
