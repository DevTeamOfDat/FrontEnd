import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { nhacungcapModel } from 'app/model/nhacungcap/nhacungcap-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NhaCungCapService } from 'app/services/nha-cung-cap/nha-cung-cap.service';

@Component({
  selector: 'ngx-capnhatnhacungcap',
  templateUrl: './capnhatnhacungcap.component.html',
  styleUrls: ['./capnhatnhacungcap.component.scss']
})
export class CapnhatnhacungcapComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachnhacungcap: Array<nhacungcapModel>;
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
  arrCheck = [];
  update_ma_tai_khoan:any;
  model: nhacungcapModel;
 
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private nhacungcapService: NhaCungCapService,) {
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
        this.title = `Thêm mới thông tin nhà cung cấp`;
        // this.update_ma_tai_khoan = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin nhà cung cấp`;
        // this.update_ma_tai_khoan = this.model.ma_nha_cung_cap;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin nhà cung cấp`;
        // this.update_ma_tai_khoan = this.model.ma_nha_cung_cap;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: nhacungcapModel, type = null): void {
    this.arrCheck = this.danhsachnhacungcap;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_nha_cung_cap === null || model.ma_nha_cung_cap === undefined) {
      this.formGroup = this.fb.group({
        ten: [ null, [Validators.required]],
        dia_chi: [ null, [Validators.required]],
        hot_line : [ null],
        email: [ null],
        so_dien_thoai: [ null, [Validators.required]],
        hinh_anh: [ null],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ten: [{value: this.model.ten, disabled: this.isInfo}, [Validators.required]],
        dia_chi: [{value: this.model.dia_chi, disabled: this.isInfo}, [Validators.required]],
        hot_line: [{value: this.model.hot_line, disabled: this.isInfo}],
        email: [{value: this.model.email, disabled: this.isInfo}],
        so_dien_thoai: [{value: this.model.so_dien_thoai, disabled: this.isInfo}, [Validators.required]],
        hinh_anh: [{value: this.model.hinh_anh, disabled: this.isInfo}],
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
    let nhacungcap: nhacungcapModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      nhacungcap = {
        ma_nha_cung_cap: this.model.ma_nha_cung_cap,
        ten: this.formGroup.get('ten')?.value,
        dia_chi: this.formGroup.get('dia_chi')?.value,
        hot_line: this.formGroup.get('hot_line')?.value,
        email: this.formGroup.get('email')?.value,
        so_dien_thoai: this.formGroup.get('so_dien_thoai')?.value,
        hinh_anh : this.formGroup.get('hinh_anh')?.value,
      };
     
    } else {
      nhacungcap = {
        ma_nha_cung_cap: this.model.ma_nha_cung_cap,
        ten: this.formGroup.get('ten')?.value,
        dia_chi: this.formGroup.get('dia_chi')?.value,
        hot_line: this.formGroup.get('hot_line')?.value,
        email: this.formGroup.get('email')?.value,
        so_dien_thoai: this.formGroup.get('so_dien_thoai')?.value,
        hinh_anh : this.formGroup.get('hinh_anh')?.value,
      };
    }
    console.log(this.arrCheck.length);
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_nha_cung_cap === nhacungcap.ma_nha_cung_cap) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã nhà cung cấp đã tồn tại');
        return;
      }
      this.nhacungcapService.create(nhacungcap).subscribe(res => {
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
      this.nhacungcapService.update(nhacungcap.ma_nha_cung_cap, nhacungcap).subscribe(res => {
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
