## Table of Contents

- [Apologies](#apologies)
- [Main Info](#main-info)
- [Project info](#project-info)
- [About me](#about-me)

## Apologies

First of all, sorry for my English. Hope, everything will be clear for you.

Also, before we start, sorry for horizontal scroll on the home page.
While creating the home page, I was thinking about mobile devices. What's can be better, smoother and more native
than native horizontal scroll? With horizontal scroll all items are easily accessible. Try it on your phone.
This issue will be resolved later.

And sorry for the joke, Ben, I like your work, it's just a joke.

## Main Info

## So, what is that?

This web application allows you to use a huge database of [The Movie DB](https://www.themoviedb.org/).

The database contains a huge amount of information about movies, TV shows and people, like actors or directors. If you're looking for some information
about movie you can use it. You can find a movie by title and read overview, get a link to chosen movie on IMDb, find out who is starring or in the crew.
If you noted one of the characters in some movie, you can easily find an actor who performs this role. When you found this actor, you can go to his page
and find a list of movies or tv shows in which he starred. If the database provides a list of videos, related to the movie or TV, you can watch them.
For TV this database has a lot of information about the seasons and episodes. A plenty of episodes has posters and overview.

And all this is easily accessible as marijuana in Uruguay.

## And how to use it?

On the homepage you can see the list of most wanted people, now playing movies and TVs and upcoming movies that will be next week/month.
Use search bar to find a movie, TV or a person. You can enter a title or a name letter by letter and if there is nothing in the suggestions list
that you are looking for, type Enter button to jump to the search page. It has posters and photo, so you can find sought-for item.<br/>
On a movie or a TV page you can see overview, starring actors and videos. There are also release date and IMDb rate that is the link to the IMDB page
of current item. Clicking on `VIEW ALL` button on the cast card will send you to the page with cast where you can use
inner search bar to find a person by name or by character.

It's quite similar to how you can search for the movies or TVs on the person's page.

## Okay, but why I should use it?

Frankly, you shouldn't. This project had only one goal - understand React and get an experience in React + Redux. Once I found
[The Movie DB](https://developers.themoviedb.org/3) and ideas like bricks began to build this project in my mind.
It takes a lot of time as questions have been raised not only about the appearance, but in functionality as well. Firstly, inspired by the idea
of the React tutorial I started to build an application that simply allows to create a list of favorites movies. For now, I would like to implement the database,
which would contain users and their lists, like user's favorites, or list of Marvel movies, or an empty list of good movies with Ben Affleck.
As almost all frontend work is complete, I can start to learn NodeJS to implement this idea.

## Project Info

## Tools

As I said, my main goal was to obtain an experince in [React](https://facebook.github.io/react/), as I knew nothing about it at the beginning.
For quick start I used [create-react-app](https://github.com/facebookincubator/create-react-app) that 
makes initialization really fast and simple without worrying about [Webpack](https://webpack.github.io/) stuff.
There is also [NodeJS](https://nodejs.org/en/) with [Express](http://expressjs.com/) on backend. Again, simple and easy.

Of course, there is also [react-redux](http://redux.js.org/) module. 
Currently it is used only to keep in state search results, as some search happens when user
type query in search bar and some when he changes a page on search result's page. It is easy to see from Project Tree
that these two components lie in different levels of nesting, so it is much easier to have a main state and take necessary properties and actions
from those components that needs them.
To not bother about the appearance I used [MaterializeCSS](http://materializecss.com/).

## Project Tree

I devided sources to stateless components and containers. Components that are used only by one container lie in the same folder with it.
Some containers, such as `MovieVideos` are reusable.
Also, I decided to put all reducer stuff in a separate folder, instead of keeping them in the same folder with the containers that are used them.

```
my-app/
  client/
    build
    public
    src/
      components (stateless components)
      containers (statefull components)
      redux (redux stuff)
    index.js (root)
    index.css (common styles)
    helper.js (common consts)
  db/
    movies.js (mongoose stuff)
  config.json (config for the server)
  server.js

```

## About me

My name is Oleksandr Shvechykov and I am from Ukraine - wonderful country with a plenty of smart and talanted people.
Once I understood that in variety of directions I could go in IT world, web-developing is much preferable for me. 
After some time with C++ I realized that in love with JS. So if you are searching for someone clever,
creative, who fascinated by software engineering and who develop skills everyday - here I am.