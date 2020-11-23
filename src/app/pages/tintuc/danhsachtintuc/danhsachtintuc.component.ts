import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhattintucComponent } from '../capnhattintuc/capnhattintuc.component';
import { tintucModel } from 'app/model/tintuc/tintuc-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TintucService } from 'app/services/tintuc/tintuc.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-danhsachtintuc',
  templateUrl: './danhsachtintuc.component.html',
  styleUrls: ['./danhsachtintuc.component.scss']
})
export class DanhsachtintucComponent implements OnInit {

  @ViewChild(CapnhattintucComponent) view!: CapnhattintucComponent;
  danhsachtintuc: Array<tintucModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  filterResultTemplist: tintucModel[] = [];
  listFilterResult: tintucModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(
    private modalService: NgbModal,
     private tintucService: TintucService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachtintuc();
  }


  

  fetchDanhsachtintuc(){
    this.isLoading =  true;
    this.tintucService.getAll().subscribe(data => {
      this.danhsachtintuc = data.data;
      this.listFilterResult = data.data;
      this.listFilterResult.forEach((x) => (x.checked = false));
      this.filterResultTemplist = this.listFilterResult;    },
    err => {
        this.isLoading = false;
      })
  }
  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.tieu_de.toLowerCase();
        var hot_line = item.url.toLowerCase();

        if (dc.includes(keyword) || hot_line.includes(keyword) ) {
          filterResult.push(item);
        }
      });
      this.listFilterResult = filterResult;
    }
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
      .filter((tintuc) => tintuc.checked)
      .map((p) => p.id);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoatintuc(item: any = null) {
    let selectedtintuc= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedtintuc.push(item);
      this.delete(selectedtintuc);
      return;
    }
    selectedtintuc = this.listFilterResult
      .filter((tintuc) => tintuc.checked)
      .map((p) => p.id);
    if (selectedtintuc.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedtintuc);
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
        this.listFilterResult = [...this.danhsachtintuc];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachtintuc];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachtintuc];
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

    this.tintucService.delete(modelDelete).subscribe(
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
