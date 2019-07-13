.PHONY: test clean readme build

.DEFAULT_GOAL:=help

help: ## Prints the help about targets.
	@printf "Usage:    make [\033[34mtarget\033[0m]\n"
	@printf "Default:  \033[34m%s\033[0m\n" $(.DEFAULT_GOAL)
	@printf "Targets:\n"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf " \033[34m%-14s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

install: ## Installs all modules.
	@printf "Install all modules...\n"
	yarn install

start: ## Starts the development server.
	@printf "Starting the development server...\n"
	yarn start
