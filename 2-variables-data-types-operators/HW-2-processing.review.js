// ============================================================
// FILE REVIEW - HW02 Xử lý Number/String
// Lưu ý quan trọng: FILE GỐC KHÔNG CHẠY ĐƯỢC vì khai báo trùng tên biến.
//   Dòng 13: let giaTien = "1.000.000 đ";
//   Dòng 18: let giaTien = "1.000.000 đ";  <- trùng tên -> SyntaxError
//   Tương tự giamGia (dòng 14 và 19) và giaMongDoi1 (dòng 26 và 34) cũng trùng.
//   Node báo lỗi ngay: "Identifier 'giaTien' has already been declared".
//
//   Để chạy được, em cần xoá các dòng khai báo trùng (giữ lại 1 bản khai báo
//   cho mỗi biến), hoặc bọc mỗi "Cách" vào 1 khối { } riêng (block scope).
//
//   Trong file review này mình đã CHỈNH SỬA cho chạy được bằng cách:
//     - Bỏ phần khai báo trùng ở dòng 18-19 (giữ khai báo gốc 13-15).
//     - Đổi tên biến ở "Cách 2" để không trùng với "Cách 1".
//   Đây là clone để review, không phải file gốc của em.
// ============================================================

//Bài 1

// Dữ liệu đầu vào:
// Giá gốc (Lấy từ UI - String): " 1.000.000 đ "
// Phần trăm giảm (Lấy từ DB - Number): 20 (tức là 20%)
// Giá sau giảm (Lấy từ UI - String): " 800.000 đ "
// Yêu cầu: Làm sạch và chuyển Giá gốc về Number, tính giá mong đợi.

// Đúng: Khai báo dữ liệu đầu vào rõ ràng, đúng kiểu string theo mô tả.
//        Lưu ý: đề ghi giá gốc có dấu cách 2 đầu " 1.000.000 đ " nhưng em
//        ghi là "1.000.000 đ" (không có dấu cách đầu). Kết quả tính vẫn đúng.
let giaTien = "1.000.000 đ";
let giamGia = "20%";
let giaSauGiam = "800.000 đ";

// *** Cách 1: Dùng replace/replaceAll để làm sạch rồi Number() ***
// Đúng: replaceAll(".", "") bỏ hết dấu chấm phân cách hàng nghìn (1.000.000 -> 1000000).
//        replace(" đ", "") bỏ đơn vị " đ". Thứ tự đúng: bỏ dấu chấm trước, bỏ " đ" sau.
// Đúng: replace("%", "") bỏ dấu % rồi Number() -> 20. Công thức giá mong đợi đúng:
//        giaGoc * (100 - giamGia) / 100 = 1000000 * 80 / 100 = 800000.
let giaTienDaLamSach = giaTien.replaceAll(".", "").replace(" đ", "");
let giamGiaDaLamSach = giamGia.replace("%", "");
let giaMongDoi =
  (Number(giaTienDaLamSach) * (100 - Number(giamGiaDaLamSach))) / 100;
console.log("Cách 1 (tách bước):", giaMongDoi);

// Đúng: Viết gộp (method chaining) cho ngắn gọn. Logic y hệt cách trên.
// Góp ý nhỏ: Viết gộp 1 dòng dài thế này khó đọc hơn. Khi mới học nên ưu tiên
//        cách tách bước (dòng 21-23) cho dễ debug. Gộp chỉ nên dùng khi chuỗi
//        ngắn và rõ ràng.
let giaMongDoi1 =
  (Number(giaTien.replaceAll(".", "").replace(" đ", "")) *
    (100 - Number(giamGia.replace("%", "")))) /
  100;
console.log("Cách 1 (gộp):", giaMongDoi1);

