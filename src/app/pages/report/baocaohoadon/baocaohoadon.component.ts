import { Component, OnInit } from '@angular/core';
import { baocaohoadonModel } from 'app/model/report/baocaohoadon-model';
import { excelModel } from 'app/model/report/report_excel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from 'app/services/report/report.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'app/services/excel/excel.service';

@Component({
  selector: 'ngx-baocaohoadon',
  templateUrl: './baocaohoadon.component.html',
  styleUrls: ['./baocaohoadon.component.scss']
})
export class BaocaohoadonComponent implements OnInit {

  danhsachhoadon: Array<baocaohoadonModel> = [];
  model : excelModel;
  modalReference: any;
  ismonth = true;
  isyear = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  isSelected = true;
  page = 1;
  label: any;
  label1: any;
  label2: any;
  pageSize = 5;
  update: any;
  update1: any;
  update2: [2018,2019,2020];
  listFilterResult: baocaohoadonModel[] = [];
  constructor(
    private modalService: NgbModal,
    private reportService: ReportService,
    private toastr: ToastrService,
    private exportService: ExportService
    ) {
    }

  
  ngOnInit(): void {
  }


  

  fetchDanhSachhoadon(model: excelModel){
    this.isLoading =  true;
    this.reportService.reportHoaDon(model).subscribe(data => {
      this.danhsachhoadon = data.data;
      this.listFilterResult = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  export() {
    this.exportService.exportExcel(this.listFilterResult, 'Hoadon');
  }

  
  // open(content: any) {
  //   this.modalReference = this.modalService.open(content, {
  //     ariaLabelledBy: 'modal-basic-title',
  //   });
  //   this.modalReference.result.then(
  //     (result: any) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     (reason: any) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     }
  //   );
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  // checkAllCheckBox(ev) {
  //   this.listFilterResult.forEach((x) => (x.checked = ev.target.checked));
  //   this.changeModel();
  // }

  // isAllCheckBoxChecked() {
  //   return this.listFilterResult.every((p) => p.checked);
  // }

  // changeModel() {
  //   const selectedHometowns = this.listFilterResult
  //     .filter((hangtonkho) => hangtonkho.checked)
  //     .map((p) => p.loai_dac_trung);
  //     console.log(selectedHometowns);
  //   if (selectedHometowns.length > 0) {
  //     this.isDelete = false;

  //   } else {
  //     this.isDelete = true;
  //   }
  // }

  // xoahangtonkho(item: any = null) {
  //   let selectedhangtonkho= [];
  //   if (item !== null && item !== undefined && item !== '') {
  //     selectedhangtonkho.push(item);
  //     this.delete(selectedhangtonkho);
  //     return;
  //   }
  //   selectedhangtonkho = this.listFilterResult
  //     .filter((hangtonkho) => hangtonkho.checked)
  //     .map((p) => p.loai_dac_trung);
  //   if (selectedhangtonkho.length === 0) {
  //     this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
  //     return;
  //   }
  //   this.delete(selectedhangtonkho);
  // }

  // initModal(model: any,type = null): void {
  //   this.view.view(model, type);
  // }

  changeStatus(event: any) {
    this.isLoading = true;
    let thamso: excelModel;
    // tslint:disable-next-line: radix
    switch (parseInt(event)) {
      case -1:
        this.isyear = true;
        this.ismonth = true;
        thamso={
          key: "all",
          param:""
        };
        this.fetchDanhSachhoadon(thamso);
        break;
      case 0:
        this.label1 = this.label;
        this.update = [1,2,3,4,5,6,7,8,9,10,11,12];
        this.ismonth=false;
        thamso={
          key: "bct",
          param:"13"
        };
        console.log(thamso);
        this.fetchDanhSachhoadon(thamso);
        break;
      case 1:
        thamso={
          key: "bct",
          param:"13"
        };
        this.fetchDanhSachhoadon(thamso);
        this.label1 = this.label;
        this.update = [1,2,3,4];
        this.ismonth=false;
        this.isyear = true;
        break;
      case 2:
        this.isyear = false;
        this.ismonth = true;
        this.label1 = this.label;
        break;
      default:
        thamso={
          key: "bct",
          param:"13"
        };
        this.fetchDanhSachhoadon(thamso);
        break;
    }
  }

  changeStatus2(event: any) {
    this.isLoading = true;
    let thamso: excelModel;
    // tslint:disable-next-line: radix
    switch (parseInt(event)) {
      case 2018:
        thamso={
          key: "bcn",
          param:"2018"
        };
        this.fetchDanhSachhoadon(thamso);
        break;
      case 2019:
        thamso={
          key: "bcn",
          param:"2019"
        };
        this.fetchDanhSachhoadon(thamso);
        break;
      case 2020:
        thamso={
          key: "bcn",
          param:"2020"
        };
        this.fetchDanhSachhoadon(thamso);
        break;
      default:
        thamso={
          key: "bcn",
          param:"2017"
        };
        this.fetchDanhSachhoadon(thamso);
        break;
    }
  }

  changeStatus1(event: any) {
    this.isLoading = true;
    let list = [];
    let thamso: excelModel;
    let key : any;
    if(this.label1==0){
      key="bct";
    }else if(this.label1==1)
    {
      key="bcq";
    }else{
      key="bcn";
    }
    // tslint:disable-next-line: radix
    switch (parseInt(event)) {
      case 1:  
        thamso={
          key: key,
          param: "1/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 2:
        thamso={
          key: key,
          param:"2/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 3:
        thamso={
          key: key,
          param:"3/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 4:
        thamso={
          key: key,
          param:"4/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 5:
        thamso={
          key: key,
          param:"5/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 6:
        thamso={
          key: key,
          param:"6/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 7:
        thamso={
          key: key,
          param:"7/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 8:
        thamso={
          key: key,
          param:"8/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 9:
        thamso={
          key: key,
          param:"9/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 10:
        thamso={
          key: key,
          param:"10/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      case 11:
        thamso={
          key: key,
          param: "11/"+this.label2
        };
        this.isyear=false;
        console.log(thamso);
        this.fetchDanhSachhoadon(thamso);
        break;
      case 12:
        thamso={
          key: key,
          param:"12/"+this.label2
        };
        this.isyear=false;
        this.fetchDanhSachhoadon(thamso);
        break;
      
      default:
        break;
    }
  }

  // public delete(listid: any) {
  //   const modelDelete = {
  //     listId: listid
  //   };

  //   console.log(modelDelete);
  //   this.reportService.delete(modelDelete).subscribe(
  //     (result) => {
  //       // status: 200
  //       this.ngOnInit();
  //       this.changeModel();
  //       this.toastr.success('Xóa thành công');
  //       this.modalReference.dismiss();
  //     },
  //     (error) => {
  //       this.toastr.error('Xóa thất bại');
  //     }
  //   );
  // }

}
