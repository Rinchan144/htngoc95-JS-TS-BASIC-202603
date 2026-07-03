// Bài 1: Kiểm tra API response, tìm field rỗng + sai kiểu, đếm tổng lỗi.
// Đúng: Dữ liệu apiResponse có đủ các case cần test: email = null, isActive
//        là string (sai kiểu), phone = "" (rỗng), role bình thường. Tốt.
let apiResponse = {
  userId: 101,
  username: "neko_tester",
  email: null, // Bug: phải là boolean, không phải string  <- comment đúng
  isActive: "true", // Bug: phải là boolean, không phải string
  phone: "",
  role: "admin",
};

// Đúng: Khởi tạo errorCount = 0 trước vòng lặp, sẽ cộng dồn mỗi lần phát hiện lỗi.
let errorCount = 0;

// Đúng: for...in để duyệt qua từng KEY của object. Đây đúng cách duyệt object.
//        Dùng for...in thay vì for...of vì for...of không chạy được với object
//        thường. Lựa chọn vòng lặp rất đúng.
for (let key in apiResponse) {
  let value = apiResponse[key];
  // Đúng: isEmpty = null HOẶC "" (chuỗi rỗng). Hai trường hợp rỗng theo yêu cầu.
  //        Lưu ý: 0 và false KHÔNG bị tính rỗng ở đây (em dùng === nên an toàn).
  let isEmpty = value === null || value === "";

  // Đúng: Nếu rỗng -> cảnh báo + tăng errorCount. Dùng console.warn đúng mức.
  if (isEmpty) {
    console.warn(`Cảnh báo: Trường "${key}" rỗng.`);
    errorCount++;
  }

  // Đúng: Kiểm tra riêng cho key "isActive": typeof phải là "boolean".
  //        Ở đây isActive = "true" (string) -> typeof !== "boolean" -> báo sai kiểu.
  // Đúng: 2 lỗi (rỗng + sai kiểu) được kiểm tra ĐỘC LẬP, nếu 1 field vi phạm cả
  //        2 quy tắc thì cộng 2 lần. Khớp yêu cầu "1 lỗi = 1 lần vi phạm 1 quy tắc".
  let isWrongType = key === "isActive" && typeof value !== "boolean";
  if (isWrongType) {
    console.warn(`Cảnh báo: Trường "${key}" sai kiểu dữ liệu.`);
    errorCount++;
  }
}

// Đúng: In tổng số lỗi = 3 (email rỗng, phone rỗng, isActive sai kiểu). Khớp đề.
console.log(`Tổng số lỗi tìm được: ${errorCount}`);

// ============================================================
// TỔNG HỢP REVIEW — BÀI 1 (HW-4)
// ============================================================
// Kết quả: ĐẠT — output khớp 100% với đề (3 lỗi: email rỗng, phone rỗng,
//          isActive sai kiểu).
//
// Điểm tốt:
//   - Dùng đúng for...in để duyệt object (for...of không dùng được với object).
//   - isEmpty kiểm tra cả null và "" bằng === -> an toàn, không bắt nhầm 0/false.
//   - Kiểm tra rỗng và sai kiểu ĐỘC LẬP, mỗi vi phạm cộng 1 lỗi -> đúng tinh
//     thần "1 lỗi = 1 lần vi phạm 1 quy tắc".
//   - isWrongType gắn điều kiện key === "isActive" && typeof !== "boolean"
//     -> chỉ kiểm tra kiểu với đúng field yêu cầu.
//   - Dùng console.warn cho cảnh báo (đúng mức log).
//
// Cần cải thiện:
//   - (nhỏ) 2 nhánh if (isEmpty, isWrongType) viết riêng rất dễ đọc. Nếu muốn
//     gọn có thể gộp, nhưng cách hiện tại rõ ràng nhất -> nên giữ.
//   - (nhỏ) Nên thêm comment phân tách Bài 1 / Bài 2 rõ hơn để code dễ theo dõi.
//
// Tổng kết: Bài 1 hoàn hảo, nắm chắc for...in và tư duy đếm lỗi độc lập.
// ============================================================

// Bài 2: Duyệt danh sách URL test, bỏ qua URL rỗng, dừng khi gặp status 500.
// Đúng: Dữ liệu testUrls có đủ case: url rỗng, status 500, các url bình thường.
let testUrls = [
  { url: "/api/users", status: 200 },
  { url: "", status: null },
  { url: "/api/products", status: 200 },
  { url: "/api/orders", status: 500 },
  { url: "/api/reviews", status: 200 },
];

// Đúng: testedCount đếm số URL đã test (không tính URL bị bỏ qua).
let testedCount = 0;
// Đúng: Dùng for cổ điển với index để duyệt mảng. Hoàn toàn ổn cho bài này.
for (let i = 0; i < testUrls.length; i++) {
  // Đúng: Destructuring { url, status } từ object -> gọn, dễ đọc.
  let { url, status } = testUrls[i];
  // Đúng: url === "" -> cảnh báo + continue (bỏ qua, không tăng testedCount).
  //        Đúng yêu cầu dùng continue cho URL rỗng.
  if (url === "") {
    console.warn("Cảnh báo: URL rỗng.");
    continue;
  }

  // Đúng: status === 500 -> lỗi nghiêm trọng + break (dừng ngay). Đúng yêu cầu.
  //        Đúng THỨ TỰ: kiểm tra rỗng trước (continue), rồi mới kiểm tra 500
  //        (break). Nếu để ngược lại, URL rỗng có status null không bị bỏ qua.
  if (status === 500) {
    console.error("Lỗi nghiêm trọng: Server trả về lỗi 500.");
    break;
  }

  // Đúng: URL bình thường -> in PASS và tăng testedCount.
  console.log(`PASS: ${url}`);
  testedCount++;
}

// Đúng: In tổng số URL đã test = 2 (/api/users, /api/products). Khớp đề.
//        (URL rỗng bị continue -> không đếm; /api/orders có 500 -> break trước
//        khi đếm; /api/reviews không kịp duyệt vì đã break.)
console.log(`Tổng số URL đã test được: ${testedCount}`);

// ============================================================
// TỔNG HỢP REVIEW — BÀI 2 (HW-4)
// ============================================================
// Kết quả: ĐẠT — output khớp 100% với đề (PASS /api/users, cảnh báo URL rỗng,
//          PASS /api/products, lỗi 500, tổng = 2).
//
// Điểm tốt:
//   - Dùng continue đúng chỗ (URL rỗng -> bỏ qua, không đếm).
//   - Dùng break đúng chỗ (status 500 -> dừng ngay).
//   - THỨ TỰ kiểm tra đúng: rỗng (continue) trước, 500 (break) sau. Nếu ngược
//     sẽ sai logic (URL rỗng status null không bị bỏ qua).
//   - Dùng destructuring { url, status } -> code gọn, dễ đọc.
//   - testedCount chỉ tăng cho URL bình thường -> đúng yêu cầu đếm.
//   - Dùng console.warn cho cảnh báo, console.error cho lỗi nghiêm trọng (đúng mức).
//
// Cần cải thiện:
//   - (nhỏ) Có thể dùng for...of thay cho for + index vì không cần index:
//       for (let { url, status } of testUrls) { ... }
//     Cách này gọn hơn và đúng tinh thần "lặp qua từng phần tử". Nhưng for
//     cổ điển hiện tại vẫn hoàn toàn đúng.
//   - (nhỏ) Tên file gốc "HW-4(not-completed).js" -> đổi tên thành "HW-4.js"
//     vì thực tế 2 bài đều hoàn thành và chạy đúng.
//
