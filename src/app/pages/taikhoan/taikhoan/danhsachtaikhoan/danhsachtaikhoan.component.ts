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
    },
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

    this.taikhoanService.delete(modelDelete).subscribe(
      (result) => {
        // status: 200
        this.ngOnInit();
        this.changeModel();
        this.toastr.success('Xóa thành công');
        this.modalReference.dismiss();
      },
      (error) => {
        this.toastr.error('Xóa thất bại');
      }
    );
  }

}
