# Stockholm Ghost Theme

![ghost badge](https://img.shields.io/badge/ghost-2.1.4-lightgrey.svg?longCache=true&style=flat-square)
![node badge](https://img.shields.io/badge/node-v8.11.3-green.svg?longCache=true&style=flat-square)
![gulp](https://img.shields.io/badge/gulp-v4.0.0-green.svg?longCache=true&style=flat-square)
![less](https://img.shields.io/badge/lessjs-v3.7.0-blue.svg?longCache=true&style=flat-square)
![mongodb](https://img.shields.io/badge/MongoDB--Atlas-v4.0-green.svg?longCache=true&style=flat-square)
![Jquery badge](https://img.shields.io/badge/jquery-3.3.1-green.svg?longCache=true&style=flat-square)
![Jquery badge](https://img.shields.io/badge/@babel/core-7.1.2-yellow.svg?longCache=true&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)
[![GitHub issues](https://img.shields.io/github/issues/toddbirchard/ghosttheme-stockholm.svg?style=flat-square)](https://github.com/toddbirchard/ghosttheme-stockholm/issues)
[![GitHub stars](https://img.shields.io/github/stars/toddbirchard/ghosttheme-stockholm.svg?style=flat-square)](https://github.com/toddbirchard/ghosttheme-stockholm/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/toddbirchard/ghosttheme-stockholm.svg?style=flat-square)](https://github.com/toddbirchard/ghosttheme-stockholm/network)

Stockholm is a (currently) free theme for the [Ghost](https://github.com/TryGhost) blogging platform. A live preview can be viewed here: [https://hackersandslackers.com/](https://hackersandslackers.com/)

![Stockholm Theme](https://miscellaneous.nyc3.digitaloceanspaces.com/stockholm.jpg)

# About

_Stockholm_ is the most fully featured Ghost theme on the market with a minimalist presentation. Easily configurable settings allow for customization such as contextual widgets, sidebar preferences, and unique page templates. This project is in *active development*; you are welcome to use this theme if you wish, but be warned that certain oddities may exist as the user-friendly configuration is still in development.

## Features

Some features are rolled out in public beta before official release. Features released in beta are usable to the end user, although less intuitive to configure until official completion.

### Major Features

- Full JIRA integration with functioning Kanban
- Custom contributors page
- Grouping of posts to belong to an ongoing series
- MongoDB extension to expand capabilities of Ghost admin
- Contextual sidebars
- Featured posts
- Video posts
- Auto-generated link previews
- Responsive layout

### Widgets

- Search bar
- Github repositories
- Github user activity
- Blog Contributors 
- Recent posts 
- Related posts 
- Series 
- Twitter Feed
- Meetup Events
- Medium posts authors

### Features In Development

- _User account creation_
- Custom commenting system
- Sendgrid email signups
- Additional 'Series' widgets

### Planned Features

- Activity feed page template
- Guest posts
- Embed Jupyter Notebooks as posts

## Installation

For information on installing the Ghost platform, please reference the [Ghost CLI](https://docs.ghost.org/docs/cli-install).

### Theme Quickstart

```
git clone https://github.com/toddbirchard/ghosttheme-stockholm.git

cd ghosttheme-stockholm

npm install
```

### Developers

Ghost uses [Handlebars](http://handlebarsjs.com/) for templating. This theme is styled using [LESS](http://lesscss.org/).

**Templates:**

- `default.hbs` Main template
- `index.hbs` Home page
- `post.hbs` Individual posts
- `page.hbs` Standalone pages
- `tag.hbs` Tag archives
- `author.hbs` Individual author page
- `about.hbs` Custom template with authors
- `series.hbs` Custom template with tag previews

### Maintenance

- Documentation
- Production readiness
- Speed optimization
