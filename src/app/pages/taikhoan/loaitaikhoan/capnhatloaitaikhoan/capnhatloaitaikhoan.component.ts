import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { loaitaikhoanModel } from 'app/model/taikhoan/loaitaikhoan/loaitaikhoan-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoaitaikhoanService } from 'app/services/taikhoan/loaitaikhoan/loaitaikhoan.service';

@Component({
  selector: 'ngx-capnhatloaitaikhoan',
  templateUrl: './capnhatloaitaikhoan.component.html',
  styleUrls: ['./capnhatloaitaikhoan.component.scss']
})
export class CapnhatloaitaikhoanComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachloaitaikhoan: Array<loaitaikhoanModel>;
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
  model: loaitaikhoanModel;
  arrCheck = [];
  update_id:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loaitaikhoanService: LoaitaikhoanService,) {
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
        this.title = `Thêm mới thông tin loại tài khoản`;
        // this.update_id= this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin loại tài khoản`;
        // this.update_id = this.model.id;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin loại tài khoản`;
        // this.update_id = this.model.id;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: loaitaikhoanModel, type = null): void {
    this.arrCheck = this.danhsachloaitaikhoan;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.id === null || model.id === undefined) {
      this.formGroup = this.fb.group({
        gia_tri: [ null, [Validators.required]],
        mo_ta: [null,  [Validators.required]],
        
      });
      console.log("1");
    } else {
      this.formGroup = this.fb.group({
        gia_tri: [{value: this.model.gia_tri, disabled: this.isInfo}, [Validators.required]],
        mo_ta: [{value: this.model.mo_ta, disabled: this.isInfo}, [Validators.required]],

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
    let loaitaikhoan: loaitaikhoanModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      loaitaikhoan = {
        id: this.model.id,
        gia_tri: this.formGroup.get('gia_tri')?.value,
        mo_ta: this.formGroup.get('mo_ta').value,
      };
    } else {
      loaitaikhoan = {
        id: this.model.id,
        gia_tri: this.formGroup.get('gia_tri')?.value,
        mo_ta: this.formGroup.get('mo_ta').value,
      };
    }
    console.log(this.arrCheck.length);
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === loaitaikhoan.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('ID đã tồn tại');
        return;
      }
      console.log(loaitaikhoan);
      this.loaitaikhoanService.create(loaitaikhoan).subscribe(res => {
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
      this.loaitaikhoanService.update(loaitaikhoan.id, loaitaikhoan).subscribe(res => {
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
