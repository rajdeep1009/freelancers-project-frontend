import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Freelancer } from 'src/app/common/freelancer';

@Component({
  selector: 'app-freelancer-details-component',
  templateUrl: './freelancer-details.component.html',
  styleUrls: ['./freelancer-details.component.css']
})
export class FreelancerDetailsComponent implements OnInit {

  freelancerName : string;

  freelancer : Freelancer[];

  constructor(private route : ActivatedRoute, private productService : ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.retrieveFreelancerDetails();
    })
    

  }

  retrieveFreelancerDetails(){
    this.freelancerName = this.route.snapshot.paramMap.get('name');

    this.productService.getFreelancerDetailsByName(this.freelancerName).subscribe(
      data => {
        this.freelancer = data
        console.log(JSON.stringify(this.freelancer))
      }
    );
  }

}
