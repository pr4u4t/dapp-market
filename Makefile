define HELP_BODY
install; Perform installation
update; Perform modules update
run; Run development local server
install-deps; Install project dependencies
migrate; Perform blockchain migrations
endef
export HELP_BODY

all:
	truffle compile

install-deps:
	pacman -Sy npm
	sudo npm install -g truffle@5.0.5
	yay -S ganache-bin

install:
	npm install
	
update:
	npm update
	
run:
	npm run start
	
build:
	npm run build
	
migrate:
	truffle migrate
	
migrate-reset:
	truffle migrate --reset

help:
	@echo "Following make commands are available:"
	@echo "$$HELP_BODY" | column -t -s';'
	
