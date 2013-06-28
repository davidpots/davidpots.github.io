---
layout: post
title:  "Rails Basics: Intro to has_many :through"
date:   2013-04-02 22:35:00
categories: rails tutorial development
---

Okay here we go. Time to learn about the Rails `has_many :through` association. Below is a walkthrough I created based on my early efforts to get a grasp of this concept... for a more thorough explanation, check out [the official Rails guide](http://guides.rubyonrails.org/association_basics.html) or [Treehouse's intro](http://blog.teamtreehouse.com/what-is-a-has_many-through-association-in-ruby-on-rails-treehouse-quick-tip).

### 1. Create your app

    rails new sb8
    cd sb8

### 2. Generate scaffolding

We'll need a model for Physicians, Patients, and Appointments. Create them as follows:

    rails generate scaffold Physician name:string
    rails generate scaffold Patient name:string
    rails generate scaffold Appointment physician_id:integer patient_id:integer appointment_date:datetime

Finally, migrate the database.asdasdasd

    rake db:migrate

### 3. Setup the model associations

Make your model/appointment.rb file look like this:

    class Appointment < ActiveRecord::Base
      attr_accessible :appointment_date, :patient_id, :physician_id
      belongs_to :physician
      belongs_to :patient
    end

Make your model/physician.rb file look like this:

    class Physician < ActiveRecord::Base
      attr_accessible :name
      has_many :appointments
      has_many :patients, :through => :appointments
    end

Make your model/patient.rb file look like this:

    class Patient < ActiveRecord::Base
      attr_accessible :name
      has_many :appointments
      has_many :physicians, :through => :appointments
    end

### 4. Create some records

Now, you can go to the URLs below and create records for each of the models. Create some Physicians and some Patients first. For the Appointments, simply enter the ID number of the respective Physicians and Patients. The URLs are:

    localhost:3000/patients
    localhost:3000/physicians
    localhost:3000/appointment

### 5. View the associations via console

Once you do this, you can view the associations via console. First go into console by typing:

    rails c

Now, if you set a Patient into a variable like this:

    p = Patient.find(1)

...You can then view all of that Patient's appointments or physicians by typing this:

    p.appointments
    p.physicians

The commands above let me view a patient's appointments, and a patient's physicians. But wait, there's more -- I can take this a step further. Suppose I want to view a patient's physician's appointments, OR a patient's appointment's physician. You can do these as follows:

    # Set a patient into the variable 'p'
    p = Patient.find(1)

    # Show the patient's physician for a certain appointment
    p.appointments.find(1).physician
    
    # Show the appointments belonging to one of the patient's physicians
    p.physicians.find(1).appointments

The main point here is when models are associated, you can use jump up/down the chain in a single line of code -- and Ruby is able to understand what you're looking for.