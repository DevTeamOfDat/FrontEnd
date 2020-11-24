import { Component, OnInit } from "@angular/core";
import { tintucModel } from "app/model/tintuc/tintuc-model";
import { TintucService } from "app/services/tintuc/tintuc.service";

@Component({
  selector: "ngx-widget-area",
  templateUrl: "./widget-area.component.html",
  styleUrls: ["./widget-area.component.css"],
})
export class WidgetAreaComponent implements OnInit {
  danhsachtintuc: Array<tintucModel> = [];
  constructor(private tintucService: TintucService) {}

  ngOnInit(): void {
    this.fetchDanhsachsanpham();
  }

  fetchDanhsachsanpham() {
    this.tintucService.getAll().subscribe((data) => {
      this.danhsachtintuc = data.data;
      (this.danhsachtintuc);
    });
  }
}
