import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { loaisanphamModel } from 'app/model/san-pham/loaisanpham/loaisanpham-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoaiSanPhamService } from 'app/services/san-pham/loai-san-pham/loai-san-pham.service';

@Component({
  selector: 'ngx-capnhatloaisanpham',
  templateUrl: './capnhatloaisanpham.component.html',
  styleUrls: ['./capnhatloaisanpham.component.scss']
})
export class CapnhatloaisanphamComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachloaisanpham: Array<loaisanphamModel>;
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
  model: loaisanphamModel;
  arrCheck = [];
  update_ma_loai_san_pham: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loaisanphamService: LoaiSanPhamService,) {
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
        this.title = `Thêm mới thông tin loại sản phẩm`;
        // this.update_ma_loai_san_pham = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin loại sản phẩm`;
        // this.update_ma_loai_san_pham = this.model.ma_loai_san_pham;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin loại sản phẩm`;
        // this.update_ma_loai_san_pham = this.model.ma_loai_san_pham;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: loaisanphamModel, type = null): void {
    this.arrCheck = this.danhsachloaisanpham;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_loai_san_pham === null || model.ma_loai_san_pham === undefined) {
      this.formGroup = this.fb.group({
        ten_loai_san_pham: [ null, [Validators.required]],
        mo_ta : [ null],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ten_loai_san_pham: [{value: this.model.ten_loai_san_pham, disabled: this.isInfo}, [Validators.required]],
        mo_ta : [{value: this.model.mo_ta, disabled: this.isInfo}],
      });
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
    let loaisanpham: loaisanphamModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      loaisanpham = {
        ma_loai_san_pham: this.model.ma_loai_san_pham,
        ten_loai_san_pham: this.formGroup.get('ten_loai_san_pham')?.value,
        mo_ta : this.formGroup.get('mo_ta')?.value,
      };
    } else {
      loaisanpham = {
        ten_loai_san_pham: this.formGroup.get('ten_loai_san_pham')?.value,
        mo_ta : this.formGroup.get('mo_ta')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_loai_san_pham === loaisanpham.ma_loai_san_pham) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã loại sản phẩm đã tồn tại');
        return;
      }
      this.loaisanphamService.create(loaisanpham).subscribe(res => {
        this.closeModalReloadData();
        this.toastr.success(res.success);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
    if (this.isEdit) {
      this.loaisanphamService.update(loaisanpham.ma_loai_san_pham, loaisanpham).subscribe(res => {
        this.closeModalReloadData();
        this.toastr.success(res.success);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }


}
