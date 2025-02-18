cd ../

envFile=".env"
certFolder="certificate"
keyFile="certificate/key.key"
certFile="certificate/certificate.crt"

if [ -e "$envFile" ]
then
    rm -rf "$envFile"
else
    cat > $"envFile" << EOL
# Sửa lại theo dữ liệu cá nhân 
# database://user:password@host:port/database 
MYSQL_URL="mysql://root:admin@localhost:3306/test" 
POSTGRES_URL="postgresql://postgres:admin@localhost:5432/test" 
MODE="development" 
PORT=443 
PRIVATE_KEY_PATH=certificate/key.key 
CERTIFICATE_PATH=certificate/certificate.crt 
EOL
fi