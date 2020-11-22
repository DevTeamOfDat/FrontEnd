import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';
import { ToastrService } from 'ngx-toastr';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { avatarDefault } from 'environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  getInfo: Array<taikhoanModel> = [];
  formGroup: FormGroup;
  ho_ten: any;
  ma_tai_khoan: any;
  email :any;
  dia_chi: any;
  mat_khau_cu: any;
  mat_khau_moi: any;
  confirm_mat_khau: any;
  so_dien_thoai : any;
  loai_tai_khoan: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  urlPictureDefault = avatarDefault;
  constructor(
    private modalService: NgbModal,
     private taikhoanService: TaikhoanService,
    private toastr: ToastrService,
    private store: AngularFireStorage,
    private fb: FormBuilder,
    ) {
    }

  ngOnInit(): void {
    this.fetchgetInfo();
   
  }

  fetchgetInfo(){
    this.taikhoanService.getInfo().subscribe(data => {
      this.ho_ten = data.data.ho_ten;
      this.email = data.data.email;
      this.dia_chi = data.data.dia_chi;
      this.ma_tai_khoan = data.data.ma_tai_khoan;
      this.so_dien_thoai = data.data.so_dien_thoai;
      this.urlPictureDefault = data.data.hinh_anh;
      this.loai_tai_khoan = data.data.loai_tai_khoan;
      this.formGroup = this.fb.group({
        email:[{value: this.email}],
        ho_ten: [{value: this.ho_ten}],
        dia_chi:  [{value: this.dia_chi}],
        mat_khau_cu:[{value: this.mat_khau_cu}],
        mat_khau_moi:[{value: this.mat_khau_moi}],
        confirm_mat_khau:[{value: this.confirm_mat_khau}],
        so_dien_thoai:  [{value: this.so_dien_thoai}],
        hinh_anh : [{value: this.urlPictureDefault}],
        loai_tai_khoan:  [{value: this.loai_tai_khoan}],
      });
    },)
  }

  save() {
    let taikhoan: taikhoanModel;
      
      if(this.confirm_mat_khau === null || this.mat_khau_moi=== null || this.mat_khau_cu === null)
      {
        taikhoan = {
          email: this.formGroup.get('email')?.value,
          ho_ten: this.formGroup.get('ho_ten')?.value,
          dia_chi: this.formGroup.get('dia_chi')?.value,
          so_dien_thoai: this.formGroup.get('so_dien_thoai')?.value,
          hinh_anh : this.urlPictureDefault,
          loai_tai_khoan: this.formGroup.get('loai_tai_khoan')?.value,
        };
      }
      else{
        taikhoan = {
          email: this.formGroup.get('email')?.value,
          mat_khau_cu: this.mat_khau_cu,
          mat_khau_moi: this.mat_khau_moi,
          ho_ten: this.formGroup.get('ho_ten')?.value,
          dia_chi: this.formGroup.get('dia_chi')?.value,
          so_dien_thoai: this.formGroup.get('so_dien_thoai')?.value,
          hinh_anh : this.urlPictureDefault,
          loai_tai_khoan: this.formGroup.get('loai_tai_khoan')?.value,
        };
      }
      if(this.confirm_mat_khau === this.mat_khau_moi){
        this.taikhoanService.update(taikhoan).subscribe(res => {
          this.toastr.success(res.success);
        },
      err => {
        this.toastr.error(err.error.error);
      }
      );
      }else{
        this.toastr.error("mật khẩu mới không trùng khớp, vui lòng nhập lại");
      }
      
      
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
