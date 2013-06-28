---
layout: post
title:  "Rails Basics: Adding a Dropdown Resource to a Model"
date:   2013-04-04 10:21:00
categories: rails tutorial development
---

This tutorial will show you how to create a new record (e.g., a Song) and at the same time assign it to an existing record (e.g., an Artist). It is inspired via [this article](http://agilewarrior.wordpress.com/2011/09/30/how-to-add-a-drop-down-resource-to-an-existing-rails-model/). Note, one limitation - for now - is that you an only assign new songs to an existing artist.

### 1. Setup your Rails app & database

Get things started by running these commands. This will create an app, change into that app's directory, create the database, and start the Rails server.

    rails new sandbox4
    cd sandbox4
    rake db:create
    rails s

You can now visit the live app by going to `http://localhost:3000/` -- which will return the default Rails index page. That's fine for now.

### 2. Setup Scaffolding for "Songs" and "Artists"

Like so:

    rails generate scaffold Song title:string year:integer artist_id:integer
    rake db:migrate

    rails generate scaffold Artist name:string
    rake db:migrate

Alright. Onward.

### 3. Setup Model Relationships between "Songs" and "Artists"

make _models/song.rb_ look like this:

    class Song < ActiveRecord::Base
      attr_accessible :artist_id, :title, :year
      belongs_to :artist
    end

make _models/artist.rb_ look like this:

    class Artist < ActiveRecord::Base
      attr_accessible :name
      has_many :songs
    end

At this point you can add Songs and Artists via `http://localhost:3000/songs` and `http://localhost:3000/arists`, respectfully. However, when adding a Song the "Aritst" field asks for a numeric value (which I assume matches to the artist_id?). This sucks, let's change it.

### 4. Prep the Songs Controller

In the songs controller, add this at the very top:

    before_filter :prepare_artists 

And add this at the very bottom:

    # add the @artists = Artist.All to the before action so avail for all actions

    private

    def prepare_artists
      @artists = Artist.all
    end

### 5. Change the Songs form to have a dropdown

In order to have a dropdown menu replace the boring text field that requires us to enter an ID, do the following.

Replace this:

    <div class="field">
      <%= f.label :artist_id %><br />
      <%= f.number_field :artist_id %>
    </div>

With this:

    <div class="field">
      <%= f.label :artist %><br />
      <%= f.collection_select(:artist_id, @artists, :id, :name, :include_blank => "Please select an artist...") %>
    </div>

### 6. Tweak aritst#show to show all songs for that artist

If we view an artist#show page, we should also see all their songs. Add this:

    <p>
      <b>Songs:</b>
      <% @artist.songs.each do |song| %>
        <br /><%= song.title %>
      <% end %>
    </p>

### 7. Tweak aritst#show to add a new song for that artist

If we're viewing an artist page, we should be able to add a new song for them. right? do it like this:

First, add this to the show method in the artists controller:

    @song = Song.new 

Second, in artist#show add this form somewhere:

    <p><strong>Add a new song:</strong></p>
    <%= form_for @song do |f| %>
      <%= f.hidden_field :artist_id, :value => @artist.id %>
      <%= f.label :title, 'Title' %>: <%= f.text_field :title %><br />
      <%= f.label :year, 'Year' %>: <%= f.text_field :year %><br />
      <%= f.submit 'Add Song' %>
    <% end %>

### 8. Tweak the redirect after adding a new song

Because it sucks to be taken to the song#index after adding a song via artist#show. 

In the create method of the songs_controller, replace this:

    format.html { redirect_to @song, notice: 'Song was successfully created.' }

With this: 

    format.html { redirect_to artist_url(@song.artist_id), notice: 'Song was successfully created.' }

### 9. All done!

There you go. Some nice little tips, hopefully, that help get you on  your way.