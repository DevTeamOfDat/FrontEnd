import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { voucherModel } from 'app/model/khuyenmai/voucher/voicher-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { VoucherService } from 'app/services/khuyen-mai/voucher/voucher.service';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';

@Component({
  selector: 'ngx-capnhatvoucher',
  templateUrl: './capnhatvoucher.component.html',
  styleUrls: ['./capnhatvoucher.component.scss']
})
export class CapnhatvoucherComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachvoucher: Array<voucherModel>;
  danhsachtaikhoan: Array<taikhoanModel> = [];
  arrbyKH: Array<taikhoanModel> = [];
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
  update_ma_voucher:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private khachhangService: TaikhoanService,
    private voucherService: VoucherService,) {
    }

  ngOnInit(): void {
    this.submitted = false;
    
    this.fetchDanhsachkhachhang();
  }

  fetchDanhsachkhachhang(){
    this.isLoading =  true;
    const arrr=[];
    this.khachhangService.getAll().subscribe(data => {
      this.danhsachtaikhoan = data.data;
      this.arrbyKH = this.danhsachtaikhoan.filter(function (khachhang) {
        return khachhang.loai_tai_khoan === "KH";
      });
      console.log(this.arrbyKH);
    },   
    err => {
        this.isLoading = false;
      })
  }
  updateFormType(type: any) {
    switch (type) {
      case 'add':
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        this.title = `Thêm mới thông tin voucher`;
        // this.update_ma_voucher = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin voucher`;
        // this.update_ma_voucher = this.model.ma_voucher;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin voucher`;
        // this.update_ma_voucher = this.model.ma_voucher;
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
   
    if (model.ma_voucher === null || model.ma_voucher === undefined) {
      this.formGroup = this.fb.group({
        ma_voucher: [ null, [Validators.required]],
        ma_khach_hang: [ null, [Validators.required]],
      });
    } else {
      this.formGroup = this.fb.group({
        ma_voucher: [{value: this.model.ma_voucher, disabled: this.isInfo}, [Validators.required]],
        ma_khach_hang: [{value: this.model.ma_khach_hang, disabled: this.isInfo}, [Validators.required]],
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
        ma_voucher: this.model.ma_voucher,
        muc_voucher: this.formGroup.get('muc_voucher')?.value,
        ma_khach_hang: this.model.ma_khach_hang,
      };
    } else {
      voicher = {
        ma_voucher: this.model.ma_voucher,
        muc_voucher: this.formGroup.get('muc_voucher')?.value,
        ma_khach_hang: this.model.ma_khach_hang,
      };
    }
    console.log(this.arrCheck.length);
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_voucher === voicher.ma_voucher) {
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
      this.voucherService.update(voicher.ma_voucher, voicher).subscribe(res => {
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
