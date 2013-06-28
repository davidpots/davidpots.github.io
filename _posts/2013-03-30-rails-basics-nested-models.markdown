---
layout: post
title:  "Rails Basics: Nested Models"
date:   2013-03-30 09:33:00
categories: rails tutorial development
---

This tutorial shows how you have multiple connected models that are nested. Specifically, you have a Project which has many ProjectTodos, each of which has many ProjectTodoComments. All of the above appear on the same page (you can view a project, and add Todos, and comment on each Todo). 

Note that this is my write-up walking myself through the steps on [this post by Trevan Hetzel](http://trevan.co/connecting-models-in-rails-part-2/).

### 1. Setup your Rails app & database

Get things started by running these commands. This will create an app, change into that app's directory, create the database, and start the Rails server.

    rails new projectapp
    cd projectapp
    rake db:create
    rails s

You can now visit the live app by going to http://localhost:3000/ -- which will return the default Rails index page. That's fine for now.

### 2. Setup Scaffolding for "Projects"
First we'll need scaffolding for Projects in our app. This will create the MVC stuff needed for our purposes.

    rails generate scaffold Project title:string

You'll see the list of stuff Rails created as a result. Next, run a database migration so the database is updated with the details for Projects (they currently only have a "title" that is a string).

    rake db:migrate

You can now create a new Project by visiting http://localhost:3000/projects. Go ahead and create a few Projects.

### 3. Setup Scaffolding for "Todos" and "Comments"

Next, you'll repeat the procedure in the previous step and create scaffolding for Todos (which belong to Projects) and Comments (which belong to Todo items within a Project). Do this as follows.

    rails generate scaffold ProjectTodo title:string project_id:integer
    rake db:migrate

    rails generate scaffold ProjectTodoComment comment:string project_todo_id:integer
    rake db:migrate

Before we create any todos or comments, we first need to setup the associations.

### 4. Setup Model Associations

Let's rig our models so that they understand the relationship to each other we want them to have. Specifically, a Project can have many todo items; a todo item can have many comments. Said another way, comments belong to todo items, and todo items belong to projects.

In our _app/models/_ directory we'll want to update the following files to look as follows.

    # project.rb

    class Project < ActiveRecord::Base
      attr_accessible :title
      has_many :project_todos
    end

and

    # project_todo.rb

    class ProjectTodo < ActiveRecord::Base
      attr_accessible :project_id, :title
      belongs_to :project
      has_many :project_todo_comments
    end

and

    # project_todo_comment.rb

    class ProjectTodoComment < ActiveRecord::Base
      attr_accessible :comment, :project_todo_id
      belongs_to :project_todo
    end

### 5. Add Todo Form to Project#Show page

You know, so a user could be viewing a project and then add a todo item. Which is how it'd likely happen in real life. Add the following to your project "show" page:

    <%= form_for @project_todo do |f| %>
        <%= f.hidden_field :project_id, :value => @project.id %>
        <strong><%= f.label :title, 'Todo' %>:</strong>
        <%= f.text_field :title %>
        <%= f.submit 'Add Todo' %>
    <% end %>

But before this can work (the page will render an error if you load it), we need to tell the Project controller what @project_todo is. Add this to your Project controller in the "show" method:

    @project_todo = ProjectTodo.new

Now, you can view a Project#Show page and add a todo! However, a few things aren't ideal. First, after entering a new todo you're dumped out to the ProjectTodo#show page instead of the Project#Show page. Second, when returning to the Project#Show page, we don't see any of that Project's todo items. We'll fix both of these in reverse order.

### 6. Show a Project's Todos on a Project#Show page

Quite simply, on Project#Show we tell the view to loop through each of that Project's todos, and display the title. This is done as follows (added to Project#Show).

    <% @project.project_todos.each do |todo| %>
      <%= todo.title %><br />
    <% end %>

So far, so good. But what about adding comments to todo items? That is next.

### 7. Add TodoComment Form to Project#Show page

The user should be able to add a comment under each Todo item. We'll use the same loop from the prior step to do this. Go through each Todo item, and display a form under it that lets a user add a comment for that item.

First, we add this to the "show" method in the Project controller:

    @project_todo_comment = ProjectTodoComment.new

Second, we update the loop from the prior step to look like this:

    <% @project.project_todos.each do |todo| %>
      <p><%= todo.title %></p>

      <%= form_for(@project_todo_comment) do |f| %>
        <%= f.hidden_field :project_todo_id, :value => todo.id %>
        <%= f.text_area :comment %>
        <%= f.submit 'Add Comment' %>
      <% end %>

      <% todo.project_todo_comments.each do |comment| %>
        <%= comment.comment %>
      <% end %>

    <% end %>

Now we can add comments on todo items!

### 8. Tweaking the Todo post-submit redirect

Finally, we want to tweak things so that whenever we enter a todo item, we are kept on the page we started on (as we'd expect). Make these changes.

In `product_todos_controller.rb#create`, replace

    format.html { redirect_to @project_todo, notice: 'Project todo was successfully created.' }

with

    format.html { redirect_to project_url(@project_todo.project_id), :notice => 'Project todo was successfully created.' }

### 9. Tweaking the TodoComment post-submit redirect

Similar to the step above, but with one extra step. In `product_todo_comments_controller.rb#create`, add

    @parent = ProjectTodo.find(@project_todo_comment.project_todo_id)

and then replace:

    format.html { redirect_to @project_todo_comment, notice: 'Project todo comment was successfully created.' }

with

    format.html { redirect_to project_url(@parent.project_id), notice: 'Project todo comment was successfully created.' }

### 10. All done!

The end. I hope this was helpful.