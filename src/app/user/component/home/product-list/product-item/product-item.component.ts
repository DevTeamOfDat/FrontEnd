import { Component, Input, OnInit } from "@angular/core";
import { Product } from "app/user/models/product";
import { MessengerService } from "../../../../service/messenger.service";
@Component({
  selector: "ngx-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.css"],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product;
  constructor(private msg: MessengerService) {}

  ngOnInit() {}
  handleAddToCart() {
    this.msg.sendMsg(this.productItem);
  }
}
