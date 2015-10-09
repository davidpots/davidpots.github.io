---
layout: post
title:  "Heroku Setup for Static HTML"
date:   2014-04-08 13:23:45
categories: prototyping heroku
---

### Sets Up Static Heroku App with password protection via PHP Buildpack and htaccess

Ever have a quick, static HTML site you want to host on Heroku? Well, you can -- and quite easily too.

Using Heroku Buildpacks, you can:

- Create your project directory and project files.
- Create your Git repo as per normal.
- Setup Heroku, PHP Buildpack, and .htaccess protection.

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

### UPDATE (October 2015)

Trying to do this again in October 2015, I learned the instructions above didn't work any longer. Using them as a starting point, I did the following -- which ultimately worked. Still TBD is figuring out which of the things below did the trick. Also, I need to make sure I'm not neglecting to include important steps in the new notes below. Will do that all in time.

#### Prob not necessary -- but I did all this. I would skip next time when testing it out.
https://donatstudios.com/PHP-in-OS-X-Yosemite

#### Set the new buildpack
https://github.com/heroku/heroku-buildpack-php

### Remove WWW from the htaccess file
Using this as a guide, I eventually removed the `www` from the .htaccess directory (https://gist.github.com/bbrewer97202/3316425). That made it work.

### Make the index.php redirect to index.html
I made the file look  like this:

    <?php
    /* Redirect browser */
    header("Location: /index.html");

    /* Make sure that code below does not get executed when we redirect. */
    exit;
    ?>
