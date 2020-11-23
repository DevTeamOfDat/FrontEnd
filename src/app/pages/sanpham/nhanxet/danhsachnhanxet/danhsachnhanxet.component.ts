import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatnhanxetComponent } from '../capnhatnhanxet/capnhatnhanxet.component';
import { nhanxetModel } from 'app/model/san-pham/nhanxet/nhanxet-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NhanxetService } from 'app/services/san-pham/nhanxet/nhanxet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachnhanxet',
  templateUrl: './danhsachnhanxet.component.html',
  styleUrls: ['./danhsachnhanxet.component.scss']
})
export class DanhsachnhanxetComponent implements OnInit {

  @ViewChild(CapnhatnhanxetComponent) view!: CapnhatnhanxetComponent;
  danhsachnhanxet: Array<nhanxetModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: nhanxetModel[] = [];
  listFilterResult: nhanxetModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private nhanxetService: NhanxetService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachnhanxet();
  }


  

  fetchDanhsachnhanxet(){
    this.isLoading =  true;
    this.nhanxetService.getAll().subscribe(data => {
      this.danhsachnhanxet = data.data;
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
      .filter((nhanxet) => nhanxet.checked)
      .map((p) => p.ma_nhan_xet);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoanhanxet(item: any = null) {
    let selectednhanxet= [];
    if (item !== null && item !== undefined && item !== '') {
      selectednhanxet.push(item);
      this.delete(selectednhanxet);
      return;
    }
    selectednhanxet = this.listFilterResult
      .filter((thuonghieu) => thuonghieu.checked)
      .map((p) => p.ma_nhan_xet);
    if (selectednhanxet.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectednhanxet);
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
        this.listFilterResult = [...this.danhsachnhanxet];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachnhanxet];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachnhanxet];
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

    this.nhanxetService.delete(modelDelete).subscribe(
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
