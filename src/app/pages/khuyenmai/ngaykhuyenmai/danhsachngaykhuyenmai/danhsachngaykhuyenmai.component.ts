import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatngaykhuyenmaiComponent } from '../capnhatngaykhuyenmai/capnhatngaykhuyenmai.component';
import { ngaykhuyenmaiModel } from 'app/model/khuyenmai/ngaykhuyenmai/ngaykhuyenmai-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgayKhuyenMaiService } from 'app/services/khuyen-mai/ngay-khuyen-mai/ngay-khuyen-mai.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachngaykhuyenmai',
  templateUrl: './danhsachngaykhuyenmai.component.html',
  styleUrls: ['./danhsachngaykhuyenmai.component.scss']
})
export class DanhsachngaykhuyenmaiComponent implements OnInit {

  @ViewChild(CapnhatngaykhuyenmaiComponent) view!: CapnhatngaykhuyenmaiComponent;
  danhsachngaykhuyenmai: Array<ngaykhuyenmaiModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: ngaykhuyenmaiModel[] = [];
  listFilterResult: ngaykhuyenmaiModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private ngaykhuyenmaiService: NgayKhuyenMaiService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachngaykhuyenmai();
  }


  

  fetchDanhsachngaykhuyenmai(){
    this.isLoading =  true;
    this.ngaykhuyenmaiService.getAll().subscribe(data => {
      this.danhsachngaykhuyenmai = data.data;
      this.listFilterResult = data.data;
      this.listFilterResult.forEach((x) => (x.checked = false));
      this.filterResultTemplist = this.listFilterResult;    },
    err => {
        this.isLoading = false;
      })
  }

  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.ngay_gio.toString();
        if (dc.includes(keyword) ) {
          filterResult.push(item);
        }
      });
      this.listFilterResult = filterResult;
    }
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
      .filter((ngaykhuyenmai) => ngaykhuyenmai.checked)
      .map((p) => p.ma_ngay_khuyen_mai);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoangaykhuyenmai(item: any = null) {
    let selectedngaykhuyenmai= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedngaykhuyenmai.push(item);
      this.delete(selectedngaykhuyenmai);
      return;
    }
    selectedngaykhuyenmai = this.listFilterResult
      .filter((thuonghieu) => thuonghieu.checked)
      .map((p) => p.ma_ngay_khuyen_mai);
    if (selectedngaykhuyenmai.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedngaykhuyenmai);
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
        this.listFilterResult = [...this.danhsachngaykhuyenmai];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachngaykhuyenmai];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachngaykhuyenmai];
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

    this.ngaykhuyenmaiService.delete(modelDelete).subscribe(
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
