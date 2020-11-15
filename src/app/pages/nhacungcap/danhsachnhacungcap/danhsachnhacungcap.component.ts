import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatnhacungcapComponent } from '../capnhatnhacungcap/capnhatnhacungcap.component';
import { nhacungcapModel } from 'app/model/nhacungcap/nhacungcap-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NhaCungCapService } from 'app/services/nha-cung-cap/nha-cung-cap.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachnhacungcap',
  templateUrl: './danhsachnhacungcap.component.html',
  styleUrls: ['./danhsachnhacungcap.component.scss']
})
export class DanhsachnhacungcapComponent implements OnInit {

  @ViewChild(CapnhatnhacungcapComponent) view!: CapnhatnhacungcapComponent;
  danhsachnhacungcap: Array<nhacungcapModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  listFilterResult: nhacungcapModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
    private nhacungcapService: NhaCungCapService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachnhacungcap();
  }


  

  fetchDanhsachnhacungcap(){
    this.isLoading =  true;
    this.nhacungcapService.getAll().subscribe(data => {
      this.danhsachnhacungcap = data.data;
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
      .filter((nhacungcap) => nhacungcap.checked)
      .map((p) => p.ma_nha_cung_cap);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoanhacungcap(item: any = null) {
    let selectednhacungcap= [];
    if (item !== null && item !== undefined && item !== '') {
      selectednhacungcap.push(item);
      this.delete(selectednhacungcap);
      return;
    }
    selectednhacungcap = this.listFilterResult
      .filter((nhacungcap) => nhacungcap.checked)
      .map((p) => p.ma_nha_cung_cap);
    if (selectednhacungcap.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectednhacungcap);
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
        this.listFilterResult = [...this.danhsachnhacungcap];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachnhacungcap];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachnhacungcap];
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

    this.nhacungcapService.delete(modelDelete).subscribe(
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
