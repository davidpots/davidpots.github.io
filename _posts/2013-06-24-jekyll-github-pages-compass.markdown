---
layout: post
title:  "Setting up Jekyll, Compass, and Github Pages"
date:   2013-06-24 22:35:00
categories: jekyll tutorial git
---

This is a walkthrough of how I setup a fresh Jekyll installation, add Compass for SCSS/SASS, and then deploy it to Github Pages. For me, this trifecta seems like tremendously valuable tool to have in the arsenal when it comes to rapid prototyping and simple site creation. I plan on using this platform for my own personal website + blog, but you could also use this for hosting micro-sites or any sort of basic prototype (mobile, etc) you have in mind.

If this sounds interesting, I hope this will be of help to you. I document a few solutions to snags I ran into along the way -- I hope this saves you some time. Good luck!

## Setting up Jekyll

First, make sure you have the Jekyll gem.

    gem install jekyll

Then, open up terminal and move into your project directory. Create a new Jekyll project like below ("pages3" is the illustrious name of the installation I'll be creating):

    jekyll new pages3

That was easy. Now, move into the `pages3` directory and boot 'er up.

    cd pages3
    jekyll serve

Great, here you are. You can view your out-of-the-box site by pointing your browser to `http://localhost:4000`. At this point, the app is ready to publish new blog posts and there is plenty of customization you can add... refer to the docs for more information there. But for this lesson, we're going to move on to setting up Compass/SASS as well as hosting via Github Pages.

## Setting up Compass/SCSS

First, make sure you have the Compass gem.

    gem install compass

Then, you'll want to create a Compass instance within your existing Jekyll app's directory. From the Jekyll app's directory, run this command from terminal:

    compass create .

Next, a few tweaks you'll need to make to the default Compass files and folders that were just created. Perform these steps:

1. Rename the `sass` folder to be `_sass`
2. Delete the `stylesheets` folder that Compass created (for now we'll use Jekyll's default `css` folder for our CSS)
3. Move your Compass `config.rb` file into the `_sass` folder
4. Create a folder `_plugins` in your root Jekyll directory, and paste the contents of [this gist](https://gist.github.com/davidpots/5853188) into a new file called `generator_scss.rb`. Make sure this file is created inside your new `plugins` directory.

Now we need to open up the Compass `config.rb` document and make some tweaks. You'll want to be sure everything is wired up correctly (i.e., so Compass knows where to find everything within the Jekyll ecosystem). Make your `_sass/config.rb` file look like this:
  
    http_path = "/"
    sass_dir = "./"
    css_dir = "../css"
    images_dir = "../img"
    javascripts_dir = "../js"
    relative_assets = true
  
That's it... Compass is now hooked up and ready. To make it take effect so we can see our new styles in action, we'll need to do a few things.

First, restart the server with a `-w` at the end. This will keep an eye on any SCSS changes you make and update the CSS on the fly.

    jekyll serve -w

Second, you'll need to tell Jekyll to follow the commands of the specific stylesheets that are SCSS enabled. Here, we'll open up `_layouts/default.html` and add this line:

    <!-- SCSS, baby -->
    <link rel="stylesheet" href="/css/screen.css">

This will take any styles in your `_sass/screen.scss` file and make sure Jekyll sees the compiled CSS version that Compass creates. In my `_sass/screen.scss` file I'll typically do something obvious such as `body { background: yellow; }` and make sure it works when the page loads.

And if you refresh your page and view source (or make an obvious change in `screen.scss`, you'll see it worked! Voila.

## Setting up Github Pages

Next, I'll show how to take your Jekyll site and have it hosted on Github Pages, which lets anyone visit it from their browser. For free. This is handy for many reasons (hosting smaller sites, prototype testing, testing on mobile, etc).

#### Setup a Git Repo

First, log in to github.com and create a new repo for your project. I'm going to use "pages3" to match my Jekyll app. With terminal pointed to your Jekyll project folder, setup git:

    git init
    git add .
    git commit -m "First commit"
    git remote add origin git@github.com:USERNAME/REPO_NAME.git
    git push -u origin master

Now, just like normal, your folder of content is saved to a repo on github. This is nothing new so far. But from here, you'll setup the Pages thing.

#### Add a 'gh-pages' branch

Next you must create a branch called `gh-pages` (it must be called exactly that -- this is not arbitrary). You can create this branch like this:

    git branch gh-pages

Lastly, push the contents of the gh-pages to github. You can do it from master (or any branch) like this:

    git push origin hg-pages

And voila, the content of that branch will be on github pages after a few (as many as 10 minutes).

## Having a Jekyll baseurl problem?

When I follow the steps above, I get this far and have a problem: my hosted Github Pages sites loads, but no CSS is being loaded (as determined by viewing source or the infamous Times New Roman). Also, when I click on links -- I get a 404. So something is wrong. Lucky for you, I tracked the problem down (with the help of others who had this issue before me) and I'll tell you the quick and easy fix.

#### Tweak your Jekyll config

In your project's `_config.yml` file (found at the root level of the project directory), open it up and add this line:

    baseurl: /YOUR_PROJECT_NAME

For example, my project name is `pages3` so I add `baseurl: /pages3`. This will enable us to easily tell Jekyll to add this directory path to the beginning of all URLs in our site. Which we'll handle next.

#### Check all URLs

Next, you'll need to go through your Jekyll app and prepend any URL with `{{ "{{ site.baseurl " }}}}`. This might seem like a pain, but if it is a fresh Jekyll install there are really only a couple of these to worry about. Your changes will look like this, and they're all (I'm pretty sure) in the `_layouts/default.html` file:

    <link rel="stylesheet" href="/css/screen.css">

becomes

    <link rel="stylesheet" href="{{ "{{ site.baseurl " }}}}/css/screen.css">

...and so forth. Do this for your stylesheet `<link>` tags, as shown above, and also for any `<a>` tags you have.

#### Re-serving Jekyll

Finally: with the above steps done, you'll need to relaunch Jekyll like this:

    jekyll serve --baseurl '' -w

You'll need to add that `--baseurl ''` suffix every time, so that when you're running the app locally the `baseurl` value is empty (which works locally). When your full static site is generated for Github Pages, the normal `baseurl` value we specified earlier will take effect.

## All done!

And that's it! A bit of a process, but really if you go through these steps once -- and then repeat them with a new Jekyll installation + Github repo (which is how I learn best), it shouldn't be too bad. Hopefully the gotcha's I name + solve above save you some time.