# Stockholm Ghost Theme

![Ghost](https://img.shields.io/badge/ghost-2.11.0-lightgrey.svg?longCache=true&style=flat-square&logo=ghost&logoColor=white&colorB=656c82&colorA=36363e)
![Node](https://img.shields.io/badge/node-v10.15.0-green.svg?longCache=true&style=flat-square&logo=node.js&logoColor=white&colorB=339933&colorA=36363e)
![Webpack](https://img.shields.io/badge/Webpack-v4.29.0-blue.svg?longCache=true&style=flat-square&logo=webpack&logoColor=white&colorB=23a8e2q&colorA=36363e)
![Lightbox](https://img.shields.io/badge/lightbox-v2.10.0-blue.svg?longCache=true&style=flat-square&colorA=36363e)
![Apisentris](https://img.shields.io/badge/Apisentris-MySQL-green.svg?longCache=true&style=flat-square&logo=Atom&logoColor=white&colorB=51cacd&colorA=36363e)
![Ghost-Pagination](https://img.shields.io/badge/ghost--pagination-0.1.3-green.svg?longCache=true&style=flat-square&logoColor=white&colorA=36363e&logo=flicker)
![Babel](https://img.shields.io/badge/@babel/core-7.1.2-yellow.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=daa000&colorA=36363e)
![Sendgrid](https://img.shields.io/badge/sendgrid-6.3.0-blue.svg?longCache=true&logo=delicious&longCache=true&style=flat-square&logoColor=white&colorB=23a8e2&colorA=36363e)
![JIRA](https://img.shields.io/badge/JIRA--Cloud--API-v3-blue.svg?longCache=true&logo=jira&longCache=true&style=flat-square&logoColor=white&colorB=30589a&colorA=36363e)
![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square&colorA=36363e)
[![GitHub issues](https://img.shields.io/github/issues/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=daa000&colorA=36363e&icon=trello)](https://github.com/toddbirchard/ghosttheme-stockholm/issues)
[![GitHub stars](https://img.shields.io/github/stars/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=daa000&colorA=36363e)](https://github.com/toddbirchard/ghosttheme-stockholm/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=FCC624&colorA=36363e)](https://github.com/toddbirchard/ghosttheme-stockholm/network)

Stockholm is a (currently) free theme for the [Ghost](https://github.com/TryGhost) blogging platform. This theme has yet to be whitelabeled, but a live implementation of this theme can be previewed here: [https://hackersandslackers.com/](https://hackersandslackers.com/)

![Stockholm Theme](assets/images/stockholm4.jpg)

# About

_Stockholm_ is arguably the most feature-rich Ghost theme currently on the market. With some configuration, users can extend the functionality of their theme by accessing data which would be otherwise inaccessible via the standard Ghost API. This enables a plethora of features and widgets previously unavailable to Ghost.  Users can enable customizations such as contextual widgets, fully integrated user sign ups, and unique page templates.

This project is in *active development*. All are welcome to use this theme, but oddities _will_ exist until more user-friendly configuration is completed. For example, certain services are specifically whitelisted to the working domain and will break when cloned. This is being fixed.

## Features

Beyond predictable built-in blog features, *Stockholm* leverages services atypical blog themes to provide delightfully refreshing yet technically complex functionality.

### Major Features

- User Authentication & Signup for Readers
- Multi-post content series’ for topics deserving more than a single post
- Full JIRA integration with functioning Kanban
- ‘Contributors’ page detailing bios for blog authors
- MongoDB Cloud integration to extend the capabilities of Ghost CMS
- Automatic link preview embeds via custom API
- "Smart" widgets which change based on their context
- Individual author pages with high personalization
- Global search
- Automatic image compression
- Featured posts
- Responsive layout

### Widgets

* Content
  * Recent Posts
  * Related Posts
  * Publications
  * Multi-part series widget (Post X of Y)
* Authors
  * Blog Contributors
  * Github user activity
  * Github user repositories
  * Meetup Events
  * Medium Posts
* Social
  * Twitter Feed
* Users
  * Hybrid account creation + subscribe 

### Features In Development

- Code Cheatsheet section
- Homegrown commenting system (zero dependencies on Disquis)
- Automated Sendgrid newsletters
- Additional publication widgets

### Planned Features

- Recommended posts
- Recommended services & tools
- Trending posts
- Guest posts
- Embedded executable code interpreters
- Author/tag subscriptions
- Trending Topics

## Installation

For information on installing the Ghost platform, please reference the [Ghost CLI](https://docs.ghost.org/docs/cli-install).

### Theme Quickstart

```
$ git clone https://github.com/toddbirchard/ghosttheme-stockholm.git
$ cd ghosttheme-stockholm
$ npm install
$ npm run build
```
As always, remeber to restart your Ghost instance when adding new themes.

### Developers

Ghost uses [Handlebars](http://handlebarsjs.com/) for templating. This theme is styled using [LESS](http://lesscss.org/).

**Custom Templates:**

- `custom-author-archive.hbs`: Alternative "about" page which displays author bios.
- `custom-projects.hbs`: Lists chosen Github Repos & a live JIRA kanban board integration.
- `custom-tag-archive.hbs`: Template for ongoing editorial series’.
- `custom-signup-confirm`: Confirmation page for new user account creation.
- `series`: Page containing all posts of a series, compiled via dynamic routing.
- `error`: Custom 404 page.

### Maintenance

- Documentation
- User-friendly configuration
- Image compression optimization
- Retina image support