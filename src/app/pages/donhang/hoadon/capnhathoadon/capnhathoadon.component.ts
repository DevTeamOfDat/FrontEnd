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
import { DatePipe } from '@angular/common';
import { KhuyenmaisanphamService } from 'app/services/khuyen-mai/khuyenmaisanpham/khuyenmaisanpham.service';
import { khuyenmaisanphamModel } from 'app/model/khuyenmai/khuyenmaisanpham/khuyenmaisanpham-modle';
import { voucherModel } from 'app/model/khuyenmai/voucher/voicher-model';
import { VoucherService } from 'app/services/khuyen-mai/voucher/voucher.service';

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
  danhsachvoucher: Array<voucherModel> = [];
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
  username: any;
  check_ma_khach_hang: any;
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
    private loaidonService: LoaidonService,
    private voucherService: VoucherService,
    private datePipe: DatePipe) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachkhachhang();
    this.fetchDanhsachnhanvien();
    this.fetchDanhsachtrangthai();
    this.fetchDanhsachloaidon();
    this.fetchgetInfo();
  }

  changeStatus(event: any){
    this.fetchDanhsachkhuyenmaisanpham(event.target.value);
  }
  fetchgetInfo(){
    this.nhanvienService.getInfo().subscribe(data => {
      this.username = data.data.ho_ten;
      console.log(this.username);
    },)
  }
  fetchDanhsachkhachhang(){
    this.isLoading =  true;
    const arrr=[];
    this.khachhangService.getAll().subscribe(data => {
      this.danhsachtaikhoan = data.data;
      this.arrbyKH = this.danhsachtaikhoan.filter(function (khachhang) {
        return khachhang.loai_tai_khoan === "KH";
      });
    },   
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachkhuyenmaisanpham(check_ma_khach_hang: any){
    this.isLoading =  true;
    const arrr=[];
    this.voucherService.detail(check_ma_khach_hang).subscribe(data => {
      this.danhsachvoucher = data.data;
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
        ma_hoa_don: [ null],
        ma_nhan_vien: [ null],
        muc_khuyen_mai:[null],
        ma_voucher : [null],
        ma_khach_hang: [ null,[Validators.required]],
        ngay_lap: [this.datePipe.transform(Date.now(),"yyyy/MM/dd")],
        loai_don: ["Lập tại cửa hàng"],
        trang_thai: ["Hoàn Thành"],
        username: this.username,
        tong_tien: [null],
        thanh_tien: [null],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ma_hoa_don: [{value: this.model.ma_hoa_don, disabled: this.isInfo}],
        ma_nhan_vien: [{value: this.model.ma_nhan_vien, disabled: this.isInfo}],
        ma_khach_hang: [{value: this.model.ma_khach_hang, disabled: this.isInfo},[Validators.required]],
        ngay_lap: [{value: this.model.ngay_lap, disabled: this.isInfo}],
        ma_voucher:[{value: this.model.ma_voucher, disabled: this.isInfo}],
        username: this.username,
        loai_don: [{value: this.model.gia_tri_loai_don, disabled: this.isInfo}],
        trang_thai: [{value: this.model.gia_tri_trang_thai, disabled: this.isInfo}],
        tong_tien: [{value: this.model.tong_tien, disabled: this.isInfo}],
        thanh_tien: [{value: this.model.thanh_tien, disabled: this.isInfo}],

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
        ma_khach_hang: this.formGroup.get('ma_khach_hang')?.value,
        ma_voucher: this.formGroup.get("muc_voucher").value,
      };
    } else {
      hoadon = {
        ma_khach_hang: this.formGroup.get('ma_khach_hang')?.value,
        ma_voucher: this.formGroup.get("ma_voucher").value,
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
        this.toastr.success(res.success);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
    if (this.isEdit) {
      this.hoadonService.update(hoadon.ma_hoa_don, hoadon).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Sửa thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error('Cập nhật thất bại');
        });
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }


}
