export interface voucherModel{
    ma_voucher? : bigint,
    ma_khach_hang? : Date,
    muc_voucher?: number,
    ten_khach_hang?: string,
    isActive? : boolean,
    checked?:  boolean
 }