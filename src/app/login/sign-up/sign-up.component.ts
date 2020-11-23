import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formRegister: FormGroup;
  //avatarUrlDefaut = avatarDefault;
  submitted = false;
  user: taikhoanModel;
  confirm_mat_khau: string;

  constructor(private authService: TaikhoanService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    this.createForm();

  }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

  createForm() {
    this.formRegister = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
      mat_khau: [null, [Validators.required, Validators.pattern(new RegExp(/^(.{8,})$/))]],
      ho_ten: [null, ],
      dia_chi: [null, ],
      so_dien_thoai: [ null, [Validators.pattern(new RegExp('[0-9]{10}'))]],
      confirm_mat_khau: [null, [Validators.required, Validators.pattern(new RegExp(/^(.{8,})$/))]], 
    });
  }

  save() {
    this.submitted = true;
    if (this.formRegister.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    this.confirm_mat_khau = this.formRegister.get('confirm_mat_khau').value;
    const mat_khau = this.formRegister.get('mat_khau')?.value;
    if (this.confirm_mat_khau !== mat_khau) {
      this.toastr.error('Mật khẩu xác nhận không khớp');
      return;
    }
    this.user = {
      email: this.formRegister.get('email')?.value,
      mat_khau: this.formRegister.get('mat_khau')?.value,
      ho_ten: this.formRegister.get('ho_ten')?.value,
      dia_chi: this.formRegister.get('dia_chi')?.value,
      so_dien_thoai: this.formRegister.get('so_dien_thoai')?.value,
    };
    this.authService.register(this.user).subscribe(res => {
          this.router.navigate(['/signin']);
          this.toastr.success('Thêm mới thành công');
      },
      err => {
        this.toastr.error('Có lỗi xảy ra!');
      });
  }

}
