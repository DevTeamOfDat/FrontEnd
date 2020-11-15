import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhattrangthaiComponent } from '../capnhattrangthai/capnhattrangthai.component';
import { trangthaiModel } from 'app/model/donhang/trangthai/trangthai-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TrangthaiService } from 'app/services/donhang/trangthai/trangthai.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachtrangthai',
  templateUrl: './danhsachtrangthai.component.html',
  styleUrls: ['./danhsachtrangthai.component.scss']
})
export class DanhsachtrangthaiComponent implements OnInit {

  @ViewChild(CapnhattrangthaiComponent) view!: CapnhattrangthaiComponent;
  danhsachtrangthai: Array<trangthaiModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  isSelected = true;
  page = 1;
  pageSize = 5;
  listFilterResult: trangthaiModel[] = [];
  constructor(
    private modalService: NgbModal,
    private trangthaiService: TrangthaiService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhSachtrangthai();
  }


  

  fetchDanhSachtrangthai(){
    this.isLoading =  true;
    this.trangthaiService.getAll().subscribe(data => {
      this.danhsachtrangthai = data.data;
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
      .filter((trangthai) => trangthai.checked)
      .map((p) => p.id);
      console.log(selectedHometowns);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoatrangthai(item: any = null) {
    let selectedtrangthai= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedtrangthai.push(item);
      this.delete(selectedtrangthai);
      return;
    }
    selectedtrangthai = this.listFilterResult
      .filter((trangthai) => trangthai.checked)
      .map((p) => p.id);
    if (selectedtrangthai.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedtrangthai);
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
        this.listFilterResult = [...this.danhsachtrangthai];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachtrangthai];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachtrangthai];
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
    this.trangthaiService.delete(modelDelete).subscribe(
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
