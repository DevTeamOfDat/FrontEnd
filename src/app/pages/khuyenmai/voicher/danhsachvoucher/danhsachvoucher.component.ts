import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatvoucherComponent } from '../capnhatvoucher/capnhatvoucher.component';
import { voucherModel } from 'app/model/khuyenmai/voucher/voicher-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VoucherService } from 'app/services/khuyen-mai/voucher/voucher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachvoucher',
  templateUrl: './danhsachvoucher.component.html',
  styleUrls: ['./danhsachvoucher.component.scss']
})
export class DanhsachvoucherComponent implements OnInit {

  @ViewChild(CapnhatvoucherComponent) view!: CapnhatvoucherComponent;
  danhsachvoucher: Array<voucherModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: voucherModel[] = [];
  listFilterResult: voucherModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private voucherService: VoucherService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachvoucher();
  }

  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.muc_voucher.toString();
        var hot_line = item.ten_khach_hang.toLowerCase();
        
        if (dc.includes(keyword) || hot_line.includes(keyword) ) {
          filterResult.push(item);
        }
      });
      this.listFilterResult = filterResult;
    }
  }


  

  fetchDanhsachvoucher(){
    this.isLoading =  true;
    this.voucherService.getAll().subscribe(data => {
      this.danhsachvoucher = data.data;
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
      .filter((voucher) => voucher.checked)
      .map((p) => p.ma_voucher);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoavoucher(item: any = null) {
    let selectedvoucher= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedvoucher.push(item);
      this.delete(selectedvoucher);
      return;
    }
    selectedvoucher = this.listFilterResult
      .filter((voucher) => voucher.checked)
      .map((p) => p.ma_voucher);
    if (selectedvoucher.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedvoucher);
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
        this.listFilterResult = [...this.danhsachvoucher];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachvoucher];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachvoucher];
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

    this.voucherService.delete(modelDelete).subscribe(
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
