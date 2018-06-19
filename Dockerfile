FROM ruby:2.5.1-slim

RUN apt-get update -qq && apt-get install \
    -y --no-install-recommends git wget build-essential libpq-dev curl wget gnupg

# Node.js
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - \
    && apt-get install -y nodejs

# Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -\
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

ENV WEB_ROOT /web

RUN mkdir $WEB_ROOT

WORKDIR $WEB_ROOT
