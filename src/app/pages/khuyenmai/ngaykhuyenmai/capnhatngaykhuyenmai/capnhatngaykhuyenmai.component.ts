import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ngaykhuyenmaiModel } from 'app/model/khuyenmai/ngaykhuyenmai/ngaykhuyenmai-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgayKhuyenMaiService } from 'app/services/khuyen-mai/ngay-khuyen-mai/ngay-khuyen-mai.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-capnhatngaykhuyenmai',
  templateUrl: './capnhatngaykhuyenmai.component.html',
  styleUrls: ['./capnhatngaykhuyenmai.component.scss']
})
export class CapnhatngaykhuyenmaiComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachngaykhuyenmai: Array<ngaykhuyenmaiModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  checkButton = false;
  closeResult: String;
  modalReference!: any;
  formGroup: FormGroup;
  isAdd = false;
  isEdit = false;
  isInfo = false;
  submitted = false;
  isLoading=false;
  title = '';
  type: any;
  model: ngaykhuyenmaiModel;
  arrCheck = [];
  update_ma_ngay_khuyen_mai:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private ngaykhuyenmaiService: NgayKhuyenMaiService,
    private datePipe: DatePipe) {
    }

  ngOnInit(): void {
    this.submitted = false;
    
    
  }
  updateFormType(type: any) {
    switch (type) {
      case 'add':
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        this.title = `Thêm mới thông tin ngày khuyến mãi`;
        this.update_ma_ngay_khuyen_mai = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin ngày khuyến mãi`;
        this.update_ma_ngay_khuyen_mai = this.model.ma_ngay_khuyen_mai;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin ngày khuyến mãi`;
        this.update_ma_ngay_khuyen_mai = this.model.ma_ngay_khuyen_mai;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: ngaykhuyenmaiModel, type = null): void {
    this.arrCheck = this.danhsachngaykhuyenmai;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_ngay_khuyen_mai === null || model.ma_ngay_khuyen_mai === undefined) {
      this.formGroup = this.fb.group({
        ma_ngay_khuyen_mai: [ null, [Validators.required]],
        ngay_gio: [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ma_ngay_khuyen_mai:  [{value: this.model.ma_ngay_khuyen_mai, disabled: this.isInfo}, [Validators.required]],
        ngay_gio: [{value: this.datePipe.transform(this.model.ngay_gio,"yyyy/mm/dd"), disabled: this.isInfo}, [Validators.required]],

      });

      console.log(this.formGroup);
    }
  }


  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'md',
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

  save() {
    let check = false;
    let ngaykhuyenmai: ngaykhuyenmaiModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      ngaykhuyenmai = {
        ma_ngay_khuyen_mai: this.formGroup.get('ma_ngay_khuyen_mai')?.value,
        ngay_gio: this.formGroup.get('ngay_gio')?.value,
      };
    } else {
      ngaykhuyenmai = {
        ma_ngay_khuyen_mai: this.formGroup.get('ma_ngay_khuyen_mai')?.value,
        ngay_gio: this.formGroup.get('ngay_gio')?.value,
      };
    }
    console.log(this.arrCheck.length);
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_ngay_khuyen_mai === ngaykhuyenmai.ma_ngay_khuyen_mai) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã thương hiệu đã tồn tại');
        return;
      }
      this.ngaykhuyenmaiService.create(ngaykhuyenmai).subscribe(res => {
          this.closeModalReloadData();
          console.log("Thêm mới thành công");
          this.toastr.success('Thêm mới thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error(err);
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
    if (this.isEdit) {
      this.ngaykhuyenmaiService.update(ngaykhuyenmai.ma_ngay_khuyen_mai, ngaykhuyenmai).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Sửa thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error(err);
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }


}