// *** Cách 2: Dùng regex để tách số ***
// Đúng về ý tưởng: match(/\d+/g) lấy tất cả cụm chữ số -> join("") -> chuỗi số sạch.
//        Với "1.000.000 đ" -> ["1","000","000"] -> "1000000". Khá thông minh.
// Góp ý: regex đang KHÔNG được dạy trong bài 2 (bài mới học replace/replaceAll/
//        trim/Number...). Khi còn ở giai đoạn BASIC, nên ưu tiên cách 1 (dùng
//        replace/replaceAll) vì sát kiến thức đã học, dễ giải thích. Regex sẽ
//        học sau, dùng ở đây có thể làm bạn khó tự bảo vệ code của mình.
//        Ngoài ra giaSauGiam1 được tách ra nhưng KHÔNG được dùng -> biến thừa.
let giaTien1 = giaTien.match(/\d+/g).join("");
let giamGia1 = giamGia.match(/\d+/g).join("");
let giaSauGiam1 = giaSauGiam.match(/\d+/g).join("");

let giaMongDoi2 = (Number(giaTien1) * (100 - Number(giamGia1))) / 100;
console.log("Cách 2 (regex):", giaMongDoi2);

// ============================================================
// TỔNG HỢP REVIEW — BÀI 1
// ============================================================
// Kết quả: Gần đạt về logic (giá mong đợi = 800000 đúng), NHƯNG file gốc
//          KHÔNG CHẠY được do khai báo trùng tên biến (giaTien, giamGia,
//          giaMongDoi1). Đây là lỗi cú pháp nghiêm trọng cần sửa trước.
//
// Điểm tốt:
//   - Nắm rõ cách làm sạch chuỗi tiền: replaceAll(".") + replace(" đ") + Number().
//   - Công thức giá mong đợi đúng: giaGoc * (100 - giamGia) / 100.
//   - Biết 2 cách tiếp cận (replace và regex) -> tư duy linh hoạt.
//   - Có viết gộp method chaining để rút gọn.
//
// Cần cải thiện:
//   - LỖI CHẠY: Khai báo trùng tên biến (let giaTien 2 lần, let giamGia 2 lần,
//     let giaMongDoi1 2 lần) -> SyntaxError. Sửa bằng cách xoá bản trùng, hoặc
//     bọc mỗi "Cách" vào 1 khối { }:
//         {
//           let giaTien = "1.000.000 đ";
//           ... cách 1 ...
//         }
//         {
//           let giaTien = "1.000.000 đ";
//           ... cách 2 ...
//         }
//   - Dùng regex chưa phù hợp giai đoạn BASIC (chưa học). Nên dùng cách 1.
//   - Biến giaSauGiam / giaSauGiam1 được khai báo nhưng không dùng -> thừa,
//     nên xoá hoặc dùng để kiểm tra (ví dụ so sánh giá mong đợi với giá sau
//     giảm trong đề).
//   - Nên ưu tiên cách tách bước (dễ đọc, dễ debug) hơn cách gộp 1 dòng dài.
// ============================================================

//Bài 2
// Đề: từ các chuỗi bẩn, in ra hóa đơn:
//   HÓA ĐƠN THANH TOÁN - ID: #0002
//   Sản phẩm: MACBOOK PRO M3
//   Đơn giá: 30000000
//   Số lượng: 2
//   Tổng tiền (Gốc): 60000000
//   Giảm giá: 10%
//   THÀNH TIỀN: 54.000.000 VNĐ

let tenSanPham = "   macbook pro m3   ";
let giaGoc = "Price: 30,000,000 vnđ";
let soLuong = "Sl: 2 máy";
let maGiamGia = "DISCOUNT CODE: 10% OFF";
let maHoaDon = "#0002";

// Đúng: trim() bỏ dấu cách 2 đầu, toUpperCase() in hoa -> "MACBOOK PRO M3". Khớp đề.
let tenSanPham1 = tenSanPham.trim().toUpperCase();
// Đúng: Bỏ "Price:", "vnđ", rồi replaceAll(",", "") bỏ dấu phẩy phân cách ->
//        "30000000", Number() -> 30000000. Method chaining gọn và đúng.
let giaGoc1 = Number(
  giaGoc.replace("Price:", "").replace("vnđ", "").replaceAll(",", "").trim(),
);
// Đúng: Bỏ "Sl:", "máy", trim -> "2", Number -> 2.
let soLuong1 = Number(soLuong.replace("Sl:", "").replace("máy", "").trim());
// Đúng: Bỏ "DISCOUNT CODE:", "% OFF", trim -> "10", Number -> 10.
let maGiamGia1 = Number(
  maGiamGia.replace("DISCOUNT CODE:", "").replace("% OFF", "").trim(),
);
// Đúng: tongTienGoc = donGia * soLuong = 60000000. Đúng công thức.
let tongTienGoc = giaGoc1 * soLuong1;
// Đúng: thanhTien = tongTienGoc * (1 - 10/100) = 54000000. Đúng công thức.
let thanhTien = tongTienGoc * (1 - maGiamGia1 / 100);

