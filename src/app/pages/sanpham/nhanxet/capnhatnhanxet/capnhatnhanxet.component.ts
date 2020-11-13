import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { nhanxetModel } from 'app/model/san-pham/nhanxet/nhanxet-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NhanxetService } from 'app/services/san-pham/nhanxet/nhanxet.service';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';

@Component({
  selector: 'ngx-capnhatnhanxet',
  templateUrl: './capnhatnhanxet.component.html',
  styleUrls: ['./capnhatnhanxet.component.scss']
})
export class CapnhatnhanxetComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachnhanxet: Array<nhanxetModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachsanpham: Array<sanphamModel> = [];
  danhsachkhachhang: Array<taikhoanModel> = [];
  arrloaitaikhoan: Array<taikhoanModel> = [];
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
  model: nhanxetModel;
  arrCheck = [];
  arrbyLoaitaikhoan=[];

  update_ma_nhan_xet: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private nhanxetService: NhanxetService,
    private sanphamService: SanPhamService,
    private khachhangService: TaikhoanService) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachsanpham();
    this.fetchDanhsachkhachhang();
    
  }

  fetchDanhsachsanpham(){
    this.isLoading =  true;
    this.sanphamService.getAll().subscribe(data => {
      this.danhsachsanpham = data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachkhachhang(){
    this.isLoading =  true;
    const arrr=[];
    this.khachhangService.getAll().subscribe(data => {
      this.danhsachkhachhang = data;
      console.log(this.danhsachkhachhang);
      this.arrbyLoaitaikhoan = this.danhsachkhachhang.filter(function (khachhang) {
        return khachhang.loai_tai_khoan === "KH";
      });
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
        this.title = `Thêm mới thông tin nhận xét`;
        this.update_ma_nhan_xet = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin nhận xét`;
        this.update_ma_nhan_xet = this.model.ma_nhan_xet;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin đặc trưng`;
        this.update_ma_nhan_xet = this.model.ma_nhan_xet;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: nhanxetModel, type = null): void {
    this.arrCheck = this.danhsachnhanxet;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_nhan_xet === null || model.ma_nhan_xet === undefined) {
      this.formGroup = this.fb.group({
        ma_nhan_xet: [ null, [Validators.required]],
        ma_san_pham: [ null, [Validators.required]],
        ma_khach_hang : [ null, [Validators.required]],
        binh_luan: [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ma_nhan_xet:  [{value: this.model.ma_nhan_xet, disabled: this.isInfo}, [Validators.required]],
        ma_san_pham: [{value: this.model.ma_san_pham, disabled: this.isInfo}, [Validators.required]],
        ma_khach_hang : [{value: this.model.ma_khach_hang, disabled: this.isInfo}, [Validators.required]],
        binh_luan: [{value: this.model.binh_luan, disabled: this.isInfo}, [Validators.required]],
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
    let nhanxet: nhanxetModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      nhanxet = {
        ma_nhan_xet: this.formGroup.get('ma_nhan_xet')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        ma_khach_hang : this.formGroup.get('ma_khach_hang')?.value,
        binh_luan: this.formGroup.get('binh_luan')?.value,
      };
    } else {
      nhanxet = {
        ma_nhan_xet: this.formGroup.get('ma_nhan_xet')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        ma_khach_hang : this.formGroup.get('ma_khach_hang')?.value,
        binh_luan: this.formGroup.get('binh_luan')?.value,
      };
    }
    console.log(this.arrCheck.length);
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_nhan_xet === nhanxet.ma_nhan_xet) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã nhận xét đã tồn tại');
        return;
      }
      this.nhanxetService.create(nhanxet).subscribe(res => {
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
      this.nhanxetService.update(nhanxet.ma_nhan_xet, nhanxet).subscribe(res => {
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
