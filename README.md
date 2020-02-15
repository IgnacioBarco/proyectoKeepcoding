# proyectoKeepcoding


cd wallaAPI
npm install

npm run installDB

npm run start

npm run dev


POST:
http://localhost:8080/auth/login
http://localhost:8080/auth/register

http://localhost:8080/private/ad/new
http://localhost:8080/private/user/new


PUT:
http://localhost:8080/private/ad/:id/modify
http://localhost:8080/private/user/:name/modify


DELETE:
http://localhost:8080/private/ad/:id/delete
http://localhost:8080/private/user/:name/delete


GET:
* http://localhost:8080/public/ads
* http://localhost:8080/public/ads/tags
* http://localhost:8080/public/ads/:id
* http://localhost:8080/public/user/pepe


http://localhost:8080/private/ads

http://localhost:8080/private/user/:name
    http://localhost:8080/private/user?nombre=pepe

http://localhost:8080/private/users
http://localhost:8080/private/users/:name
http://localhost:8080/private/users/online