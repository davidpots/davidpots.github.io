# Welcome to Wisp

Wisp is a super-simple HTML/CSS/JS template intended to give you a quick-start on new projects. It is intentionally lean and lightweight. Ideal for rapid prototyping.

### Why I made this

Very often I want to dive immediately into a project requiring a vanilla HTML/CSS/JS setup, and I grew tired of having to dig up the proper structure for including jQuery or the proper meta tags or having a mega-basic CSS framework in place. While tons of great frameworks are already out there, they all seem like overkill given what I need.

I wanted to make something myself, as lightweight as possible, built entirely for my needs. I am surely repeating the work others have already done -- but I'm also getting good experience in creating this and putting it to use.

### How I made this

I modeled the core of Wisp on [HTML5 Boilerplate](http://html5boilerplate.com/), after stripping away a lot of markup I don't usually need when quickly throwing together prototypes.

Bye!

### Notes to self

I am migrating my guitar content to playsongnotes.com. I am doing this via the `redirect_from` plugin.

Links about this plugin:

- https://github.com/jekyll/jekyll-sitemap
- https://help.github.com/articles/redirects-on-github-pages/
- https://superdevresources.com/redirects-jekyll-github-pages/
- https://github.com/jekyll/jekyll-redirect-from
- https://github.com/jekyll/jekyll-redirect-from

Add this to the front matter for each post you're redirecting

    redirected: true // ensures it won't appear in the list of posts on davidpots.com
    sitemap: false
    redirect_to:
      - [new target URL to redirect to]
