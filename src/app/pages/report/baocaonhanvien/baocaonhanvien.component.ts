import { Component, OnInit } from '@angular/core';
import { baocaonhanvienModel } from 'app/model/report/baocaonhanvien-model';
import { excelModel } from 'app/model/report/report_excel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from 'app/services/report/report.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'app/services/excel/excel.service';

@Component({
  selector: 'ngx-baocaonhanvien',
  templateUrl: './baocaonhanvien.component.html',
  styleUrls: ['./baocaonhanvien.component.scss']
})
export class BaocaonhanvienComponent implements OnInit {

  danhsachnhanvien: Array<baocaonhanvienModel> = [];
  model : excelModel;
  modalReference: any;
  ismonth = true;
  isQuy = true;
  isyear = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  filterResultTemplist: baocaonhanvienModel[] = [];
  isSelected = true;
  page = 1;
  label: any;
  label1: any;
  label2: any;
  pageSize = 5;
  update: any;
  update1: any;
  arr_nam: any;
  arr_quy: any;
  arr_thang: any;
  key: string;
  thang: any;
  nam: any;
  quy: any;
  update2: [2018,2019,2020];
  listFilterResult: baocaonhanvienModel[] = [];
  constructor(
    private modalService: NgbModal,
    private reportService: ReportService,
    private toastr: ToastrService,
    private exportService: ExportService
    ) {
    }

  
  ngOnInit(): void {
  }


  

  fetchDanhSachnhanvien(model: excelModel){
    this.isLoading =  true;
    this.reportService.reportNhanvien(model).subscribe(data => {
      this.danhsachnhanvien = data.data;
      this.listFilterResult = data.data;
      this.listFilterResult.forEach((x) => (x.checked = false));
      this.filterResultTemplist = this.listFilterResult;    },
    err => {
        this.isLoading = false;
      })
  }

  export() {
    this.exportService.exportExcel(this.listFilterResult, 'Nhanvien');
  }

  changeStatus(event: any) {
    this.isLoading = true;
    // var thamso: excelModel;
    switch (parseInt(event)) {
      case -1:
        this.isyear = true;
        this.ismonth = true;
        this.isQuy = true;
        this.thang = null;
        this.quy = null;
        this.nam = null;
        this.key = "all";
        this.arr_thang = [];
        this.arr_quy = [];
        this.arr_nam = [];
        var value = "";
        var thamso = {
          key: this.key,
          param: value
        };
        this.fetchDanhSachnhanvien(thamso);
        break;
      case 0:
        this.ismonth = false;
        this.isyear = false;
        this.isQuy = true;
        this.quy = null;
        this.key = "bct";
        var value = "";
        // if (this.thang != null || this.thang != undefined) {
        //   value += this.thang + "/" + this.nam;
        // }
        this.arr_quy = [];
        this.arr_thang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.arr_nam = [2018, 2019, 2020];
        var thamso = {
          key: this.key,
          param: value
        };
        this.fetchDanhSachnhanvien(thamso);
        break;
      case 1:
        this.ismonth = true;
        this.isQuy = false;
        this.isyear = false;
        this.thang = null;
        this.key = "bcq";
        this.arr_thang = [];
        this.arr_quy = [1, 2, 3, 4];
        this.arr_nam = [2018, 2019, 2020];
        var value = "";
        var thamso = {
          key: this.key,
          param: value
        };
        this.fetchDanhSachnhanvien(thamso);
        break;
      case 2:
        this.isyear = false;
        this.ismonth = true;
        this.isQuy = true;
        this.thang = null;
        this.quy = null;
        this.arr_thang = [];
        this.arr_quy = [];
        var value = "";
        this.arr_nam = [2018, 2019, 2020];
        this.key = "bcn";
        value = this.nam;
        var thamso = {
          key: this.key,
          param: value
        };
        this.fetchDanhSachnhanvien(thamso);
        break;
      default:
        break;
    }
  }

  changeStatus2(event: any) {
    this.isLoading = true;
    // let thamso: excelModel;
    this.nam = parseInt(event);
    let value = "";
    if (this.key == "bct") {
      value += this.thang + "/" + this.nam;
    } else if (this.key == "bcq") {
      value = this.quy + "/" + this.nam;
    } else if (this.key == "bcn") {
      value = this.nam;
    }
    var thamso = {
      key: this.key,
      param: value
    };
    this.fetchDanhSachnhanvien(thamso);
  }

  changeStatus3(event: any) {
    this.isLoading = true;
    // let thamso: excelModel;
    this.quy = parseInt(event);
    this.thang = null;
    let value = this.quy + "/" + this.nam;
    var thamso = {
      key: this.key,
      param: value
    };
    this.fetchDanhSachnhanvien(thamso);
  }

  changeStatus1(event: any) {
    this.isLoading = true;
    let list = [];
    let thamso: excelModel;
    let value = "";
    this.thang = parseInt(event);
    this.quy = null;
    value += this.thang + "/" + this.nam;
    thamso = {
      key: this.key,
      param: value
    };
    this.fetchDanhSachnhanvien(thamso);
  }

}