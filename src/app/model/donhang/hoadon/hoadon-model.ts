export interface hoadonModel{
    ma_hoa_don?: bigint,
    ma_nhan_vien?: number,
    ma_khach_hang?: number,
    ma_voucher?: number,
    ngay_lap?: Date,
    loai_don?: number,
    trang_thai?: number,
    tong_tien?: number,
    thanh_tien?: number,
    ten_nhan_vien?: string,
    muc_voucher?: number,
    ten_khach_hang?: string,
    gia_tri_trang_thai?: string,
    gia_tri_loai_don?: string,
    isActive? : number,
    checked?:  boolean
 }