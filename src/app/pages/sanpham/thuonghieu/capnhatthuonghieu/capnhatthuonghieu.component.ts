import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { thuonghieuModel } from 'app/model/san-pham/thuong-hieu/thuonghieu-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ThuongHieuService } from 'app/services/san-pham/thuong-hieu/thuong-hieu.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { avatarDefault } from 'environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'ngx-capnhatthuonghieu',
  templateUrl: './capnhatthuonghieu.component.html',
  styleUrls: ['./capnhatthuonghieu.component.css']
})
export class CapnhatthuonghieuComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachthuonghieu: Array<thuonghieuModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
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
  model: thuonghieuModel;
  arrCheck = [];
  update_ma_thuong_hieu:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private thuonghieuService: ThuongHieuService,
    private store: AngularFireStorage) {
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
        hinh_anh: [ null,[Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ten_thuong_hieu: [{value: this.model.ten_thuong_hieu, disabled: this.isInfo}, [Validators.required]],
        hinh_anh: [{value: this.model.hinh_anh, disabled: this.isInfo},[Validators.required]],
      });
      if(this.model.hinh_anh===""){
        this.urlPictureDefault = avatarDefault;
      }
      else{
        this.urlPictureDefault=this.model.hinh_anh;
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
        hinh_anh: this.urlPictureDefault,
      };
    } else {
      thuonghieu = {
        ma_thuong_hieu: this.model.ma_thuong_hieu,
        ten_thuong_hieu: this.formGroup.get('ten_thuong_hieu')?.value,
        hinh_anh: this.urlPictureDefault,
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
      this.thuonghieuService.create(thuonghieu).subscribe(res => {
        this.closeModalReloadData();
        console.log(thuonghieu);
        this.toastr.success(res.success);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
    if (this.isEdit) {
      this.thuonghieuService.update(thuonghieu.ma_thuong_hieu, thuonghieu).subscribe(res => {
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
