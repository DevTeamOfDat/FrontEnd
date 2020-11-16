export interface dactrungsanphamModel{
    id?: bigint,
    loai_dac_trung? : bigint,
    danh_sach_loai_dac_trung?: string,
    ma_san_pham? : bigint,
    ten_san_pham?: string,
    ten_dac_trung?: string,
    isActive? : boolean,
    checked?:  boolean
 }