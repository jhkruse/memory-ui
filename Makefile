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

readme: ## Creates the README.md.
	@printf "Creating the README.md...\n"
	yarn readme

lint: ## Starts the linter.
	@printf "Starting the linter...\n"
	yarn lint

build: ## Builds the project.
	@printf "Build the project...\n"
	yarn lint

test: ## Starts the tests.
	@printf "Starting the tests...\n"
	yarn test

e2e: ## Starts the E2E tests.
	@printf "Starting the E2E tests...\n"
	yarn e2e
