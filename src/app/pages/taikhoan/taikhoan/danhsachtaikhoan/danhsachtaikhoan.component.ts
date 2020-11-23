import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhattaikhoanComponent } from '../capnhattaikhoan/capnhattaikhoan.component';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachtaikhoan',
  templateUrl: './danhsachtaikhoan.component.html',
  styleUrls: ['./danhsachtaikhoan.component.scss']
})
export class DanhsachtaikhoanComponent implements OnInit {

  @ViewChild(CapnhattaikhoanComponent) view!: CapnhattaikhoanComponent;
  danhsachtaikhoan: Array<taikhoanModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: taikhoanModel[] = [];
  listFilterResult: taikhoanModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private taikhoanService: TaikhoanService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachtaikhoan();
  }


  

  fetchDanhsachtaikhoan(){
    this.isLoading =  true;
    this.taikhoanService.getAll().subscribe(data => {
      this.danhsachtaikhoan = data.data;
      this.listFilterResult = data.data;
      this.listFilterResult.forEach((x) => (x.checked = false));
      this.filterResultTemplist = this.listFilterResult;    },
    err => {
        this.isLoading = false;
      })
  }

  
  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modalReference.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.email.toLowerCase();
        var hot_line = item.ho_ten.toLowerCase();
        var ten = item.loai_tai_khoan.toLowerCase();
        var ten1 = item.dia_chi.toLowerCase();
        var ten2 = item.so_dien_thoai.toLowerCase();
        if (dc.includes(keyword) || hot_line.includes(keyword) || ten.includes(keyword)|| ten1.includes(keyword) || ten2.includes(keyword)) {
          filterResult.push(item);
        }
      });
      this.listFilterResult = filterResult;
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  checkAllCheckBox(ev) {
    this.listFilterResult.forEach((x) => (x.checked = ev.target.checked));
    this.changeModel();
  }

  isAllCheckBoxChecked() {
    return this.listFilterResult.every((p) => p.checked);
  }

  changeModel() {
    const selectedHometowns = this.listFilterResult
      .filter((taikhoan) => taikhoan.checked)
      .map((p) => p.ma_tai_khoan);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoataikhoan(item: any = null) {
    let selectedtaikhoan= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedtaikhoan.push(item);
      this.delete(selectedtaikhoan);
      return;
    }
    selectedtaikhoan = this.listFilterResult
      .filter((taikhoan) => taikhoan.checked)
      .map((p) => p.ma_tai_khoan);
    if (selectedtaikhoan.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedtaikhoan);
  }

  initModal(model: any,type = null): void {
    this.view.view(model, type);
  }

  changeStatus(event: any) {
    this.isLoading = true;
    let list = [];
    // tslint:disable-next-line: radix
    switch (parseInt(event)) {
      case -1:
        this.listFilterResult = [...this.danhsachtaikhoan];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachtaikhoan];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachtaikhoan];
        this.listFilterResult = list.filter(item => item.isActive === 0);
        this.isLoading = false;
        break;
      default:
        break;
    }
  }

  public delete(listid: any) {
    const modelDelete = {
      listId: listid
    };
    for (var i = 0; i < this.listFilterResult.length; i++) {
      if (this.listFilterResult[i].checked == true) {
        this.listFilterResult[i].checked = false;
      }
    }
    this.searchedKeyword = null;
    this.filterResultTemplist = this.listFilterResult;

    this.taikhoanService.delete(modelDelete).subscribe(
      (result) => {
        // status: 200
        this.ngOnInit();
        this.changeModel();
        if (result.error) {
          this.toastr.error(result.error);
        } else {
          this.toastr.success(result.success);
        }
        this.modalReference.dismiss();
      },
    );
  }

}
