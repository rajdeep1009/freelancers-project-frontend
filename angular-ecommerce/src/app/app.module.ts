import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import {Routes, RouterModule, Router} from '@angular/router';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { FreelancerDetailsComponent } from './components/freelancer-details/freelancer-details.component';

const routes : Routes = [
  {path: 'freelancer-details/:name', component: FreelancerDetailsComponent},
  {path: 'search/:keyword' , component: ProductListComponent},
  {path: 'category/:category/:description' , component: ProductListComponent},
  {path: 'category' , component: ProductListComponent},
  {path: 'products' , component: ProductListComponent},
  {path: '' , redirectTo: '/products', pathMatch: 'full'},
  {path: '**' , redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryMenuComponent,
    SearchComponent,
    FreelancerDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
