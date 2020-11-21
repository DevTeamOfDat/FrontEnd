import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatchitietphieunhapComponent } from '../capnhatchitietphieunhap/capnhatchitietphieunhap.component';
import { chitietphieunhapModel } from 'app/model/donhang/chitietphieunhap/chitietphieunhap-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChitietphieunhapService } from 'app/services/donhang/chitietphieunhap/chitietphieunhap.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachchitietphieunhap',
  templateUrl: './danhsachchitietphieunhap.component.html',
  styleUrls: ['./danhsachchitietphieunhap.component.scss']
})
export class DanhsachchitietphieunhapComponent implements OnInit {

  @ViewChild(CapnhatchitietphieunhapComponent) view!: CapnhatchitietphieunhapComponent;
  danhsachchitietphieunhap: Array<chitietphieunhapModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  isSelected = true;
  page = 1;
  pageSize = 5;
  listFilterResult: chitietphieunhapModel[] = [];
  constructor(
    private modalService: NgbModal,
    private chitietphieunhapService: ChitietphieunhapService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhSachchitietphieunhap();
  }


  

  fetchDanhSachchitietphieunhap(){
    this.isLoading =  true;
    this.chitietphieunhapService.getAll().subscribe(data => {
      this.danhsachchitietphieunhap = data.data;
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
      .filter((chitietphieunhap) => chitietphieunhap.checked)
      .map((p) => p.id);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoachitietphieunhap(item: any = null) {
    let selectedchitietphieunhap= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedchitietphieunhap.push(item);
      this.delete(selectedchitietphieunhap);
      return;
    }
    selectedchitietphieunhap = this.listFilterResult
      .filter((chitietphieunhap) => chitietphieunhap.checked)
      .map((p) => p.id);
    if (selectedchitietphieunhap.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedchitietphieunhap);
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
        this.listFilterResult = [...this.danhsachchitietphieunhap];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachchitietphieunhap];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachchitietphieunhap];
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

    this.chitietphieunhapService.delete(modelDelete).subscribe(
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
