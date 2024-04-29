import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientsListComponent],
  template: `
    
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div class="container">
        <a class="navbar-brand fs-3" href="#">Stack</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
              <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#">Inicio</a>
              </li>
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Ventas
                  </a>
                  <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Caja</a></li>
                      <li><a class="dropdown-item" href="#">Cliente</a></li>
                  </ul>
              </li>
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Compras
                  </a>
                  <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Proveedor</a></li>
                      <li><a class="dropdown-item" href="#">Orden de Compra</a></li>
                  </ul>
              </li>
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Almacen
                  </a>
                  <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Kardex</a></li>
                      <li><a class="dropdown-item" href="#">Producto</a></li>
                      <li><a class="dropdown-item" href="#">Categoría</a></li>
                  </ul>
              </li>
          </ul>
          <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
              <button class="btn btn-outline-light" type="submit">Búsqueda</button>
          </form>
        </div>
      </div>
    </nav>


    <main>
      <router-outlet /> <!-- AQUI SE RENDERIZA MI COMPONENTE -->
    </main>
  `,
  styles: [
    `
    `
  ],
})
export class AppComponent {
  title = 'client';
}
