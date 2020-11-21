import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/admin/iot-dashboard',
    home: true
  },
  {
    title: 'Tính năng',
    group: true,
  },
  {
    title: 'Nhà cung cấp',
    icon: 'keypad-outline',
    link: '/admin/nhacungcap/danhsachnhacungcap',
  },
  {
    title: 'Sản phẩm',
    icon: 'browser-outline',
    children: [
      {
        title: 'Danh sách sản phẩm',
        link: '/admin/sanpham/san-pham/danhsachsanpham',
      },
      {
        title: 'Đặc trưng',
        link: '/admin/sanpham/dactrung/danhsachdactrung',
      },
      {
        title: 'Loại sản phẩm',
        link: '/admin/sanpham/loaisanpham/danhsachloaisanpham',
      },
      {
        title: 'Hình ảnh sản phẩm',
        link: '/admin/sanpham/hinhanhsanpham/danhsachhinhanhsanpham',
      },
      // {
      //   title: 'Nhận xét',
      //   link: '/admin/sanpham/nhanxet/danhsachnhanxet',
      // },
      // {
      //   title: 'Nhập hàng',
      //   link: '/admin/modal-overlays/popover',
      // },
      // {
      //   title: 'Chuyển hàng',
      //   link: '/admin/modal-overlays/toastr',
      // },
      {
        title: 'Thương hiệu',
        link: '/admin/sanpham/thuonghieu/danhsachthuonghieu',
      },
      
    ],
  },
  {
    title: 'Tài khoản',
    icon: 'layout-outline',
    children: [
      {
        title: 'Danh sách tài khoản',
        link: '/admin/taikhoan/taikhoan/danhsachtaikhoan',
      },
      {
        title: 'Loại tài khoản',
        link: '/admin/taikhoan/loaitaikhoan/danhsachloaitaikhoan',
      },
    ],
  },
  {
    title: 'Đơn hàng',
    icon: 'layout-outline',
    children: [
      // {
      //   title: 'Loại đơn',
      //   link: '/admin/donhang/loaidon/danhsachloaidon',
      // },
      {
        title: 'Phiếu nhập',
        link: '/admin/donhang/phieunhap/danhsachphieunhap',
      },
      {
        title: 'Chi tiết phiếu nhập',
        link: '/admin/donhang/chitietphieunhap/danhsachchitietphieunhap',
      },
      {
        title: 'Hóa Đơn',
        link: '/admin/donhang/hoadon/danhsachhoadon',
      },
      {
        title: 'Chi tiết hóa Đơn',
        link: '/admin/donhang/chitiethoadon/danhsachchitiethoadon',
      },
      // {
      //   title: 'Trạng thái',
      //   link: '/admin/donhang/trangthai/danhsachtrangthai',
      // },
    ],
  },
  
  {
    title: 'Khuyến mãi',
    icon: 'home-outline',
    children: [
      {
        title: 'Ngày khuyến mãi',
        link: '/admin/khuyenmai/ngaykhuyenmai/danhsachngaykhuyenmai',
      },
      {
        title: 'Voucher',
        link: '/admin/khuyenmai/voicher/danhsachvoucher',
      },
      
      
    ],
  },
  
  {
    title: 'Tin tức',
    icon: 'keypad-outline',
    link: '/admin/tintuc/danhsachtintuc',
  },
  
  {
    title: 'Báo cáo',
    icon: 'home-outline',
    children: [
      {
        title: 'Báo cáo hàng tồn kho',
        link: '/admin/report/baocaohangtonkho',
      },
      {
        title: 'Báo cáo phiếu nhập',
        link: '/admin/report/baocaophieunhap',
      },
      {
        title: 'Báo cáo hóa đơn và voucher',
        link: '/admin/report/baocaohoadon',
      },
      {
        title: 'Báo cáo nhân viên',
        link: '/admin/report/baocaonhanvien',
      },
      
      
    ],
  },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
