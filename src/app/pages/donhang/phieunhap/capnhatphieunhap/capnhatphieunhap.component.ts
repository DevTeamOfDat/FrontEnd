import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { nhacungcapModel } from 'app/model/nhacungcap/nhacungcap-model';
import { trangthaiModel } from 'app/model/donhang/trangthai/trangthai-model';
import { phieunhapModel } from 'app/model/donhang/phieunhap/phieunhap-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PhieunhapService } from 'app/services/donhang/phieunhap/phieunhap.service';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';
import { TrangthaiService } from 'app/services/donhang/trangthai/trangthai.service';
import { NhaCungCapService } from 'app/services/nha-cung-cap/nha-cung-cap.service';

@Component({
  selector: 'ngx-capnhatphieunhap',
  templateUrl: './capnhatphieunhap.component.html',
  styleUrls: ['./capnhatphieunhap.component.scss']
})
export class CapnhatphieunhapComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachphieunhap: Array<phieunhapModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachtaikhoan: Array<taikhoanModel> = [];
  danhsachnhacungcap: Array<nhacungcapModel> = [];
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
  model: phieunhapModel;
  arrCheck = [];
  update_ma_phieu_nhap:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private phieunhapService: PhieunhapService,
    private nhanvienService: TaikhoanService,
    private trangthaiService: TrangthaiService,
    private nhacungcapService: NhaCungCapService) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachnhanvien();
    this.fetchDanhsachtrangthai();
    this.fetchDanhsachnhacungcap();
  }


  fetchDanhsachnhanvien(){
    this.isLoading =  true;
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

  fetchDanhsachnhacungcap(){
    this.isLoading =  true;
    this.nhacungcapService.getAll().subscribe(data => {
      this.danhsachnhacungcap = data.data;
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
        this.title = `Thêm mới thông tin phiếu nhập`;
        // this.update_ma_phieu_nhap = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin phiếu nhập`;
        // this.update_ma_phieu_nhap = this.model.ma_phieu_nhap;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin phiếu nhập`;
        // this.update_ma_phieu_nhap = this.model.ma_phieu_nhap;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: phieunhapModel, type = null): void {
    this.arrCheck = this.danhsachphieunhap;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_phieu_nhap === null || model.ma_phieu_nhap === undefined) {
      this.formGroup = this.fb.group({
        ma_nhan_vien: [ null, [Validators.required]],
        ma_nha_cung_cap: [ null, [Validators.required]],
        ngay_nhap: [ null, [Validators.required]],
        trang_thai: [ null, [Validators.required]],
        tong_tien: [null,  [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ma_nhan_vien: [{value: this.model.ma_nhan_vien, disabled: this.isInfo}, [Validators.required]],
        ma_nha_cung_cap: [{value: this.model.ma_nha_cung_cap, disabled: this.isInfo}, [Validators.required]],
        ngay_nhap: [{value: this.model.ngay_nhap, disabled: this.isInfo}, [Validators.required]],
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
    let phieunhap: phieunhapModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      phieunhap = {
        ma_phieu_nhap: this.model.ma_phieu_nhap,
        ma_nhan_vien: this.formGroup.get('ma_nhan_vien')?.value,
        ma_nha_cung_cap: this.formGroup.get('ma_nha_cung_cap')?.value,
        ngay_nhap: this.formGroup.get('ngay_nhap')?.value,
        trang_thai: this.formGroup.get('trang_thai')?.value,
        tong_tien: this.formGroup.get('tong_tien')?.value,
      };
    } else {
      phieunhap = {
        ma_nhan_vien: this.formGroup.get('ma_nhan_vien')?.value,
        ma_nha_cung_cap: this.formGroup.get('ma_nha_cung_cap')?.value,
        ngay_nhap: this.formGroup.get('ngay_nhap')?.value,
        trang_thai: this.formGroup.get('trang_thai')?.value,
        tong_tien: this.formGroup.get('tong_tien')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_phieu_nhap === phieunhap.ma_phieu_nhap) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('id đã tồn tại');
        return;
      }
      this.phieunhapService.create(phieunhap).subscribe(res => {
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
      this.phieunhapService.update(phieunhap.ma_phieu_nhap, phieunhap).subscribe(res => {
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
