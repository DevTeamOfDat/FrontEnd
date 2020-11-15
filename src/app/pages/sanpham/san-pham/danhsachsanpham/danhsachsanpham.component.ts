import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatsanphamComponent } from '../capnhatsanpham/capnhatsanpham.component';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachsanpham',
  templateUrl: './danhsachsanpham.component.html',
  styleUrls: ['./danhsachsanpham.component.scss']
})
export class DanhsachsanphamComponent implements OnInit {

  @ViewChild(CapnhatsanphamComponent) view!: CapnhatsanphamComponent;
  danhsachsanpham: Array<sanphamModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  listFilterResult: sanphamModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private sanphamService: SanPhamService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachsanpham();
  }


  

  fetchDanhsachsanpham(){
    this.isLoading =  true;
    this.sanphamService.getAll().subscribe(data => {
      this.danhsachsanpham = data.data;
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
      .filter((sanpham) => sanpham.checked)
      .map((p) => p.ma_san_pham);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoasanpham(item: any = null) {
    let selectedsanpham= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedsanpham.push(item);
      this.delete(selectedsanpham);
      return;
    }
    selectedsanpham = this.listFilterResult
      .filter((sanpham) => sanpham.checked)
      .map((p) => p.ma_san_pham);
    if (selectedsanpham.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedsanpham);
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
        this.listFilterResult = [...this.danhsachsanpham];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachsanpham];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachsanpham];
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

    this.sanphamService.delete(modelDelete).subscribe(
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
