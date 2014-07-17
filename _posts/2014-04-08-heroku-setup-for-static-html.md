---
layout: post
title:  "Heroku Setup for Static HTML"
date:   2014-04-08 13:23:45
categories: prototyping heroku
---

# Sets Up Static Heroku App with password protection via PHP Buildpack and htaccess

Ever have a quick, static HTML site you want to host on Heroku? Well, you can -- and quite easily too.

Using Heroku Buildpacks, you can 

1. Create your project directory and project files
2. Create your Git repo as per normal.
3. Setup Heroku, PHP Buildpack, and .htaccess protection

    heroku create --remote
    heroku config:set BUILDPACK_URL="https://github.com/digitalpulp/heroku-buildpack-php.git"
    touch index.php
    heroku config:set ACCESSFILENAME=.htaccess
    touch .htaccess-staging
        # Fill it with this, minus this comment
        AuthUserFile /app/www/.htpasswd
        AuthType Basic
        AuthName "Restricted Access"
        Require valid-user
    htpasswd -bc .htpasswd <username> <password>
    git add .
    git commit -m "Initial commit! Sets up app and links it to Heroku."
    git push heroku