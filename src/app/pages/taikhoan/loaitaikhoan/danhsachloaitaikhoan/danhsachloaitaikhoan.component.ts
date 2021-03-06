import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatloaitaikhoanComponent } from '../capnhatloaitaikhoan/capnhatloaitaikhoan.component';
import { loaitaikhoanModel } from 'app/model/taikhoan/loaitaikhoan/loaitaikhoan-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoaitaikhoanService } from 'app/services/taikhoan/loaitaikhoan/loaitaikhoan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachloaitaikhoan',
  templateUrl: './danhsachloaitaikhoan.component.html',
  styleUrls: ['./danhsachloaitaikhoan.component.scss']
})
export class DanhsachloaitaikhoanComponent implements OnInit {

  @ViewChild(CapnhatloaitaikhoanComponent) view!: CapnhatloaitaikhoanComponent;
  danhsachloaitaikhoan: Array<loaitaikhoanModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: loaitaikhoanModel[] = [];
  listFilterResult: loaitaikhoanModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private loaitaikhoanService: LoaitaikhoanService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachloaitaikhoan();
  }


  

  fetchDanhsachloaitaikhoan(){
    this.isLoading =  true;
    this.loaitaikhoanService.getAll().subscribe(data => {
      this.danhsachloaitaikhoan = data.data;
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
      .filter((loaitaikhoan) => loaitaikhoan.checked)
      .map((p) => p);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoaloaitaikhoan(item: any = null) {
    let selectedloaitaikhoan= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedloaitaikhoan.push(item);
      this.delete(selectedloaitaikhoan);
      return;
    }
    selectedloaitaikhoan = this.listFilterResult
      .filter((loaitaikhoan) => loaitaikhoan.checked)
      .map((p) => p.id);
    if (selectedloaitaikhoan.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedloaitaikhoan);
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
        this.listFilterResult = [...this.danhsachloaitaikhoan];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachloaitaikhoan];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachloaitaikhoan];
        this.listFilterResult = list.filter(item => item.isActive === 0);
        this.isLoading = false;
        break;
      default:
        break;
    }
  }

  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.gia_tri.toLowerCase();
        var hot_line = item.mo_ta.toLowerCase();
        if (dc.includes(keyword) || hot_line.includes(keyword) ) {
          filterResult.push(item);
        }
      });
      this.listFilterResult = filterResult;
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

    this.loaitaikhoanService.delete(modelDelete).subscribe(
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
