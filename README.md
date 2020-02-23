# proyectoKeepcoding

Video: https://youtu.be/IX5HnaPO9xw

cd wallaAPI
npm install

npm run installDB

npm run start


cd wallaReact
npm start


## AUTORIZACIÓN:
POST:
* http://18.222.10.183:8080/auth/login
* http://18.222.10.183:8080/auth/register


USUARIOS:
POST:
http://18.222.10.183:8080/private/user/new

PUT:
http://18.222.10.183:8080/private/user/:name/modify

DELETE:
http://18.222.10.183:8080/private/user/:name/delete

GET:
* http://18.222.10.183:8080/public/user/pepe
* http://18.222.10.183:8080/private/users
* http://18.222.10.183:8080/private/users/:name
* http://18.222.10.183:8080/private/users/online


## ANUNCIOS:
POST:
* http://18.222.10.183:8080/private/ads/new

PUT:
* http://18.222.10.183:8080/private/ads/:id/modify

DELETE:
* http://18.222.10.183:8080/private/ads/:id/delete

GET:
* http://18.222.10.183:8080/public/ads
* http://18.222.10.183:8080/public/ads/tags
* http://18.222.10.183:8080/public/ads/:id



