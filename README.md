## System Requirements

* Ubuntu 22.04 EC2 instance
* [Docker Engine](https://docs.docker.com/engine/install/ubuntu/)
* [Node v16.18](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
* Optional [NVM](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/)
* [Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04) for reverse proxy

## Pre-Requistes
Ensure you have [adopt-me-backend](https://github.com/e0202709/adopt-me-backend) up and running


## Setup
Connect to the EC2 instance (it should look like ubuntu22-sutd-student-6) either via SSH or using the AWS console directly
Change directory into your nginx file, it is either located in paths: /usr/local/nginx/conf , /etc/nginx , or /usr/local/etc/nginx .

run 
```
/etc/nginx/sites-enabled
```
run 
```
sudo nano default
```
add these lines into the nginx config file
```
server {
        listen 3000;
        server_name student-6.sutdacademytools.net;
        location / {
                proxy_pass http://student-6.sutdacademytools.net:3000/;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;

        }
}

```
Save and exit by `Ctrl-O` and `Ctrl-X`

Clone this repo into a fresh Ubuntu 22.04 EC2 instance

run 
``` 
cd adopt-me
```

run
```
docker build -t adopt-me .
```
to build a new container image
and all relevant dependencies will be installed automatically in the container environment


Start your container using by running the command
`docker run -dp 3000:3000 adopt-me`

## Viola!
To test that your backend application is up and running, visit http://student-6.sutdacademytools.net to view it in your browser.
