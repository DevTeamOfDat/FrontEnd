import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatkhuyenmaisanphamComponent } from '../capnhatkhuyenmaisanpham/capnhatkhuyenmaisanpham.component';
import { khuyenmaisanphamModel } from 'app/model/khuyenmai/khuyenmaisanpham/khuyenmaisanpham-modle';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgayKhuyenMaiService } from 'app/services/khuyen-mai/ngay-khuyen-mai/ngay-khuyen-mai.service';
import { ToastrService } from 'ngx-toastr';
import { KhuyenmaisanphamService } from 'app/services/khuyen-mai/khuyenmaisanpham/khuyenmaisanpham.service';

@Component({
  selector: 'ngx-danhsachkhuyenmaisanpham',
  templateUrl: './danhsachkhuyenmaisanpham.component.html',
  styleUrls: ['./danhsachkhuyenmaisanpham.component.scss']
})
export class DanhsachkhuyenmaisanphamComponent implements OnInit {

  @ViewChild(CapnhatkhuyenmaisanphamComponent) view!: CapnhatkhuyenmaisanphamComponent;
  danhsachkhuyenmaisanpham: Array<khuyenmaisanphamModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  listFilterResult: khuyenmaisanphamModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private khuyenmaisanphamService: KhuyenmaisanphamService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachkhuyenmaisanpham();
  }


  

  fetchDanhsachkhuyenmaisanpham(){
    this.isLoading =  true;
    this.khuyenmaisanphamService.getAll().subscribe(data => {
      this.danhsachkhuyenmaisanpham = data;
      this.listFilterResult = data;
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
      .filter((khuyenmaisanpham) => khuyenmaisanpham.checked)
      .map((p) => p.id);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoakhuyenmaisanpham(item: any = null) {
    let selectedkhuyenmaisanpham= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedkhuyenmaisanpham.push(item);
      this.delete(selectedkhuyenmaisanpham);
      return;
    }
    selectedkhuyenmaisanpham = this.listFilterResult
      .filter((thuonghieu) => thuonghieu.checked)
      .map((p) => p.ma_ngay_khuyen_mai);
    if (selectedkhuyenmaisanpham.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedkhuyenmaisanpham);
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
        this.listFilterResult = [...this.danhsachkhuyenmaisanpham];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachkhuyenmaisanpham];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachkhuyenmaisanpham];
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

    this.khuyenmaisanphamService.delete(modelDelete).subscribe(
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
