# Stockholm

![ghost badge](https://img.shields.io/badge/ghost-1.22.0-green.svg?longCache=true&style=flat-square)
![ghost CLI badge](https://img.shields.io/badge/ghost_CLI-1.6.0-green.svg?longCache=true&style=flat-square)
![node badge](https://img.shields.io/badge/node-%3E6.9%20%3C7.*-green.svg?longCache=true&style=flat-square)
![gulp less badge](https://img.shields.io/badge/less_js-3.0.2-green.svg?longCache=true&style=flat-square)
![express-hbs badge](https://img.shields.io/badge/express_hbs-1.0.4-green.svg?longCache=true&style=flat-square)

Theme for the ![Ghost](https://github.com/TryGhost) blogging platform. Live preview can be seen here: https://hackersandslackers.com/

![Stockholm Theme](https://miscellaneous.nyc3.digitaloceanspaces.com/stockholm.jpg)

## About the Theme

_Stockholm_ is a minimalist theme for emphasizing content with comfortable whitespace.

### Features
- Responsive layout
- Ediotrial 'series' page
- Authors page
- Featured posts
- Mailchimp integration
- Recent articles widget
- Embedded link previews
- Twitter widget
- Google+ widget

# Installation

For information on installing Ghost, please reference the [Ghost CLI](https://docs.ghost.org/docs/cli-install).

### Quickstart

```
git clone https://github.com/toddbirchard/ghosttheme-stockholm.git
cd ghosttheme-stockholm
npm install
```

### First time developers

Ghost uses [Handlebars](http://handlebarsjs.com/) for templating. This theme is styled using [LESS](http://lesscss.org/).

**Main templates:**
- `default.hbs` - The main template file
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

**Stack**
- Ghost
- Express
- Handlebars
- LESS
- Bootstrap
- JQuery

# Roadmap
- Open registration
- Additional series support
- Pull issues (JIRA API)
- Pull projects (Github API)
- Documentation
- Production readiness
