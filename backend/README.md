
#Scedule Your Ride

##Backend Stack
* Sailsjs
* Passportjs
* MongoDB

##Installing on Ubuntu Server

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
