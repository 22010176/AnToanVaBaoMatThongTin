cd ../

@echo off
set "envFile=.env"

set "certFolder=certificate"
set "keyFile=certificate/key.key"
set "certFile=certificate/certificate.crt"

if exist %envFile% ( 
    rm -rf %envFile%
)

echo # Sửa lại theo dữ liệu cá nhân >> %envFile%
echo # database://user:password@host:port/database >> %envFile%
echo MYSQL_URL="mysql://root:admin@localhost:3306/test" >> %envFile%
echo POSTGRES_URL="postgresql://postgres:admin@localhost:5432/test" >> %envFile%
echo MODE="development" >> %envFile%
echo PORT=443 >> %envFile%
echo PRIVATE_KEY_PATH=%keyFile% >> %envFile%
echo CERTIFICATE_PATH=%certFile% >> %envFile%

@echo on
rm -rf %certFolder%

mkdir %certFolder%
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout %keyFile% -out %certFile%
