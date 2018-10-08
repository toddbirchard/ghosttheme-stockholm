# Stockholm Ghost Theme

![ghost badge](https://img.shields.io/badge/ghost-2.1.4-lightgrey.svg?longCache=true&style=flat-square)
![node badge](https://img.shields.io/badge/node-v8.11.3-green.svg?longCache=true&style=flat-square)
![gulp](https://img.shields.io/badge/gulp-v4.0.0-green.svg?longCache=true&style=flat-square)
![less](https://img.shields.io/badge/lessjs-v3.7.0-blue.svg?longCache=true&style=flat-square)
![MongoDB](https://img.shields.io/badge/mongodb-v4.0-green.svg?longCache=true&style=flat-square)
![Babel](https://img.shields.io/badge/@babel/core-7.1.2-yellow.svg?longCache=true&style=flat-square)
![Commit](https://flat.badgen.net/github/last-commit/toddbirchard/ghosttheme-stockholm)
![Issues](https://flat.badgen.net/github/issues/toddbirchard/ghosttheme-stockholm?color=yellow)
![Stars](https://flat.badgen.net/github/stars/toddbirchard/ghosttheme-stockholm?color=yellow)
![Forks](https://flat.badgen.net/github/forks /toddbirchard/ghosttheme-stockholm?color=yellow)

Stockholm is a (currently) free theme for the [Ghost](https://github.com/TryGhost) blogging platform. A live preview can be viewed here: [https://hackersandslackers.com/](https://hackersandslackers.com/)

![Stockholm Theme](https://miscellaneous.nyc3.digitaloceanspaces.com/stockholm.jpg)


# About

_Stockholm_ is the most fully featured Ghost theme on the market with a minimalist presentation. Easily configurable settings allow for customization such as contextual widgets, sidebar preferences, and unique page templates. This project is in *active development*: you are welcome to use this theme if you wish, but be warned that certain oddities may exist as the user-friendly configuration is still in development.

## Features

Some features are rolled out in public beta before official release. Features released in beta are usable to the end user, although less intuitive to configure until official completion.

### Major Features

- Full JIRA integration with functioning Kanban board
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

- User accounts and comments
- Activity feed page template
- Guest posts
- Embed Jupyter Notebooks as posts
- On-hover link previews
- Aggregation to Medium

## Installation

For information on installing the Ghost platform, please reference the [Ghost CLI](https://docs.ghost.org/docs/cli-install).

### Theme Quickstart

```
git clone https://github.com/toddbirchard/ghosttheme-stockholm.git

cd ghosttheme-stockholm

npm install
```

### Custom Templates

- `custom-author-archive.hbs` Lists details of all contributing authors, suitable for an 'about' page.
- `custom-projects.hbs` Contains custom modules to display Github repos and live JIRA Kanban Board.
- `custom-tag-archive.hbs` Detailed list of tags; can be used to highlight tags as though they were a series.
- `custom-signup-account.hbs` Account creation for users to leave comments, etc.
- `custom-confirm-email.hbs` Callback page for new accounts confirming their email.

### Maintenance

This theme was not created with any frontend CSS frameworks, thus the source code is a patchy embarrassing mess. There is an ongoing effort to improve on this, including the following initiatives:

- Standardization of styles and cleanup of repeated declarations
- Straightforward configuration
- Speed optimization
- Documentation
