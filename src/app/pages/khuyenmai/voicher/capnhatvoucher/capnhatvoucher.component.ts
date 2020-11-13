import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { voucherModel } from 'app/model/khuyenmai/voucher/voicher-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { VoucherService } from 'app/services/khuyen-mai/voucher/voucher.service';

@Component({
  selector: 'ngx-capnhatvoucher',
  templateUrl: './capnhatvoucher.component.html',
  styleUrls: ['./capnhatvoucher.component.scss']
})
export class CapnhatvoucherComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachvoucher: Array<voucherModel>;
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
  model: voucherModel;
  arrCheck = [];
  update_ma_voicher:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private voucherService: VoucherService,) {
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
        this.update_ma_voicher = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin ngày khuyến mãi`;
        this.update_ma_voicher = this.model.ma_voicher;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin ngày khuyến mãi`;
        this.update_ma_voicher = this.model.ma_voicher;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: voucherModel, type = null): void {
    this.arrCheck = this.danhsachvoucher;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_voicher === null || model.ma_voicher === undefined) {
      this.formGroup = this.fb.group({
        ma_voicher: [ null, [Validators.required]],
        muc_voicher: [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ma_voicher:  [{value: this.model.ma_voicher, disabled: this.isInfo}, [Validators.required]],
        muc_voicher: [{value: this.model.muc_voicher, disabled: this.isInfo}, [Validators.required]],

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
    let voicher: voucherModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      voicher = {
        ma_voicher: this.formGroup.get('ma_voicher')?.value,
        muc_voicher: this.formGroup.get('muc_voicher')?.value,
      };
    } else {
      voicher = {
        ma_voicher: this.formGroup.get('ma_voicher')?.value,
        muc_voicher: this.formGroup.get('muc_voicher')?.value,
      };
    }
    console.log(this.arrCheck.length);
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_voicher === voicher.ma_voicher) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã thương hiệu đã tồn tại');
        return;
      }
      this.voucherService.create(voicher).subscribe(res => {
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
      this.voucherService.update(voicher.ma_voicher, voicher).subscribe(res => {
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
