BIN=node_modules/.bin

test:
	$(BIN)/eslint web.js 'utils/**/*.js'
	$(BIN)/mocha 'test/specs/**/*.js'

deploy:
	git push heroku master

.PHONY: test
