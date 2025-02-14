# HƯỚNG DẪN SETUP

Chọn một tệp tin trống. Mở nó trong vscode và clone repository về bằng lệnh: 
```bash
git clone https://github.com/22010176/AnToanVaBaoMatThongTin.git .
```
Sau khi clone repository về, để cài đặt các tập tin cần thiết, sử dụng lệnh:
```bash
npm run init
```
Câu lệnh sẽ tự động cài đặt dependencies và các file môi trường.

Sau khi hoàn thành, muốn khởi động chương trình, sử dụng lệnh:
```bash
npm start
```
## Các lệnh khác
- `npm run reset`: Cài đặt lại cơ sở dữ liệu cho orm prisma.
- `npm run migrate`: Đồng bộ code trong prisma sang hệ cơ sở dữ liệu.