import { Freelancer } from './freelancer';

export class CartItem {

    name : string;
    email : string;
    phone : string;
    charge : number;
    quantity : number;

    constructor( freelancer : Freelancer ){
        this.name = freelancer.name;
        this.email = freelancer.email;
        this.phone = freelancer.phone;
        this.charge = +freelancer.charge;
        this.quantity = 1;
    }

}
