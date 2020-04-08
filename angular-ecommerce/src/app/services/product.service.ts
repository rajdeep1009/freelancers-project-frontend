import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Freelancer } from '../common/freelancer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/freelancers";

  constructor(private httpClient : HttpClient) { }

  getFreelancers (): Observable<Freelancer[]> {
    return this.httpClient.get<Freelancer[]>(this.baseUrl).pipe(
      map(data => data)
    );
  }

  getFreelancersByCategory(category : number) : Observable<Freelancer[]> {

    const categorySearchUrl = `${this.baseUrl}/category/${category}`;

    return this.httpClient.get<Freelancer[]>(categorySearchUrl).pipe(
      map(data => data)
    );
  }

  getCategories() : Observable<Category[]>{

    const categoriesUrl = `${this.baseUrl}/categories`;

    return this.httpClient.get<Category[]>(categoriesUrl).pipe(
      map(data => data)
    );
  }

  searchFreelancers( keyword : string) : Observable<Freelancer[]>{
    
    const freelancerSearchUrl = `${this.baseUrl}/${keyword}`;

    return this.httpClient.get<Freelancer[]>(freelancerSearchUrl).pipe(
      map(data => data)
    );

  }

  getFreelancerDetailsByName(name : string) : Observable<Freelancer[]>{
    
    const freeLancerDetailByNameUrl = `${this.baseUrl}/${name}`;

    return this.httpClient.get<Freelancer[]>(freeLancerDetailByNameUrl).pipe(
      map(data => data)
    );

  }


}
