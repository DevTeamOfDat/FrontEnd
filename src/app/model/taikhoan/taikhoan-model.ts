export interface taikhoanModel{
    ma_tai_khoan? : bigint,
    email?: string,
    mat_khau?: string,
    mat_khau_cu?: string,
    mat_khau_moi? : string,
    ho_ten?: string,
    dia_chi?: string,
    so_dien_thoai?: string,
    hinh_anh?: string,
    loai_tai_khoan?: string,
    remember_token?: string,
    isActive? : boolean,
    checked?:  boolean
 }