# Stockholm

![ghost badge](https://img.shields.io/badge/ghost-1.22.4-green.svg?longCache=true&style=flat-square)
![ghost CLI badge](https://img.shields.io/badge/ghost_CLI-1.6.0-green.svg?longCache=true&style=flat-square)
![node badge](https://img.shields.io/badge/node-%3E6.9%20%3C7.*-green.svg?longCache=true&style=flat-square)
![gulp less badge](https://img.shields.io/badge/less_js-3.0.2-green.svg?longCache=true&style=flat-square)
![express-hbs badge](https://img.shields.io/badge/express_hbs-1.0.4-green.svg?longCache=true&style=flat-square)
![jquery badge](https://img.shields.io/badge/jquery-3.3.1-green.svg?longCache=true&style=flat-square)
![bootstrap badge](https://img.shields.io/badge/bootstrap-4.1.0-green.svg?longCache=true&style=flat-square)


Theme for the [Ghost](https://github.com/TryGhost) blogging platform. Live preview can be seen here: [https://hackersandslackers.com/](https://hackersandslackers.com/)

![Stockholm Theme](https://miscellaneous.nyc3.digitaloceanspaces.com/stockholm.jpg)

## About

_Stockholm_ is a minimalist theme for emphasizing content. Easily configurable settings allow for customization such as contexual widget and sidebar preferences.

### Features
- Responsive layout
- Editorial 'series' page
- Authors page
- Contextual sidebars
- Embedded link previews
- Mailchimp integration
- Contributors widget
- Recent articles widget
- Twitter widget
- Featured posts
- Link posts
- Video posts

# Installation

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

**Stack**

- Ghost
- Express
- Handlebars
- LESS
- Bootstrap
- JQuery

# Roadmap

Theme is actively under development. Stable for use in production sans optimizations. 

### Planned Features

- Open user registration
- Additional series support
- Activity feed template
- Guest posts
- Pull issues (JIRA API)
- Pull projects (Github API)

### Maintenance

- Documentation
- Production readiness
- Speed optimization
