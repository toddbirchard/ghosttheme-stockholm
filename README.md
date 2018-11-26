# Stockholm Ghost Theme

![ghost badge](https://img.shields.io/badge/ghost-2.6.1-lightgrey.svg?longCache=true&style=flat-square)
![node badge](https://img.shields.io/badge/node-v10.13.0-green.svg?longCache=true&style=flat-square)
![gulp](https://img.shields.io/badge/gulp-v4.0.0-green.svg?longCache=true&style=flat-square)
![lightbox](https://img.shields.io/badge/lightbox-v2.10.0-blue.svg?longCache=true&style=flat-square)
![mongodb](https://img.shields.io/badge/MongoDB--Atlas-v4.0-green.svg?longCache=true&style=flat-square)
![ghost-pagination](https://img.shields.io/badge/ghost--pagination-0.1.3-green.svg?longCache=true&style=flat-square)
![Babel](https://img.shields.io/badge/@babel/core-7.1.2-yellow.svg?longCache=true&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)
[![GitHub issues](https://img.shields.io/github/issues/toddbirchard/ghosttheme-stockholm.svg?style=flat-square)](https://github.com/toddbirchard/ghosttheme-stockholm/issues)
[![GitHub stars](https://img.shields.io/github/stars/toddbirchard/ghosttheme-stockholm.svg?style=flat-square)](https://github.com/toddbirchard/ghosttheme-stockholm/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/toddbirchard/ghosttheme-stockholm.svg?style=flat-square)](https://github.com/toddbirchard/ghosttheme-stockholm/network)

Stockholm is a (currently) free theme for the [Ghost](https://github.com/TryGhost) blogging platform. A live preview can be viewed here: [https://hackersandslackers.com/](https://hackersandslackers.com/)

![Stockholm Theme](https://github.com/toddbirchard/ghosttheme-stockholm/blob/master/assets/images/stockholm2.jpg)

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

- Search posts
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

**Custom Templates:**

- `custom-author-archive.hbs`: Serves as an alternative "about" page which displays 
- `custom-projects.hbs`: JIRA Kanban functionality
- `custom-tag-archive.hbs`: Displays posts in a series
- `custom-signup-account`: Signup page for user accounts

### Maintenance

- Documentation
- Production readiness
- Speed optimization
