---
layout: post
title:  "Rails Basics: Adding a Column to a Table"
date:   2013-03-29 08:42:00
categories: rails tutorial development
---

This tutorial will show you how to add a new column to an existing table in your Rails project database. Why would you do this? As you build out a project, you may realize that one of your data models may need to be added to -- which means a new column in that table. Here's how to do this.

In the example below, I'm assuming you have a Rails project up and running with a table already created. In this case, I want to add a column for "RSS Feed", in which I'll enter a URL (string) value for each table entry.

Finally, note that these are merely my personal notes on learning about this. For official reference (that will stay up to date, as this post may not) refer to the [official Rails guide](http://guides.rubyonrails.org/migrations.html).

### 1. Generate the Migration

First things first. After you know what type of column you wish to add, load up terminal and change into your project's directory. Type this command to generate a new migration. This command includes the name of the migration we're creating, as well as the column name we wish to create (and the type of variable/value that column will accept). In this case the new column will be called _url\_rss_ and will be of type _string_.

    rails generate migration add_url_rss_to_shows url_rss:string 

### 2. Confirm the migration file looks okay

In your app's _db/migrate_ folder you'll see a new file at the end of the list (with a timestamp matching when it was created). Before you do a `rake db:migrate` you'll want to make sure the migration file is giving the proper instructions to the database. In this case, it looks okay:

    class AddUrlRssToShows < ActiveRecord::Migration
      def change
        add_column :shows, :url_rss, :string
      end
    end

### 3. Migrate the database

By running the command below. This will run the migration, following the instructions specified in any yet-to-be-run migrations. Which in this case will add a column "url_rss" which is type "string" into the table "shows".

    rake db:migrate

### 4. Update the model's attr_accessible values

In my case, I need to go into shows.rb and update the "attr_accessible" line to include the new column name. At the moment I'm not able to explain exactly why this is necessary – but without it, you can't edit/create Shows with the new property we just created. My Show.rb file now looks like this, with the only change being the ":url_rss" added to the attr_accessible line.

    class Show < ActiveRecord::Base
      attr_accessible :description, :name, :url_web, :url_itunes, :url_rss, :network_id
      belongs_to :network
      has_many :episodes
    end
 

### 5. Update the "_form" and "show" views for the affected model

Now that the table column is added, we need to both (1) enable users to enter data for this column per each Show, and (2) display what they entered whenever a user is viewing a record. Two sub-steps here.

First, update the "_form" view (which is used when editing or creating a Show). I now have a new label and input field which accepts the string for "url_rss":

    <div class="field">
      <%= f.label :url_rss, "URL: RSS Feed" %><br />
      <%= f.text_field :url_rss %>
    </div>

Second, update the "show" view (which is used to display a Show's details). I now need to output the url_rss value so users can benefit from this item.

    <p>
      <b>RSS URL:</b><br />
      <%= @show.url_rss.empty? ? "--" : @show.url_rss %>
    </p>

### 6. All Done!

You're finished. Now your table has a new column, and you're able to add values to this column via the app's web view (or via terminal).