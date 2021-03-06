import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatloaidonComponent } from '../capnhatloaidon/capnhatloaidon.component';
import { loaidonModel } from 'app/model/donhang/loaidon/loaidon-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoaidonService } from 'app/services/donhang/loaidon/loaidon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachloaidon',
  templateUrl: './danhsachloaidon.component.html',
  styleUrls: ['./danhsachloaidon.component.scss']
})
export class DanhsachloaidonComponent implements OnInit {

  @ViewChild(CapnhatloaidonComponent) view!: CapnhatloaidonComponent;
  danhsachloaidon: Array<loaidonModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  filterResultTemplist: loaidonModel[] = [];
  isSelected = true;
  page = 1;
  pageSize = 5;
  listFilterResult: loaidonModel[] = [];
  constructor(
    private modalService: NgbModal,
    private loaidonService: LoaidonService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhSachloaidon();
  }


  

  fetchDanhSachloaidon(){
    this.isLoading =  true;
    this.loaidonService.getAll().subscribe(data => {
      this.danhsachloaidon = data.data;
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
      .filter((loaidon) => loaidon.checked)
      .map((p) => p.id);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoaloaidon(item: any = null) {
    let selectedloaidon= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedloaidon.push(item);
      this.delete(selectedloaidon);
      return;
    }
    selectedloaidon = this.listFilterResult
      .filter((loaidon) => loaidon.checked)
      .map((p) => p.id);
    if (selectedloaidon.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedloaidon);
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
        this.listFilterResult = [...this.danhsachloaidon];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachloaidon];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachloaidon];
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

    this.loaidonService.delete(modelDelete).subscribe(
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
