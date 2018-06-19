# Ruby on Rails + Vue.js skeleton

This project was created for educational purposes and quick development start from beginning. You need to have docker and docker compose installed. This project contains setted up DB and frontend file structure based on Vue.js

## Prepare for local development

``` bash
# create your own database and env files from samples
$ cp config/database.yml.sample config/database.yml
$ cp .env.sample .env

# Build docker project locally for first run
$ docker-compose build
$ docker-compose run web bundle install
$ docker-compose run webpack yarn install
$ docker-compose up -d
$ docker-compose run web rake db:setup

# Run project (everyday use)
$ docker-compose up -d
$ docker-compose stop
```

## Additional links
* Native webpack support in rails: https://mkdev.me/en/posts/rails-5-vue-js-how-to-stop-worrying-and-love-the-frontend 

For a detailed explanation on how things work with Vue.js, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
