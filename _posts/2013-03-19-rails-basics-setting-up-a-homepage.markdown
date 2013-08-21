---
layout: post
title:  "Rails Basics: Setting Up a Homepage"
date:   2013-03-19 09:33:00
categories: rails tutorial development
---

Here's a quick tutorial on setting up a simple homepage to the Rails project you just created. This is a great early exercise to get familiar with if you're new to Rails and want to go through the motions a few times with wiring things together.

This tutorial assumes you have your development environment setup: Rails, rubygems, etc. If you don't, ask a friend or refer to [this guide](http://ruby.railstutorial.org/ruby-on-rails-tutorial-book#sec-development_tools).

### 1. Create a rails app

First, you have to create a new rails app. In terminal, move to the directory where you want to keep your projects and run these commands:

    rails new app_name
    cd app_name
    rails s

Voila, you have created a vanilla Rails app and should have it running locally. When you load your app in your browser by loading `http://localhost:3000`, you'll notice the default stock Rails homepage. You'll want to change this. Here's how.

### 2. Delete the default homepage file

By default, the file `index.html` in the `public` directory is the out-of-the-box homepage. Delete this file (via text editor, command line, Finder, etc).

### 3. Add your new homepage file

Next you'll need to create a directory and file for your new homepage. We're going to create a _pages_ directory that is perfect for the homepage, and can also be used for pages such as _about_, _contact_, etc.

1. Add a directory `pages` into your `app/views` directory
2. Add a file `home.html.erb` into your `app/views/pages` directory
3. Give `home.html.erb` some basic text (e.g., "Hello World") so you can identify it when it loads

### 4. Wire up the Pages controller

Next, add a file `pages_controller.rb` into your `app/controllers` directory. Open up this file and fill it with this:

    class PagesController < ApplicationController
      def home
      end
    end

### 5. Tweak the routes file

Finally, open up the routes file and add this line:

    root to: 'pages#home'

And that's it! Now if you load `http://localhost:3000` your new homepage will show up. Have at it.