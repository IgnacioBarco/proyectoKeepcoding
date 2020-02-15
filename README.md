# proyectoKeepcoding


cd wallaAPI
npm install

npm run installDB

npm run start

npm run dev


## AUTORIZACIÓN:
POST:
* http://localhost:8080/auth/login
* http://localhost:8080/auth/register


USUARIOS:
POST:
http://localhost:8080/private/user/new

PUT:
http://localhost:8080/private/user/:name/modify

DELETE:
http://localhost:8080/private/user/:name/delete

GET:
* http://localhost:8080/public/user/pepe

http://localhost:8080/private/user/modify/:name
http://localhost:8080/private/user/delete/:name

* http://localhost:8080/private/users
* http://localhost:8080/private/users/:name
* http://localhost:8080/private/users/online


## ANUNCIOS:
POST:
* http://localhost:8080/private/ads/new

PUT:
* http://localhost:8080/private/ads/:id/modify

DELETE:
* http://localhost:8080/private/ads/:id/delete

GET:
* http://localhost:8080/public/ads
* http://localhost:8080/public/ads/tags
* http://localhost:8080/public/ads/:id
