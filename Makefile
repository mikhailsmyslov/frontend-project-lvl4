install: install-deps

start:
	heroku local -f Procfile

start-backend:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-frontend:
	npx webpack-dev-server

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

build-stats:
	rm -rf dist
	rm -rf stats.json
	NODE_ENV=production npx webpack --profile --json > stats.json

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx --fix

publish:
	npm publish

deploy:
	git push heroku

.PHONY: test
