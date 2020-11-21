import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { khuyenmaisanphamModel } from 'app/model/khuyenmai/khuyenmaisanpham/khuyenmaisanpham-modle';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { KhuyenmaisanphamService } from 'app/services/khuyen-mai/khuyenmaisanpham/khuyenmaisanpham.service';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
import { NgayKhuyenMaiService } from 'app/services/khuyen-mai/ngay-khuyen-mai/ngay-khuyen-mai.service';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';

@Component({
  selector: 'ngx-capnhatkhuyenmaisanpham',
  templateUrl: './capnhatkhuyenmaisanpham.component.html',
  styleUrls: ['./capnhatkhuyenmaisanpham.component.scss']
})
export class CapnhatkhuyenmaisanphamComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachkhuyenmaisanpham: Array<khuyenmaisanphamModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachsanpham: Array<sanphamModel> = [];
  danhsachngaykhuyenmai: Array<khuyenmaisanphamModel> = [];
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
  model: khuyenmaisanphamModel;
  arrCheck = [];
  update_id:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private khuyenmaisanphamService: KhuyenmaisanphamService,
    private sanphamService: SanPhamService,
    private ngaykhuyenmaiService: NgayKhuyenMaiService) {
    }

  ngOnInit(): void {
    this.fetchDanhsachsanpham();
    this.fetchDanhsachngaykhuyenmai();
    this.submitted = false;
    
    
  }

  fetchDanhsachsanpham(){
    this.isLoading =  true;
    this.sanphamService.getAll().subscribe(data => {
      this.danhsachsanpham = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachngaykhuyenmai(){
    this.isLoading =  true;
    this.ngaykhuyenmaiService.getAll().subscribe(data => {
      this.danhsachngaykhuyenmai = data.data;
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
        this.title = `Thêm mới thông tin khuyến mãi sản phẩm`;
        this.update_id = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin khuyến mãi sản phẩm`;
        this.update_id = this.model.id;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin khuyến mãi sản phẩm`;
        this.update_id = this.model.id;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: khuyenmaisanphamModel, type = null): void {
    this.arrCheck = this.danhsachkhuyenmaisanpham;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.id === null || model.id === undefined) {
      this.formGroup = this.fb.group({
        id: [ null, [Validators.required]],
        ma_san_pham: [ null, [Validators.required]],
        ma_ngay_khuyen_mai: [ null, [Validators.required]],
        muc_khuyen_mai: [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        id: [{value: this.model.ma_ngay_khuyen_mai, disabled: this.isInfo}, [Validators.required]],
        ma_san_pham: [{value: this.model.ma_san_pham, disabled: this.isInfo}, [Validators.required]],
        ma_ngay_khuyen_mai: [{value: this.model.ma_ngay_khuyen_mai, disabled: this.isInfo}, [Validators.required]],
        muc_khuyen_mai: [{value: this.model.muc_khuyen_mai, disabled: this.isInfo}, [Validators.required]],

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
    let khuyenmaisanpham: khuyenmaisanphamModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      khuyenmaisanpham = {
        id: this.formGroup.get('id')?.value,
        ma_san_pham: this.formGroup.get('ma_san-pham')?.value,
        ma_ngay_khuyen_mai: this.formGroup.get('ma_ngay_khuyen_mai')?.value,
        muc_khuyen_mai: this.formGroup.get('muc_khuyen_mai')?.value,
      };
    } else {
      khuyenmaisanpham = {
        id: this.formGroup.get('id')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        ma_ngay_khuyen_mai: this.formGroup.get('ma_ngay_khuyen_mai')?.value,
        muc_khuyen_mai: this.formGroup.get('muc_khuyen_mai')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === khuyenmaisanpham.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã thương hiệu đã tồn tại');
        return;
      }
      this.khuyenmaisanphamService.create(khuyenmaisanpham).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Thêm mới thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
    if (this.isEdit) {
      this.khuyenmaisanphamService.update(khuyenmaisanpham.id, khuyenmaisanpham).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Sửa thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }

}
