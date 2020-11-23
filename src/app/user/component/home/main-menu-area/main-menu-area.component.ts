import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-main-menu-area",
  templateUrl: "./main-menu-area.component.html",
  styleUrls: ["./main-menu-area.component.css"],
})
export class MainMenuAreaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  topFunction() {
    document.body.scrollTop = document.documentElement.scrollHeight;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  }
}
