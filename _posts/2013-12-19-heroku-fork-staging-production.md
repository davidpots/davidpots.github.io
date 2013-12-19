---
layout: post
title:  "Heroku Fork! How to run a Staging and Production server at the same time"
date:   2013-12-19 08:48:48
categories: tutorial git heroku
---

Here's a quick post outlining how I forked one of my existing Heroku projects to create a separate staging server (where I could secretly push & deploy changes while finalizing a big redesign). What follows is me simply following many of the steps I put together after reading these articles:

- [http://blog.alexmaccaw.com/heroku-staging](http://blog.alexmaccaw.com/heroku-staging)
- [https://devcenter.heroku.com/articles/multiple-environments](https://devcenter.heroku.com/articles/multiple-environments)
- [https://devcenter.heroku.com/articles/fork-app](https://devcenter.heroku.com/articles/fork-app)

### Help, I need a staging server!

For the last year I've been running [my Songnotes project](http://www.songnotes.cc) on Heroku, quite happily in fact. But recently, I had a bit of a dilemma: I had a sizable redesign in mind, one that would gut most of the front-end code and probably take many, many hours to complete. I knew doing the redesign bit-by-bit on my existing Heroku production site would be bad, since things would require a bit of testing. 

I wondered: is there a way for me to keep my existing Heroku production app (which was getting a fair bit of daily traffic), while also creating a new Heroku staging app I could secretly test on? Could I have both of these, and selectively push/deploy to each during this redesign process? Thankfully, the answer is yes! Here's how I did it.

### Fork your existing Heroku app

After finding some helpful articles on the topic (linked above), I learned the first step was for me to fork my existing Heroku app. To browse your existing Heroku apps (by their proper name) from the command line, run:

    heroku apps

...and they'll all display. To fork my app named `songnotes` and create a new app called `songnotes-staging`, I ran the following:

    heroku fork -a songnotes songnotes-staging

Easy enough. The new app can be viewed online immediately at `http://songnotes-staging.herokuapp.com`. 

### Next, some Git setup

Next, we have to tell our project's Git installation about the new Heroku app. I got the following URL (for the new app's Heroku git repo) from Heroku.com, while browsing the settings for my new app. I added it to my `.git/config` by running this:

    git remote add staging git@heroku.com:songnotes-staging.git

While we do have a new Heroku app created, we'll likely want to switch away from our master Git branch and do our new work in its own, new branch. Given that my project's codename was "Birthday", I created a new git branch from master by running:

    git co -b birthday

And after we make code changes we want to deploy to Heroku, we have to tell Heroku which app to push to with this code. Note the branchname specification at the end of the command: the first branch is telling git which local branch to push *from*, and the second paramater is which remote (Heroku) branch to push *to*.

    git push staging birthday:master
    
So, the command above is deploying to my Heroku app *staging*, using changes from my local branch *birthday*, and pushing to the remote Heroku branch *master*. 

### Staging server, online!

After the deploy, you can use the typical `heroku open` command to open the Heroku app in your browser, though you'll need to tell Heroku which app to open:
    
    heroku open --app songnotes-staging

Finally, keep in mind your staging app will be publicly accessible out of the gate. You may want to update robots.txt so your site isn't scraped, disable Google Analytics, and possibly add a password so the public can't easily access your in-progress work (if you don't want them to).

Otherwise, I hope this was helpful.