---
layout: post
title:  "Git Basics: Adding a Rails Project to Github"
date:   2013-03-21 08:51:00
categories: rails tutorial development git
published:false
---

Here is a quick, simple tutorial on the steps required to get a new Rails project added to your Github account. Github is a marvelous resource you should certainly be using if you're messing with Rails. If you're branding stinking new to Git and don't have it setup on your machine, check out this Treehouse guide to [Git for Designers](http://blog.teamtreehouse.com/git-for-designers-part-1) or refer to the official [Git homepage](http://www.git-scm.com/book/en/Getting-Started-Installing-Git).

This tutorial assumes you have your development environment setup: git, Rails, rubygems, etc. If you don't, ask a friend or refer to [this guide](http://ruby.railstutorial.org/ruby-on-rails-tutorial-book#sec-development_tools).

### 1. Create a rails app

First, you have to create a new rails app. In terminal, move to the directory where you want to keep your projects and run these commands:

    rails new app_name
    cd app_name

Voila, you have created a vanilla Rails app. Now let's get a Git repository setup.

### 2. Create a github repo

A git repository (repo) is the online location where our project's source files will live. Setting up a new repository is easy:

1. Visit github.com and login (create an account if you're new).
2. Create a new repository. Name it whatever you want.

Nice and easy. Now, we have to point our Rails project to the repo we just created.

### 3. Initiate git in your app directory

In terminal, change into your new Rails project's directory and run the following commands one-at-a-time. This will setup git, add your first commit of code, and properly link your Rails project to your github.com repository.

    git init
    git add .
    git commit -m "First commit."
    git remote add origin git@github.com:davidpots/sandbox4.git
    git push -u origin master

That's it! Now, as you make changes to your Rails project, you'll typically commit your changes using the following flow:

    git add .
    git commit -m "Made changes to this and that"
    git push

And just like that, whatever changes you made will be saved and backed up on github.com.