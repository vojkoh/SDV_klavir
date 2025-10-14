# ŠDV klavirski urnik

Študenti bi radi vadili, a koordinacija zna biti težavna. Morda jim pričujoča aplikacija pri tem malo pomaga.

## Deployment

### Develpoment

1. `docker compose up db -d`
2. `cd backend` & `npm run dev`
3. `cd frontend/SDV_klavir` & `npm run start`
4. navigate to [localhost:4200](http://localhost:4200)

### Production

#### First time

First you need to generate certificates for SSL. Make sure domain zmajkotrek.si is pointing to your remote machine.
1. clone this project to remote machine
2. comment out the first server block of [nginx.conf](/frontend/SDV_klavir/nginx.conf)
3. (create directory `/var/www/certbot`)... idunno if needed, won't hurt
4. `docker compose up -d`
5. install `certbot`, instructions [here](https://certbot.eff.org/instructions?ws=other&os=snap)
6. `docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d zmajkotrek.si`
7. If successfull: `docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d zmajkotrek.si`
8. Uncomment first server block for nginx.
9. `docker compose restart`

That's actually it. Your app should be running on [zmajkotrek.si](https://zmajkotrek.si)

#### Fixes

Images should be built on local machine and pushed onto Docker Hub by running scripts [push-backend.sh](/backend/push-backend.sh) and [push-frontend.sh](/frontend/SDV_klavir/push-frontend.sh). Only the images that contain changes need to be built and pushed!
On the remote machine, following commands should be run:
```
docker compose down
docker compose pull
docker compose up
```

## TO-DO
#### TO-DO: additional features (unreserving permanent)
#### TO-DO: docs for backend
#### TO-DO: day=7 leak!!!



