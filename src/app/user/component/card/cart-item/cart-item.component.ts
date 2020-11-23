import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ngx-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.css"],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: any;
  constructor() {}

  ngOnInit(): void {}
}
