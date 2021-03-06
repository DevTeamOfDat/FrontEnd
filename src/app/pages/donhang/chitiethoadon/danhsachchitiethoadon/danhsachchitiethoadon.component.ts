import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatchitiethoadonComponent } from '../capnhatchitiethoadon/capnhatchitiethoadon.component';
import { chitiethoadonModel } from 'app/model/donhang/chitiethoadon/chitiethoadon-models';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChitiethoadonService } from 'app/services/donhang/chitiethoadon/chitiethoadon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachchitiethoadon',
  templateUrl: './danhsachchitiethoadon.component.html',
  styleUrls: ['./danhsachchitiethoadon.component.scss']
})
export class DanhsachchitiethoadonComponent implements OnInit {

  @ViewChild(CapnhatchitiethoadonComponent) view!: CapnhatchitiethoadonComponent;
  danhsachchitiethoadon: Array<chitiethoadonModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  filterResultTemplist: chitiethoadonModel[] = [];
  isSelected = true;
  page = 1;
  pageSize = 5;
  listFilterResult: chitiethoadonModel[] = [];
  constructor(
    private modalService: NgbModal,
    private chitiethoadonService: ChitiethoadonService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhSachchitiethoadon();
  }


  

  fetchDanhSachchitiethoadon(){
    this.isLoading =  true;
    this.chitiethoadonService.getAll().subscribe(data => {
      this.danhsachchitiethoadon = data.data;
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

  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.ten_san_pham.toLowerCase();
        var hot_line = item.ten_dac_trunng.toLowerCase();
        var ten = item.gia_ban.toString();
        var ten1 = item.so_luong.toString();
        if (dc.includes(keyword) || hot_line.includes(keyword) || ten.includes(keyword) || ten1.includes(keyword) ) {
          filterResult.push(item);
        }
      });
      this.listFilterResult = filterResult;
    }
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
      .filter((chitiethoadon) => chitiethoadon.checked)
      .map((p) => p.id);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoachitiethoadon(item: any = null) {
    let selectedchitiethoadon= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedchitiethoadon.push(item);
      this.delete(selectedchitiethoadon);
      return;
    }
    selectedchitiethoadon = this.listFilterResult
      .filter((chitiethoadon) => chitiethoadon.checked)
      .map((p) => p.id);
    if (selectedchitiethoadon.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedchitiethoadon);
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
        this.listFilterResult = [...this.danhsachchitiethoadon];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachchitiethoadon];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachchitiethoadon];
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

    this.chitiethoadonService.delete(modelDelete).subscribe(
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
