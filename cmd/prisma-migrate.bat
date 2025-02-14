cd ../

IF EXIST ./prisma/migrations (
  START /WAIT rm -rf ./prisma/migrations
)

npx prisma migrate dev --name init