console.log(`HÓA ĐƠN THANH TOÁN - ID: ${maHoaDon}`);
// BUG: Dòng "Sản phẩm: ${tenSanPham1}" bị LẶP 2 LẦN trong template literal.
//        Đề chỉ yêu cầu in 1 dòng "Sản phẩm: MACBOOK PRO M3".
//        Em viết nhầm, dòng 71-72 có 2 nhãn "Sản phẩm:" liền nhau -> output
//        sẽ in 2 dòng Sản phẩm. Cần xoá 1 dòng.
// Ngoài ra: Đề in "Đơn giá: 30000000" (số, không format), em ghi "Đơn giá: ${giaGoc1} VNĐ"
//        -> ra "Đơn giá: 30000000 VNĐ" (thừa chữ VNĐ so với đề). Nên bỏ " VNĐ"
//        hoặc nhất quán với dòng THÀNH TIỀN (dòng đó có VNĐ).
//        Đây là lỗi FORMAT nhỏ, không ảnh hưởng logic.
console.log(`Sản phẩm: ${tenSanPham1}
Sản phẩm: ${tenSanPham1}
Đơn giá: ${giaGoc1} VNĐ
Số lượng: ${soLuong1}
Tổng tiền (Gốc): ${tongTienGoc}
Giảm giá: ${maGiamGia1}%
THÀNH TIỀN: ${thanhTien.toLocaleString("vi-VN")} VNĐ`);

// ============================================================
// TỔNG HỢP REVIEW — BÀI 2
// ============================================================
// Kết quả: Logic tính toán ĐÚNG (đơn giá 30tr, tổng gốc 60tr, thành tiền 54tr),
//          nhưng OUTPUT SAI FORMAT so với đề:
//            - Dòng "Sản phẩm:" bị in 2 lần (viết nhầm lặp lại trong template).
//            - Dòng "Đơn giá" thừa chữ "VNĐ" so với đề (đề chỉ in "Đơn giá: 30000000").
//
// Điểm tốt:
//   - Làm sạch chuỗi rất tốt: biết dùng replace + replaceAll + trim + Number
//     cho từng trường (giá gốc có dấu phẩy, số lượng có chữ "máy", mã giảm
//     giá có "DISCOUNT CODE:" và "% OFF").
//   - toUpperCase + trim cho tên sản phẩm đúng yêu cầu.
//   - Công thức thành tiền đúng: tongTienGoc * (1 - giamGia/100).
//   - Dùng toLocaleString("vi-VN") cho THÀNH TIỀN -> ra "54.000.000", khớp đề.
//
// Cần cải thiện:
//   - SỬA OUTPUT: xoá 1 dòng "Sản phẩm:" bị lặp (chỉ giữ 1 dòng).
//   - SỬA OUTPUT: dòng "Đơn giá" bỏ chữ " VNĐ" để khớp đề
//       ("Đơn giá: 30000000" thay vì "Đơn giá: 30000000 VNĐ").
//   - (nhỏ) Đề ghi "Đơn giá: 30000000" không có format dấu chấm, nhưng nếu
//     muốn đẹp và nhất quán có thể để nguyên số (Number) như em đang làm.
//
// Tổng kết: Tư duy làm sạch chuỗi tốt, nắm vững replace/replaceAll/Number.
//           Cần chú ý kiểm tra output có khớp đề không (lặp dòng, thừa chữ).
// ============================================================
