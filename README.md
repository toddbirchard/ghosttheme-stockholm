# Stockholm Ghost Theme

![Ghost](https://img.shields.io/badge/ghost-2.6.1-lightgrey.svg?longCache=true&style=flat-square&logo=ghost&logoColor=white&colorB=656c82&colorA=36363e)
![Node](https://img.shields.io/badge/node-v10.13.0-green.svg?longCache=true&style=flat-square&logo=node.js&logoColor=white&colorB=339933&colorA=36363e)
![Gulp](https://img.shields.io/badge/gulp-v4.0.0-green.svg?longCache=true&style=flat-square&logo=gulp&logoColor=white&colorB=DA4648&colorA=36363e)
![lightbox](https://img.shields.io/badge/lightbox-v2.10.0-blue.svg?longCache=true&style=flat-square&colorA=36363e)
![mongodb](https://img.shields.io/badge/MongoDB--Atlas-v4.0-green.svg?longCache=true&style=flat-square&logo=MongoDB&logoColor=white&colorB=47A248&colorA=36363e)
![ghost-pagination](https://img.shields.io/badge/ghost--pagination-0.1.3-green.svg?longCache=true&style=flat-square&logoColor=white&colorA=36363e)
![Babel](https://img.shields.io/badge/@babel/core-7.1.2-yellow.svg?longCache=true&style=flat-square&logo=JavaScript&logoColor=white&colorB=FCC624&colorA=36363e)
![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square&colorA=36363e)
[![GitHub issues](https://img.shields.io/github/issues/toddbirchard/ghosttheme-stockholm.svg?style=flat-square)](https://github.com/toddbirchard/ghosttheme-stockholm/issues?colorB=FCC624&colorA=36363e)
[![GitHub stars](https://img.shields.io/github/stars/toddbirchard/ghosttheme-stockholm.svg?style=flat-square)](https://github.com/toddbirchard/ghosttheme-stockholm/stargazers?colorB=FCC624&colorA=36363e)
[![GitHub forks](https://img.shields.io/github/forks/toddbirchard/ghosttheme-stockholm.svg?style=flat-square&colorA=36363e)](https://github.com/toddbirchard/ghosttheme-stockholm/network)

Stockholm is a (currently) free theme for the [Ghost](https://github.com/TryGhost) blogging platform. This theme can be  previewed via our live site, which runs off this theme: [https://hackersandslackers.com/](https://hackersandslackers.com/)

![Stockholm Theme](https://github.com/toddbirchard/ghosttheme-stockholm/blob/master/assets/images/stockholm2.jpg)

# About

_Stockholm_ is simply the most feature-rich Ghost theme on the market. Customization is simple via config settings, allowing blog owners to personalize their themes with contextual widgets, fully integrated user sign up, and unique page templates which support unique ways of presenting your content and self. 

This project is in *active development*; you are welcome to use this theme, but oddities _will_ exist until more user-friendly configuration is completed.

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

- `custom-author-archive.hbs`: Alternative "about" page which displays author bios.
- `custom-projects.hbs`: Lists chosen Github Repos & a live JIRA kanban board integration
- `custom-tag-archive.hbs`: Template for ongoing editorial series'
- `custom-signup-confirm`: Confirmation page for new user account creation

### Maintenance

- Documentation
- User-friendly configuration
- Speed optimization
