FROM ruby:2.5.1
ENV ENVIRONMENT_REFRESH 2017-10-11 \
  RAILS_RELATIVE_URL_ROOT=/cap
RUN mkdir /app
WORKDIR /app

RUN apt-get update -qq && apt-get install -y curl && \
  curl -sL https://deb.nodesource.com/setup_8.x  | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update -qq && apt-get install -y build-essential libpq-dev yarn && \
  rm -rf /var/lib/apt/lists/*

COPY Gemfile Gemfile.lock /app/
RUN bundle install --jobs 20 --retry 5
COPY package.json yarn.lock /app/
RUN yarn install --production=false --non-interactive --frozen-lockfile
COPY . /app
COPY ./app/assets /app/cap/assets

RUN NODE_ENV=production RAILS_ENV=production bundle exec rails assets:precompile
RUN yarn install --production=false --non-interactive --frozen-lockfile
# Required because we have mapping issues in nginx
RUN ln -s /app/public/cap/packs /app/public/packs
RUN ln -s /app/public/cap/assets /app/public/assets

RUN mkdir -p /app/public/assets/bootstrap/dist/css
RUN cp ./node_modules/bootstrap/dist/css/* /app/public/assets/bootstrap/dist/css

RUN mkdir -p /app/public/assets/react-wood-duck/dist/styles
RUN cp ./node_modules/react-wood-duck/dist/styles/application.css /app/public/assets/react-wood-duck/dist/styles

RUN mkdir -p /app/public/assets/react-bootstrap-table/css
RUN cp ./node_modules/react-bootstrap-table/css/react-bootstrap-table.css /app/public/assets/react-bootstrap-table/css/react-bootstrap-table.css

EXPOSE 3000 3035
CMD ["bundle", "exec", "rails", "server"]
