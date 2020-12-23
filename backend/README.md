
# Schedule Your Ride
This folder contains the backend code for the SY-Uber app. 

## Backend Stack
* Sailsjs
* Passportjs
* MongoDB

## Installing on Ubuntu Server

### Add nodesource PPA, so we can install the latest nodejs
```
Note the new setup script name for Node.js v0.12
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
```
### Install nodejs
```
sudo apt-get install nodejs
(Make sure nodejs and npm command are available once the above installation is complete)
```

### Install Git, so that you can pull the code
``` sudo apt-get install git ```

### Checkout the code from git
```
cd /opt
sudo git clone https://github.com/hbanavar/sy-uber.git
```
### Install build-essentials (May be needed for bson and mongodb packages)
``` sudo apt-get install build-essential ```

### Install sailsjs globally
``` sudo npm -g install sails```

### Install modules
```
cd /opt/sy-uber/backend/
sudo npm install
```

### Install MongoDB
Follow instructions on http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

## Using APIs ##
### Authentication ###
To use the APIs from this service, you will first need to authenticate using your Uber credentials. 
* Visit `https://<host>/auth/uber`
* Authenticate using your Uber account
* On successful signin, the response will include the uber profile information and the response headers will include 'x-access-token'. 

### Stateless API ###
Once you have authenticated, use the returned token as a bearer token. The bearer token should be included in the authorization header for EACH API call.
```
Authorization: bearer <token>
```



