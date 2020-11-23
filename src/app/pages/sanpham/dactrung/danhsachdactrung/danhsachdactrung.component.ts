import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatdactrungComponent } from '../capnhatdactrung/capnhatdactrung.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import {ToastrService} from "ngx-toastr";
import { dactrungModel } from 'app/model/san-pham/dac-trung/dactrung-model';
import { DactrungService } from 'app/services/san-pham/dactrung/dactrung.service';


@Component({
  selector: 'ngx-danhsachdactrung',
  templateUrl: './danhsachdactrung.component.html',
  styleUrls: ['./danhsachdactrung.component.scss']
})
export class DanhsachdactrungComponent implements OnInit {

  @ViewChild(CapnhatdactrungComponent) view!: CapnhatdactrungComponent;
  danhsachdactrung: Array<dactrungModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  searchedKeyword: string;
  filterResultTemplist: dactrungModel[] = [];
  isSelected = true;
  page = 1;
  pageSize = 5;
  listFilterResult: dactrungModel[] = [];
  constructor(
    private modalService: NgbModal,
    private dactrungService: DactrungService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhSachDacTrung();
  }


  

  fetchDanhSachDacTrung(){
    this.isLoading =  true;
    this.dactrungService.getAll().subscribe(data => {
      this.danhsachdactrung = data.data;
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
      .filter((dactrung) => dactrung.checked)
      .map((p) => p.loai_dac_trung);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoadactrung(item: any = null) {
    let selecteddactrung= [];
    if (item !== null && item !== undefined && item !== '') {
      selecteddactrung.push(item);
      this.delete(selecteddactrung);
      return;
    }
    selecteddactrung = this.listFilterResult
      .filter((dactrung) => dactrung.checked)
      .map((p) => p.loai_dac_trung);
    if (selecteddactrung.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selecteddactrung);
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
        this.listFilterResult = [...this.danhsachdactrung];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachdactrung];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachdactrung];
        this.listFilterResult = list.filter(item => item.isActive === 0);
        this.isLoading = false;
        break;
      default:
        break;
    }
  }
  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.ten_dac_trung.toLowerCase();
        var hot_line = item.mo_ta.toLowerCase();
        if (dc.includes(keyword) || hot_line.includes(keyword) ) {
          filterResult.push(item);
        }
      });
      this.listFilterResult = filterResult;
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

    this.dactrungService.delete(modelDelete).subscribe(
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


