import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhathinhanhsanphamComponent } from '../capnhathinhanhsanpham/capnhathinhanhsanpham.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { hinhanhsanphamModel } from 'app/model/san-pham/hinhanhsanpham/hinhanhsanpham-model';
import { HinhanhsanphamService } from 'app/services/san-pham/hinhanhsanpham/hinhanhsanpham.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachhinhanhsanpham',
  templateUrl: './danhsachhinhanhsanpham.component.html',
  styleUrls: ['./danhsachhinhanhsanpham.component.scss']
})
export class DanhsachhinhanhsanphamComponent implements OnInit {

  @ViewChild(CapnhathinhanhsanphamComponent) view!: CapnhathinhanhsanphamComponent;
  danhsachhinhanhsanpham: Array<hinhanhsanphamModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: hinhanhsanphamModel[] = [];
  listFilterResult: hinhanhsanphamModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private hinhanhsanphamService: HinhanhsanphamService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachhinhanhsanpham();
  }


  

  fetchDanhsachhinhanhsanpham(){
    this.isLoading =  true;
    this.hinhanhsanphamService.getAll().subscribe(data => {
      this.danhsachhinhanhsanpham = data.data;
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

  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.ma_san_pham.toString();
        var hot_line = item.ten_san_pham.toLowerCase();
        if (dc.includes(keyword) || hot_line.includes(keyword) ) {
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
      .filter((hinhanhsanpham) => hinhanhsanpham.checked)
      .map((p) => p.id);
      console.log(selectedHometowns);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoahinhanhsanpham(item: any = null) {
    let selectedhinhanhsanpham= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedhinhanhsanpham.push(item);
      this.delete(selectedhinhanhsanpham);
      return;
    }
    selectedhinhanhsanpham = this.listFilterResult
      .filter((hinhanhsanpham) => hinhanhsanpham.checked)
      .map((p) => p.id);
    if (selectedhinhanhsanpham.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedhinhanhsanpham);
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
        this.listFilterResult = [...this.danhsachhinhanhsanpham];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachhinhanhsanpham];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachhinhanhsanpham];
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

    this.hinhanhsanphamService.delete(modelDelete).subscribe(
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
