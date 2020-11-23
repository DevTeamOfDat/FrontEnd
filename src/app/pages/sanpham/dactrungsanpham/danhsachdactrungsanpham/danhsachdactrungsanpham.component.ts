import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatdactrungsanphamComponent } from '../capnhatdactrungsanpham/capnhatdactrungsanpham.component';
import { dactrungsanphamModel } from 'app/model/san-pham/dactrungsanpham/dactrungsanpham-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoaiSanPhamService } from 'app/services/san-pham/loai-san-pham/loai-san-pham.service';
import { ToastrService } from 'ngx-toastr';
import { DactrungsanphamService } from 'app/services/san-pham/dactrungsanpham/dactrungsanpham.service';

@Component({
  selector: 'ngx-danhsachdactrungsanpham',
  templateUrl: './danhsachdactrungsanpham.component.html',
  styleUrls: ['./danhsachdactrungsanpham.component.scss']
})
export class DanhsachdactrungsanphamComponent implements OnInit {

  @ViewChild(CapnhatdactrungsanphamComponent) view!: CapnhatdactrungsanphamComponent;
  danhsachdactrungsanpham: Array<dactrungsanphamModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: dactrungsanphamModel[] = [];
  listFilterResult: dactrungsanphamModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private dactrungsanphamService: DactrungsanphamService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachloaisanpham();
  }


  

  fetchDanhsachloaisanpham(){
    this.isLoading =  true;
    this.dactrungsanphamService.getAll().subscribe(data => {
      this.danhsachdactrungsanpham = data.data;
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
      .filter((dactrungsanpham) => dactrungsanpham.checked)
      .map((p) => p.id);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoaid(item: any = null) {
    let selecteddactrungsanpham= [];
    if (item !== null && item !== undefined && item !== '') {
      selecteddactrungsanpham.push(item);
      this.delete(selecteddactrungsanpham);
      return;
    }
    selecteddactrungsanpham = this.listFilterResult
      .filter((dactungsanpham) => dactungsanpham.checked)
      .map((p) => p.id);
    if (selecteddactrungsanpham.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selecteddactrungsanpham);
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
        this.listFilterResult = [...this.danhsachdactrungsanpham];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachdactrungsanpham];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachdactrungsanpham];
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

    this.dactrungsanphamService.delete(modelDelete).subscribe(
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
