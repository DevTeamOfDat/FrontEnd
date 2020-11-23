import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatthuonghieuComponent } from '../../thuonghieu/capnhatthuonghieu/capnhatthuonghieu.component';
import { CapnhatloaisanphamComponent } from '../capnhatloaisanpham/capnhatloaisanpham.component';
import { loaisanphamModel } from 'app/model/san-pham/loaisanpham/loaisanpham-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoaiSanPhamService } from 'app/services/san-pham/loai-san-pham/loai-san-pham.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachloaisanpham',
  templateUrl: './danhsachloaisanpham.component.html',
  styleUrls: ['./danhsachloaisanpham.component.scss']
})
export class DanhsachloaisanphamComponent implements OnInit {

  @ViewChild(CapnhatloaisanphamComponent) view!: CapnhatloaisanphamComponent;
  danhsachloaisanpham: Array<loaisanphamModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: loaisanphamModel[] = [];
  listFilterResult: loaisanphamModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private loaisanphamService: LoaiSanPhamService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachloaisanpham();
  }


  

  fetchDanhsachloaisanpham(){
    this.isLoading =  true;
    this.loaisanphamService.getAll().subscribe(data => {
      this.danhsachloaisanpham = data.data;
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
        var dc = item.ten_loai_san_pham.toLowerCase();
        var hot_line = item.mo_ta.toLowerCase();
        if (dc.includes(keyword) || hot_line.includes(keyword)) {
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
      .filter((loaisanpham) => loaisanpham.checked)
      .map((p) => p.ma_loai_san_pham);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoaloaisanpham(item: any = null) {
    let selectedloaisanpham= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedloaisanpham.push(item);
      this.delete(selectedloaisanpham);
      return;
    }
    selectedloaisanpham = this.listFilterResult
      .filter((thuonghieu) => thuonghieu.checked)
      .map((p) => p.ma_loai_san_pham);
    if (selectedloaisanpham.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedloaisanpham);
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
        this.listFilterResult = [...this.danhsachloaisanpham];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachloaisanpham];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachloaisanpham];
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

    this.loaisanphamService.delete(modelDelete).subscribe(
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
