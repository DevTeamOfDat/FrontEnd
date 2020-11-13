import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatphieunhapComponent } from '../capnhatphieunhap/capnhatphieunhap.component';
import { phieunhapModel } from 'app/model/donhang/phieunhap/phieunhap-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PhieunhapService } from 'app/services/donhang/phieunhap/phieunhap.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachphieunhap',
  templateUrl: './danhsachphieunhap.component.html',
  styleUrls: ['./danhsachphieunhap.component.scss']
})
export class DanhsachphieunhapComponent implements OnInit {

  @ViewChild(CapnhatphieunhapComponent) view!: CapnhatphieunhapComponent;
  danhsachphieunhap: Array<phieunhapModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  isSelected = true;
  page = 1;
  pageSize = 5;
  listFilterResult: phieunhapModel[] = [];
  constructor(
    private modalService: NgbModal,
    private phieunhapService: PhieunhapService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhSachphieunhap();
  }


  

  fetchDanhSachphieunhap(){
    this.isLoading =  true;
    this.phieunhapService.getAll().subscribe(data => {
      this.danhsachphieunhap = data;
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
      .filter((phieunhap) => phieunhap.checked)
      .map((p) => p.ma_phieu_nhap);
      console.log(selectedHometowns);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoaphieunhap(item: any = null) {
    let selectedphieunhap= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedphieunhap.push(item);
      this.delete(selectedphieunhap);
      return;
    }
    selectedphieunhap = this.listFilterResult
      .filter((phieunhap) => phieunhap.checked)
      .map((p) => p.ma_phieu_nhap);
    if (selectedphieunhap.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedphieunhap);
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
        this.listFilterResult = [...this.danhsachphieunhap];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachphieunhap];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachphieunhap];
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

    console.log(modelDelete);
    this.phieunhapService.delete(modelDelete).subscribe(
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
