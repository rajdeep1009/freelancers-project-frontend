import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.name === cartItem.name);

      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalChargeValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalChargeValue += currentCartItem.charge;
      totalQuantityValue += currentCartItem.quantity;
    }

    //PUBLISH VALUES TO SUBSCRIBERS
    this.totalPrice.next(totalChargeValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalChargeValue, totalQuantityValue);

  }
  logCartData(totalChargeValue: number, totalQuantityValue: number) {
    console.log(`TotalChargeValue: ${totalChargeValue}  TotalQuantityValue: ${totalQuantityValue}`);
  }
}
