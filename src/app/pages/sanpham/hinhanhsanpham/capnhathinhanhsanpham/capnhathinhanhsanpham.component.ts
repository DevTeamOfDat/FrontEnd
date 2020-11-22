import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { hinhanhsanphamModel } from 'app/model/san-pham/hinhanhsanpham/hinhanhsanpham-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HinhanhsanphamService } from 'app/services/san-pham/hinhanhsanpham/hinhanhsanpham.service';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { avatarDefault } from 'environments/environment';
@Component({
  selector: 'ngx-capnhathinhanhsanpham',
  templateUrl: './capnhathinhanhsanpham.component.html',
  styleUrls: ['./capnhathinhanhsanpham.component.scss']
})
export class CapnhathinhanhsanphamComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachhinhanhsanpham: Array<hinhanhsanphamModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachsanpham: Array<sanphamModel> = [];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  checkButton = false;
  closeResult: String;
  modalReference!: any;
  formGroup: FormGroup;
  urlPictureDefault = avatarDefault;
  isAdd = false;
  isEdit = false;
  isInfo = false;
  submitted = false;
  isLoading=false;
  title = '';
  type: any;
  model: hinhanhsanphamModel;
  arrCheck = [];
  update_id:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private hinhanhsanphamService: HinhanhsanphamService,
    private sanphamService: SanPhamService,
    private store: AngularFireStorage) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachsanpham();
    
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

  updateFormType(type: any) {
    switch (type) {
      case 'add':
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        this.title = `Thêm mới thông tin hình ảnh sản phẩm`;
        this.update_id= this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin hình ảnh sản phẩm`;
        this.update_id = this.model.id;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin hình ảnh sản phẩm`;
        this.update_id = this.model.id;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: hinhanhsanphamModel, type = null): void {
    this.arrCheck = this.danhsachhinhanhsanpham;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.id === null || model.id === undefined) {
      this.formGroup = this.fb.group({
        id: [ null, [Validators.required]],
        ma_san_pham: [ null, [Validators.required]],
        hinh_anh: [ null],
        
      });
    } else {
      this.formGroup = this.fb.group({
        id: [{value: this.model.id, disabled: this.isInfo}, [Validators.required]],
        ma_san_pham: [{value: this.model.ma_san_pham, disabled: this.isInfo}, [Validators.required]],
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
    let hinhanhsanpham: hinhanhsanphamModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      hinhanhsanpham = {
        id: this.formGroup.get('id')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        hinh_anh: this.urlPictureDefault,
      };
    } else {
      hinhanhsanpham = {
        id: this.formGroup.get('id')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        hinh_anh: this.urlPictureDefault,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === hinhanhsanpham.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã hình ảnh đã tồn tại');
        return;
      }
      this.hinhanhsanphamService.create(hinhanhsanpham).subscribe(res => {
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
      this.hinhanhsanphamService.update(hinhanhsanpham.id, hinhanhsanpham).subscribe(res => {
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
    let path = `${file.name}`;
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
