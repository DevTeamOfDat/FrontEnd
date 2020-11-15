import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { thuonghieuModel } from 'app/model/san-pham/thuong-hieu/thuonghieu-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ThuongHieuService } from 'app/services/san-pham/thuong-hieu/thuong-hieu.service';

@Component({
  selector: 'ngx-capnhatthuonghieu',
  templateUrl: './capnhatthuonghieu.component.html',
  styleUrls: ['./capnhatthuonghieu.component.css']
})
export class CapnhatthuonghieuComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachthuonghieu: Array<thuonghieuModel>;
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
  model: thuonghieuModel;
  arrCheck = [];
  update_ma_thuong_hieu:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private thuonghieuService: ThuongHieuService,) {
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
        this.title = `Thêm mới thông tin thương hiệu`;
        // this.update_ma_thuong_hieu = this.arrCheck.length+1;
        console.log(this.arrCheck);
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin thương hiệu`;
        // this.update_ma_thuong_hieu = this.model.ma_thuong_hieu;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin thương hiệu`;
        // this.update_ma_thuong_hieu = this.model.ma_thuong_hieu;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: thuonghieuModel, type = null): void {
    this.arrCheck = this.danhsachthuonghieu;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_thuong_hieu === null || model.ma_thuong_hieu === undefined) {
      this.formGroup = this.fb.group({
        ten_thuong_hieu: [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ten_thuong_hieu: [{value: this.model.ten_thuong_hieu, disabled: this.isInfo}, [Validators.required]],

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
    let thuonghieu: thuonghieuModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      thuonghieu = {
        ma_thuong_hieu: this.model.ma_thuong_hieu,
        ten_thuong_hieu: this.formGroup.get('ten_thuong_hieu')?.value,
      };
    } else {
      thuonghieu = {
        ma_thuong_hieu: this.model.ma_thuong_hieu,
        ten_thuong_hieu: this.formGroup.get('ten_thuong_hieu')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_thuong_hieu === thuonghieu.ma_thuong_hieu) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã thương hiệu đã tồn tại');
        return;
      }
      console.log(thuonghieu);
      this.thuonghieuService.create(thuonghieu).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Thêm mới thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error(err);
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
    if (this.isEdit) {
      this.thuonghieuService.update(thuonghieu.ma_thuong_hieu, thuonghieu).subscribe(res => {
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
