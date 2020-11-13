import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatthuonghieuComponent } from '../capnhatthuonghieu/capnhatthuonghieu.component';
import { thuonghieuModel } from 'app/model/san-pham/thuong-hieu/thuonghieu-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ThuongHieuService } from 'app/services/san-pham/thuong-hieu/thuong-hieu.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'danhsachthuonghieu',
  templateUrl: './danhsachthuonghieu.component.html',
  styleUrls: ['./danhsachthuonghieu.component.css']
})
export class DanhsachthuonghieuComponent implements OnInit {

  @ViewChild(CapnhatthuonghieuComponent) view!: CapnhatthuonghieuComponent;
  danhsachthuonghieu: Array<thuonghieuModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  listFilterResult: thuonghieuModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private thuonghieuService: ThuongHieuService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachthuonghieu();
  }


  

  fetchDanhsachthuonghieu(){
    this.isLoading =  true;
    this.thuonghieuService.getAll().subscribe(data => {
      this.danhsachthuonghieu = data;
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
      .filter((thuonghieu) => thuonghieu.checked)
      .map((p) => p.ma_thuong_hieu);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoathuonghieu(item: any = null) {
    let selectedthuonghieu= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedthuonghieu.push(item);
      this.delete(selectedthuonghieu);
      return;
    }
    selectedthuonghieu = this.listFilterResult
      .filter((thuonghieu) => thuonghieu.checked)
      .map((p) => p.ma_thuong_hieu);
    if (selectedthuonghieu.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedthuonghieu);
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
        this.listFilterResult = [...this.danhsachthuonghieu];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachthuonghieu];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachthuonghieu];
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

    this.thuonghieuService.delete(modelDelete).subscribe(
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
