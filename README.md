# Stockholm Ghost Theme

![Ghost](https://img.shields.io/badge/Ghost-^v2.0.0-lightgrey.svg?longCache=true&style=flat-square&logo=ghost&logoColor=white&colorB=656c82&colorA=36363e)
![Node](https://img.shields.io/badge/NodeJS-v10.15.0-green.svg?longCache=true&style=flat-square&logo=node.js&logoColor=white&colorB=339933&colorA=36363e)
![Webpack](https://img.shields.io/badge/Webpack-v4.29.0-blue.svg?longCache=true&style=flat-square&logo=webpack&logoColor=white&colorB=23a8e2&colorA=36363e)
![GraphQL](https://img.shields.io/badge/GraphQL-v14.2.1-pink.svg?longCache=true&style=flat-square&logo=graphql&logoColor=white&colorB=E10098&colorA=36363e)
![MongoDB](https://img.shields.io/badge/MongoDB--Atlas-v4.0.8-green.svg?longCache=true&style=flat-square&logo=MongoDB&logoColor=white&colorB=47A248&colorA=36363e)
![Baguettebox](https://img.shields.io/badge/baguettebox.js-v1.11.0-blue.svg?longCache=true&style=flat-square&colorA=36363e&logo=JavaScript&logoColor=white)
![Ghost-Pagination](https://img.shields.io/badge/Ghost--Pagination-v0.1.3-green.svg?longCache=true&style=flat-square&logoColor=white&colorA=36363e&colorB=7aa206&logo=ghost)
![Vanilla Lazyload](https://img.shields.io/badge/Vanilla--Lazyload-v11.0.6-red.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=7aa206&colorA=36363e)
![Retina.js](https://img.shields.io/badge/Retina.js-v1.3.0-red.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=7aa206&colorA=36363e)
![Highlight.js](https://img.shields.io/badge/Highlight.js-v9.15.6-red.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=b62e2e&colorA=36363e)
![Babel](https://img.shields.io/badge/@babel/core-v7.3.4-yellow.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=daa000&colorA=36363e)
![Sendgrid](https://img.shields.io/badge/Sendgrid-v6.3.0-blue.svg?longCache=true&logo=delicious&longCache=true&style=flat-square&logoColor=white&colorB=23a8e2&colorA=36363e)
![Slick Carousel](https://img.shields.io/badge/Slick--Carousel-v1.8.1-blue.svg?longCache=true&logo=JavaScript&longCache=true&style=flat-square&logoColor=white&colorB=3498db&colorA=36363e)
![ScrollBooster](https://img.shields.io/badge/ScrollBoster-v1.1.0-blue.svg?longCache=true&logo=scrutinizer-ci&longCache=true&style=flat-square&logoColor=white&colorB=ffa083&colorA=36363e)
![GitHub Last Commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square&colorA=36363e&logo=GitHub)
[![GitHub Issues](https://img.shields.io/github/issues/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=daa000&colorA=36363e&logo=GitHub)](https://github.com/toddbirchard/ghosttheme-stockholm/issues)
[![GitHub Stars](https://img.shields.io/github/stars/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=daa000&colorA=36363e&logo=GitHub)](https://github.com/toddbirchard/ghosttheme-stockholm/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=FCC624&colorA=36363e&logo=GitHub)](https://github.com/toddbirchard/ghosttheme-stockholm/network)

Stockholm is a (currently) free theme for the [Ghost](https://github.com/TryGhost) blogging platform. This theme has yet to be whitelabeled, but a live implementation of this theme can be previewed here: [https://hackersandslackers.com/](https://hackersandslackers.com/)

![Stockholm Theme](assets/images/stockholm4.jpg)

# About

_Stockholm_ is arguably the most feature-rich Ghost theme currently on the market. With some configuration, users can extend the functionality of their theme by accessing data which would be otherwise inaccessible via the standard Ghost API. This enables a plethora of features and widgets previously unavailable to Ghost.  Users can enable customizations such as contextual widgets, fully integrated user sign ups, and unique page templates.

This project is in *active development*. All are welcome to use this theme, but oddities _will_ exist until more user-friendly configuration is completed. For example, certain services are specifically whitelisted to the working domain and will break when cloned. This is being fixed.

## Features

Beyond predictable built-in blog features, *Stockholm* leverages services atypical blog themes to provide delightfully refreshing yet technically complex functionality.

### Major Features

* Content
  * Global searchbar
  * `<a>` tags generate embedded previews
  * Hand-designed code snippets
  * Interactive data tables
* API
  * Featured posts
  * Multi-part content publications
  * Additional social media options for authors
  * Enumerated pagination
* Projects
  * Full JIRA integration with functioning Kanban board
* Accounts
  * User Authentication & Sign-up for Readers
* Authors
  * Individual author pages (personalized social widgets)
  * ‘Contributors’ page detailing bios for blog authors
* Misc
  * Automatic image compression
  * Responsive layout

### Widgets

* Content
  * Recent Posts
  * Related Posts
  * Publications
  * Table of contents (Post X of Y)
* Authors
  * Blog Contributors
  * Author detail cards
  * Github activity per author
  * Github repositories per author
  * Author website embed
  * Upcoming Meetup Events
  * Recent Medium Posts
* Social
  * Connected Social Profiles
  * Twitter feed per author
  * Facebook page preview
* Users
  * Hybrid account creation + subscribe

### Page Templates

* `custom-author-archive.hbs`: Alternative "about" page which displays author bios.
* `custom-projects.hbs`: Live JIRA Kanban board integration, lists chosen Github repositories.
* `custom-tag-archive.hbs`: Template for ongoing editorial series’.
* `custom-apply`: Application process for aspiring authors.
* `custom-resources`: Recommended products, code libraries, etc.
* `series`: Page containing all posts of a series, compiled via dynamic routing.
* `error`: Custom 404 page.

## Planned Features

### Features In Development

* Code Cheatsheet section
* Homegrown commenting system (zero dependencies on Disquis)
* Automated Sendgrid newsletters
* Additional publication widgets

### Coming Later Perhaps

* Recommended posts
* Recommended services & tools
* Trending posts
* Guest posts
* Executable code interpreters
* Author/tag subscriptions
* Trending Topics

## Installation

For information on installing the Ghost platform, please reference the [Ghost CLI](https://docs.ghost.org/docs/cli-install).

```
$ git clone https://github.com/toddbirchard/ghosttheme-stockholm.git
$ cd ghosttheme-stockholm
$ npm install
$ npm run build
```

As always, remember to restart your Ghost instance when adding new themes.

### Integrations

This theme comes equipped with multiple built-in integrations, which are visible in `.example_env`. Rename this file to `.env` (and don't forget to include `.env` in `.gitignore`)! 

Replace the values in this configuration file with your own. Additional details to be added here soon.

### Maintenance

* User-friendly configuration
* Installation Documentation
* Image compression optimization
* Retina image support
* Site speed optimizations
