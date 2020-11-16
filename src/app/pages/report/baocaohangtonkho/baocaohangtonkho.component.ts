import { Component, OnInit } from '@angular/core';
import { hangtonkhoModel } from 'app/model/report/baocaotonkho-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from 'app/services/report/report.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'app/services/excel/excel.service';

@Component({
  selector: 'ngx-baocaohangtonkho',
  templateUrl: './baocaohangtonkho.component.html',
  styleUrls: ['./baocaohangtonkho.component.scss']
})
export class BaocaohangtonkhoComponent implements OnInit {

  danhsachhangtonkho: Array<hangtonkhoModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  isSelected = true;
  page = 1;
  pageSize = 5;
  listFilterResult: hangtonkhoModel[] = [];
  constructor(
    private modalService: NgbModal,
    private reportService: ReportService,
    private toastr: ToastrService,
    private exportService: ExportService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhSachhangtonkho();
  }


  

  fetchDanhSachhangtonkho(){
    this.isLoading =  true;
    this.reportService.reportHangTonKho().subscribe(data => {
      this.danhsachhangtonkho = data.data;
      this.listFilterResult = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  export() {
    this.exportService.exportExcel(this.listFilterResult, 'HangTonKho');
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
    let list = [];
    // tslint:disable-next-line: radix
    switch (parseInt(event)) {
      case -1:
        this.listFilterResult = [...this.danhsachhangtonkho];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachhangtonkho];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachhangtonkho];
        this.listFilterResult = list.filter(item => item.isActive === 0);
        this.isLoading = false;
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
