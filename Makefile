BIN=node_modules/.bin

test:
	$(BIN)/mocha 'test/specs/**/*.js'

deploy:
	git push heroku master

.PHONY: test
