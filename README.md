# Stockholm Ghost Theme

![Ghost](https://img.shields.io/badge/Ghost-^v2.0.0-lightgrey.svg?longCache=true&style=flat-square&logo=ghost&logoColor=white&colorB=656c82&colorA=4c566a)
![Node](https://img.shields.io/badge/NodeJS-v10.15.0-green.svg?longCache=true&style=flat-square&logo=node.js&logoColor=white&colorB=a3be8c&colorA=4c566a)
![Ghost-Pagination](https://img.shields.io/badge/Ghost--Pagination-v0.1.3-green.svg?longCache=true&style=flat-square&logoColor=white&colorA=4c566a&colorB=a3be8c&logo=ghost)
![Retina.js](https://img.shields.io/badge/Retina.js-v1.3.0-red.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=a3be8c&colorA=4c566a)
![Babel](https://img.shields.io/badge/@babel/core-v7.3.4-yellow.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=ebcb8b&colorA=4c566a)
![GraphQL](https://img.shields.io/badge/GraphQL-v14.2.1-pink.svg?longCache=true&style=flat-square&logo=graphql&logoColor=white&colorB=b48ead&colorA=4c566a)
![Highlight.js](https://img.shields.io/badge/Highlight.js-v9.15.6-red.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=bf616a&colorA=4c566a)
![ScrollBooster](https://img.shields.io/badge/ScrollBoster-v1.1.0-blue.svg?longCache=true&logo=scrutinizer-ci&longCache=true&style=flat-square&logoColor=white&colorB=bf616a&colorA=4c566a)
![Webpack](https://img.shields.io/badge/Webpack-v4.29.0-blue.svg?longCache=true&style=flat-square&logo=webpack&logoColor=white&colorB=5e81ac&colorA=4c566a)
![Baguettebox](https://img.shields.io/badge/baguettebox.js-v1.11.0-blue.svg?longCache=true&style=flat-square&colorA=4c566a&colorB=5e81ac&logo=JavaScript&logoColor=white)
![Sendgrid](https://img.shields.io/badge/Sendgrid-v6.3.0-blue.svg?longCache=true&logo=delicious&longCache=true&style=flat-square&logoColor=white&colorB=5e81ac&colorA=4c566a)
![Slick Carousel](https://img.shields.io/badge/Slick--Carousel-v1.8.1-blue.svg?longCache=true&logo=JavaScript&longCache=true&style=flat-square&logoColor=white&colorB=5e81ac&colorA=4c566a)
![GitHub Last Commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square&colorA=4c566a&colorB=a3be8c&logo=GitHub)
[![GitHub Issues](https://img.shields.io/github/issues/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=ebcb8b&colorA=4c566a&logo=GitHub)](https://github.com/toddbirchard/ghosttheme-stockholm/issues)
[![GitHub Stars](https://img.shields.io/github/stars/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=ebcb8b&colorA=4c566a&logo=GitHub)](https://github.com/toddbirchard/ghosttheme-stockholm/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=ebcb8b&colorA=4c566a&logo=GitHub)](https://github.com/toddbirchard/ghosttheme-stockholm/network)

![Stockholm Theme](assets/images/stockholm5.jpg)

_Stockholm_ is amongst the most feature-rich Ghost themes currently available. With some configuration, users can extend the functionality of their theme by accessing data which would be otherwise inaccessible via the standard Ghost API; this enables a plethora of features and widgets previously unavailable to Ghost.  Example customizations include contextual widgets, additional social account support, JIRA project configuration, and unique page templates.

This project is in *active development*. All are welcome to use this theme while it is in process of being white labeled. Oddities will almost certainly exist until more user-friendly configuration is completed. For example, certain services are specifically whitelisted to the working domain and will break when cloned. This is being fixed.

A live implementation of this theme can be previewed here: [https://stockholm.ghostthemes.io](https://stockholm.ghostthemes.io)

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

### Maintenance

* User-friendly configuration
* Installation Documentation
* Image compression optimization
* Retina image support
* Site speed optimizations

## Installation

For information on installing the Ghost platform, please reference the [Ghost CLI](https://docs.ghost.org/docs/cli-install).

```
$ git clone https://github.com/toddbirchard/ghosttheme-stockholm.git
$ cd ghosttheme-stockholm
$ npm install
$ npm run build
```

Remember to restart your Ghost instance when adding new themes.

### Integrations

This theme comes equipped with multiple built-in integrations, which are visible in `.example_env`. Rename this file to `.env` (and don't forget to include `.env` in `.gitignore`)!

Replace the values in this configuration file with your own. Additional details to be added here soon.

-----

This theme and all publically-visible repositories are free of charge. If you find this project to be helpful, a [small donation](https://www.buymeacoffee.com/hackersslackers) would be greatly appreciated to keep us in business. All proceeds go towards coffee, and all coffee goes towards improving these projects.

