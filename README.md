# Neighborhood Map

**Neighborhood Map** is a single page React application featuring some of the venues of Siliguri (my hometown!). This project was created using [Create React App 2.0][1] and the venues were fetched using [Foursquare Api][2].

> Basically this application enable its user to select filtered venues and get specific details regarding it!

###### Running the application in Development Mode

In order to run this application on your local machine, you need **Node.js** and **npm** (comes along with Node.js) already installed. Now, open your terminal (Linux/Mac) or command prompt (Windows) and follow the below steps:

First, clone this repository by typing the following command on your terminal:

```
https://github.com/pbiswas101/Neighborhood-Map
```

Next, navigate to the project repository viz. **Neighborhood-Map** and  type `npm install` which will install all the relevant packages for running the application successfully!

Finally, type `npm start` which will automatically open the application on your default browser. Otherwise, you can navigate to `localhost:3000` for running it on a different browser!

###### Building the application for Production

Here, after installing all the dependencies as mentioned above instead of starting the application locally, just follow the below steps like so:

```
npm run build
npm install -g serve
serve -s build
```

The last command will serve the production optimised `build` directory on the port 5000. Now, like many of **serve’s** internal settings, the port can be adjusted using the `-p` or `--port` flags.

Run this command to get a full list of the options available:

```
serve -h
```

## PREVIEW

![](https://github.com/pbiswas101/Neighborhood-Map/blob/master/public/map.png)

## OVERVIEW

[**LIVE LINK**][3]

The user interface for **Neighborhood Map** is implemented with the help of [React][4] library and design is made with [Materialize.css][5]

> This project is part of Udacity's [**Front-End Web Developer Nanodegree Program**][6]

## License

The MIT License 2018 - [Priyabrata Biswas][7].

[1]: https://facebook.github.io/create-react-app/
[2]: https://foursquare.com/
[3]: https://neighborhood-map-siliguri.netlify.com/
[4]: https://reactjs.org/
[5]: https://materializecss.com/
[6]: https://in.udacity.com/course/front-end-web-developer-nanodegree--nd001
[7]: http://github.com/pbiswas101