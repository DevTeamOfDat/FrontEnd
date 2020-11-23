import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { avatarDefault } from 'environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoaitaikhoanService } from 'app/services/taikhoan/loaitaikhoan/loaitaikhoan.service';
import { loaitaikhoanModel } from 'app/model/taikhoan/loaitaikhoan/loaitaikhoan-model';


@Component({
  selector: 'ngx-capnhattaikhoan',
  templateUrl: './capnhattaikhoan.component.html',
  styleUrls: ['./capnhattaikhoan.component.scss']
})
export class CapnhattaikhoanComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachtaikhoan: Array<taikhoanModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachloaitaikhoan: Array<loaitaikhoanModel> = [];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  urlPictureDefault = avatarDefault;
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
  model: taikhoanModel;
  arrCheck = [];
  update_ma_tai_khoan: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private taikhoanService: TaikhoanService,
    private store: AngularFireStorage,
    private loaitaikhoanService: LoaitaikhoanService) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachloaitaikhoan();
    
  }

  fetchDanhsachloaitaikhoan(){
    this.isLoading =  true;
    this.loaitaikhoanService.getAll().subscribe(data => {
      this.danhsachloaitaikhoan = data.data;
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
        this.title = `Thêm mới thông tin tài khoản`;
        // this.update_ma_tai_khoan= this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin tài khoản`;
        // this.update_ma_tai_khoan = this.model.ma_tai_khoan;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin thương hiệu`;
        // this.update_ma_tai_khoan = this.model.ma_tai_khoan;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: taikhoanModel, type = null): void {
    this.arrCheck = this.danhsachtaikhoan;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_tai_khoan === null || model.ma_tai_khoan === undefined) {
      this.formGroup = this.fb.group({
        email: [ null, [Validators.required]],
        mat_khau: [ null, [Validators.required]],
        ho_ten: [ null, [Validators.required]],
        dia_chi: [ null],
        so_dien_thoai: [ null, [Validators.required]],
        
        loai_tai_khoan: [ null, [Validators.required]],
        
      });
      this.urlPictureDefault = avatarDefault;
    } else {
      this.formGroup = this.fb.group({
        email:  [{value: this.model.email, disabled: this.isInfo}, [Validators.required]],
        mat_khau:  [{value: this.model.mat_khau, disabled: this.isInfo}, [Validators.required]],
        ho_ten:  [{value: this.model.ho_ten, disabled: this.isInfo}, [Validators.required]],
        dia_chi:  [{value: this.model.dia_chi, disabled: this.isInfo}],
        so_dien_thoai:  [{value: this.model.so_dien_thoai, disabled: this.isInfo}, [Validators.required]],
        hinh_anh : [{value: this.model.hinh_anh, disabled: this.isInfo}],
        loai_tai_khoan:  [{value: this.model.loai_tai_khoan, disabled: this.isInfo}, [Validators.required]],
      });
      console.log(this.formGroup);
      if(this.model.hinh_anh==="" || this.model.hinh_anh === undefined){
        this.urlPictureDefault = avatarDefault;
      }
      else{
        this.urlPictureDefault = this.model.hinh_anh;
      }
      

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
    let taikhoan: taikhoanModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      taikhoan = {
        ma_tai_khoan: this.model.ma_tai_khoan,
        email: this.formGroup.get('email')?.value,
        mat_khau: this.formGroup.get('mat_khau')?.value,
        ho_ten: this.formGroup.get('ho_ten')?.value,
        dia_chi: this.formGroup.get('dia_chi')?.value,
        so_dien_thoai: this.formGroup.get('so_dien_thoai')?.value,
        hinh_anh : this.urlPictureDefault,
        loai_tai_khoan: this.formGroup.get('loai_tai_khoan')?.value,
      };
      
    } else {
      taikhoan = {
        ma_tai_khoan: this.model.ma_tai_khoan,
        email: this.formGroup.get('email')?.value,
        mat_khau: this.formGroup.get('mat_khau')?.value,
        ho_ten: this.formGroup.get('ho_ten')?.value,
        dia_chi: this.formGroup.get('dia_chi')?.value,
        so_dien_thoai: this.formGroup.get('so_dien_thoai')?.value,
        hinh_anh : this.urlPictureDefault,
        loai_tai_khoan: this.formGroup.get('loai_tai_khoan')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_tai_khoan === taikhoan.ma_tai_khoan) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã tài khoản đã tồn tại');
        return;
      }
      this.taikhoanService.create(taikhoan).subscribe(res => {
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
      this.taikhoanService.update(taikhoan).subscribe(res => {
        this.closeModalReloadData();
        this.toastr.success(res.success);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }
  uploadImage(event) {
    // tslint:disable-next-line:prefer-const
    let file = event.target.files[0];
    // tslint:disable-next-line:prefer-const
    let path = `thuonghieu/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Erreur, ce fichier n\'est pas une image');
    } else {
      // tslint:disable-next-line:prefer-const
      let ref = this.store.ref(path);
      // tslint:disable-next-line:prefer-const
      let task = this.store.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
          this.urlPictureDefault=url;
          });
        }
        )
      ).subscribe();
    }
  }

}
