# Stockholm Ghost Theme

![Ghost](https://img.shields.io/badge/ghost-2.7.1-lightgrey.svg?longCache=true&style=flat-square&logo=ghost&logoColor=white&colorB=656c82&colorA=36363e)
![Node](https://img.shields.io/badge/node-v10.13.0-green.svg?longCache=true&style=flat-square&logo=node.js&logoColor=white&colorB=339933&colorA=36363e)
![Gulp](https://img.shields.io/badge/gulp-v4.0.0-green.svg?longCache=true&style=flat-square&logo=gulp&logoColor=white&colorB=DA4648&colorA=36363e)
![lightbox](https://img.shields.io/badge/lightbox-v2.10.0-blue.svg?longCache=true&style=flat-square&colorA=36363e)
![mongodb](https://img.shields.io/badge/MongoDB--Atlas-v4.0.4-green.svg?longCache=true&style=flat-square&logo=MongoDB&logoColor=white&colorB=47A248&colorA=36363e)
![ghost-pagination](https://img.shields.io/badge/ghost--pagination-0.1.3-green.svg?longCache=true&style=flat-square&logoColor=white&colorA=36363e&logo=flicker)
![Babel](https://img.shields.io/badge/@babel/core-7.1.2-yellow.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=FCC624&colorA=36363e)
![Sendgrid](https://img.shields.io/badge/sendgrid-5.6.0-blue.svg?longCache=true&logo=delicious&longCache=true&style=flat-square&logoColor=white&colorB=23a8e2&colorA=36363e)
![JIRA](https://img.shields.io/badge/JIRA--Cloud--API-v3-blue.svg?longCache=true&logo=jira&longCache=true&style=flat-square&logoColor=white&colorB=172B4D&colorA=36363e)
![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square&colorA=36363e)
[![GitHub issues](https://img.shields.io/github/issues/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=FCC624&colorA=36363e&icon=trello)](https://github.com/toddbirchard/ghosttheme-stockholm/issues)
[![GitHub stars](https://img.shields.io/github/stars/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=FCC624&colorA=36363e)](https://github.com/toddbirchard/ghosttheme-stockholm/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorB=FCC624&colorA=36363e)](https://github.com/toddbirchard/ghosttheme-stockholm/network)

Stockholm is a (currently) free theme for the [Ghost](https://github.com/TryGhost) blogging platform. This theme can be  previewed via our live site, which runs off this theme: [https://hackersandslackers.com/](https://hackersandslackers.com/)

![Stockholm Theme](assets/images/stockholm.jpg)

# About

_Stockholm_ is arguably the most feature-rich Ghost theme on the market. With some light  configuration, users can extend their app's functionality by accessing data which would be otherwise inaccessible via Ghost, thus introducing a plethora of features and widgets.  Users can personalize their themes via simple config files, enabling contextual widgets, fully integrated user sign ups, and unique page templates.

This project is in *active development*. All are welcome to use this theme, but oddities _will_ exist until more user-friendly configuration is completed. For example, certain services are specifically whitelisted to the working domain and will break when cloned. This is being fixed.

## Features

Beyond predictable built-in blog features, *Stockholm* leverages services atypical blog themes to provide delightfully refreshing yet technically complex functionality.

### Major Features

- User Authentication & Signup for Readers
- Homegrown commenting system: zero dependencies on Disquis or similar third parties
- Multi-post content series' for topics deserving more than a single post
- Full JIRA integration with functioning Kanban
- 'Contributors' page detailing bios for blog authors
- MongoDB Cloud integration to extend the capabilities of Ghost CMS
- Automatic link preview embeds via custom API
- "Smart" widgets which change based on their context
- Individual author pages with high personalization
- Global search
- Automatic image compression via Gulp
- Featured posts
- Responsive layout

### Widgets

- Github project modules
- Github user activity
- Blog Contributors
- Recent posts
- Related posts
- Series
- Twitter Feed with custom styles
- Meetup Events by author
- Medium posts by author

### Features In Development

- Cheatsheet section: collection of common code snippet patterns
- Custom commenting system
- Sendgrid email signups
- Additional 'Series' widgets

### Planned Features

- Recommended posts
- Recommended services & tools
- Guest posts
- Embedded executable code interpreters
- Author/tag subscriptions

## Installation

For information on installing the Ghost platform, please reference the [Ghost CLI](https://docs.ghost.org/docs/cli-install).

### Theme Quickstart

```
$ git clone https://github.com/toddbirchard/ghosttheme-stockholm.git
$ cd ghosttheme-stockholm
$ npm install
$ npm install gulp-cli -g
$ npm install gulp -D
$ gulp
```
As always, remeber to restart your ghost instance when introducing new themes or templates.

### Developers

Ghost uses [Handlebars](http://handlebarsjs.com/) for templating. This theme is styled using [LESS](http://lesscss.org/).

**Custom Templates:**

- `custom-author-archive.hbs`: Alternative "about" page which displays author bios.
- `custom-projects.hbs`: Lists chosen Github Repos & a live JIRA kanban board integration
- `custom-tag-archive.hbs`: Template for ongoing editorial series'
- `custom-signup-confirm`: Confirmation page for new user account creation

### Maintenance

- Documentation
- User-friendly configuration
- Speed optimization
