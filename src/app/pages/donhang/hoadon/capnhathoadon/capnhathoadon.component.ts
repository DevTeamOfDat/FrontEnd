import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { hoadonModel } from 'app/model/donhang/hoadon/hoadon-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HoadonService } from 'app/services/donhang/hoadon/hoadon.service';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { TrangthaiService } from 'app/services/donhang/trangthai/trangthai.service';
import { LoaidonService } from 'app/services/donhang/loaidon/loaidon.service';
import { loaidonModel } from 'app/model/donhang/loaidon/loaidon-model';
import { trangthaiModel } from 'app/model/donhang/trangthai/trangthai-model';

@Component({
  selector: 'ngx-capnhathoadon',
  templateUrl: './capnhathoadon.component.html',
  styleUrls: ['./capnhathoadon.component.scss']
})
export class CapnhathoadonComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachhoadon: Array<hoadonModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachtaikhoan: Array<taikhoanModel> = [];
  danhsachloaidon: Array<loaidonModel> = [];
  danhsachtrangthai: Array<trangthaiModel> = [];
  arrbyKH: Array<taikhoanModel> = [];
  arrbyNV: Array<taikhoanModel> = [];
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
  model: hoadonModel;
  arrCheck = [];
  update_ma_hoa_don:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private hoadonService: HoadonService,
    private khachhangService: TaikhoanService,
    private nhanvienService: TaikhoanService,
    private trangthaiService: TrangthaiService,
    private loaidonService: LoaidonService) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachkhachhang();
    this.fetchDanhsachnhanvien();
    this.fetchDanhsachtrangthai();
    this.fetchDanhsachloaidon();
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

  fetchDanhsachnhanvien(){
    this.isLoading =  true;
    const arrr=[];
    this.nhanvienService.getAll().subscribe(data => {
      this.danhsachtaikhoan = data.data;
      this.arrbyNV = this.danhsachtaikhoan.filter(function (khachhang) {
        return khachhang.loai_tai_khoan === "NV";
      });
      console.log(this.arrbyNV);
    },   
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachtrangthai(){
    this.isLoading =  true;
    this.trangthaiService.getAll().subscribe(data => {
      this.danhsachtrangthai = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachloaidon(){
    this.isLoading =  true;
    this.loaidonService.getAll().subscribe(data => {
      this.danhsachloaidon = data.data;
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
        this.title = `Thêm mới thông tin hóa đơn`;
        this.update_ma_hoa_don = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin hóa đơn`;
        this.update_ma_hoa_don = this.model.ma_hoa_don;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin hóa đơn`;
        this.update_ma_hoa_don = this.model.ma_hoa_don;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: hoadonModel, type = null): void {
    this.arrCheck = this.danhsachhoadon;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_hoa_don === null || model.ma_hoa_don === undefined) {
      this.formGroup = this.fb.group({
        ma_hoa_don: [ null, [Validators.required]],
        ma_nhan_vien: [ null, [Validators.required]],
        ma_khach_hang: [ null, [Validators.required]],
        ngay_lap: [ null, [Validators.required]],
        loai_don: [ null, [Validators.required]],
        trang_thai: [ null, [Validators.required]],
        tong_tien: [null,  [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ma_hoa_don: [{value: this.model.ma_hoa_don, disabled: this.isInfo}, [Validators.required]],
        ma_nhan_vien: [{value: this.model.ma_nhan_vien, disabled: this.isInfo}, [Validators.required]],
        ma_khach_hang: [{value: this.model.ma_khach_hang, disabled: this.isInfo}, [Validators.required]],
        ngay_lap: [{value: this.model.ngay_lap, disabled: this.isInfo}, [Validators.required]],
        loai_don: [{value: this.model.loai_don, disabled: this.isInfo}, [Validators.required]],
        trang_thai: [{value: this.model.trang_thai, disabled: this.isInfo}, [Validators.required]],
        tong_tien: [{value: this.model.tong_tien, disabled: this.isInfo}, [Validators.required]],

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
    let hoadon: hoadonModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      hoadon = {
        ma_hoa_don: this.formGroup.get('ma_hoa_don')?.value,
        ma_nhan_vien: this.formGroup.get('ma_nhan_vien')?.value,
        ma_khach_hang: this.formGroup.get('ma_khach_hang')?.value,
        ngay_lap: this.formGroup.get('ngay_lap')?.value,
        loai_don: this.formGroup.get('loai_don')?.value,
        trang_thai: this.formGroup.get('trang_thai')?.value,
        tong_tien: this.formGroup.get('tong_tien')?.value,
      };
    } else {
      hoadon = {
        ma_hoa_don: this.formGroup.get('ma_hoa_don')?.value,
        ma_nhan_vien: this.formGroup.get('ma_nhan_vien')?.value,
        ma_khach_hang: this.formGroup.get('ma_khach_hang')?.value,
        ngay_lap: this.formGroup.get('ngay_lap')?.value,
        loai_don: this.formGroup.get('loai_don')?.value,
        trang_thai: this.formGroup.get('trang_thai')?.value,
        tong_tien: this.formGroup.get('tong_tien')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_hoa_don === hoadon.ma_hoa_don) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('id đã tồn tại');
        return;
      }
      this.hoadonService.create(hoadon).subscribe(res => {
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
      this.hoadonService.update(hoadon.ma_hoa_don, hoadon).subscribe(res => {
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
