import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhathoadonComponent } from '../capnhathoadon/capnhathoadon.component';
import { hoadonModel } from 'app/model/donhang/hoadon/hoadon-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HoadonService } from 'app/services/donhang/hoadon/hoadon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachhoadon',
  templateUrl: './danhsachhoadon.component.html',
  styleUrls: ['./danhsachhoadon.component.scss']
})
export class DanhsachhoadonComponent implements OnInit {

  @ViewChild(CapnhathoadonComponent) view!: CapnhathoadonComponent;
  danhsachhoadon: Array<hoadonModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  filterResultTemplist: hoadonModel[] = [];
  isSelected = true;
  page = 1;
  pageSize = 5;
  listFilterResult: hoadonModel[] = [];
  constructor(
    private modalService: NgbModal,
    private hoadonService: HoadonService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhSachhoadon();
  }


  

  fetchDanhSachhoadon(){
    this.isLoading =  true;
    this.hoadonService.getAll().subscribe(data => {
      this.danhsachhoadon = data.data;
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
        var dc = item.ma_hoa_don.toString();
        var hot_line = item.ten_nhan_vien.toLowerCase();
        var ten = item.ten_khach_hang.toLowerCase();
        var ten1 = item.ngay_lap.toString();
        var ten2 = item.thanh_tien.toString();
        if (dc.includes(keyword) || hot_line.includes(keyword) || ten.includes(keyword) || ten1.includes(keyword) || ten2.includes(keyword)) {
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
      .filter((hoadon) => hoadon.checked)
      .map((p) => p.ma_hoa_don);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoahoadon(item: any = null) {
    let selectedhoadon= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedhoadon.push(item);
      this.delete(selectedhoadon);
      return;
    }
    selectedhoadon = this.listFilterResult
      .filter((hoadon) => hoadon.checked)
      .map((p) => p.ma_hoa_don);
    if (selectedhoadon.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedhoadon);
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
        this.listFilterResult = [...this.danhsachhoadon];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachhoadon];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachhoadon];
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

    this.hoadonService.delete(modelDelete).subscribe(
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
