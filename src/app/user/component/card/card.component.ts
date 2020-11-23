import { Component, OnInit } from "@angular/core";
import { Product } from "app/user/models/product";
import { MessengerService } from "../../service/messenger.service";
@Component({
  selector: "ngx-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  cartItem = [];

  cartTotal = 0;
  constructor(private msg: MessengerService) {}

  ngOnInit() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.cartItem.unshift({
        productName: product.name,
        qty: 1,
        price: product.price,
      });

      this.cartTotal = 0;
      this.cartItem.forEach((item) => {
        this.cartTotal += item.qty * item.price;
      });
    });
  }
}
