SRC_PATH := $(shell pwd)

define HELP
This is the Stockholm project Makefile.

Usage:

make build           - Build site & Lambdas for production.
make clean           - Purge cache, modules, & lockfiles.
make update          - Update production dependencies.

endef
export HELP

.PHONY: build clean update help

all help:
	@echo "$$HELP"

build:
	npm run-script build

.PHONY: clean
clean:
	find . -name 'package-lock.json' -delete
	find . -name 'yarn.lock' -delete
	find . -wholename '**/.yarn' -delete
	find . -wholename '**/node_modules' -delete
	find . -wholename '*/*.log' -delete

.PHONY: update
update:
	echo "Updating main project dependencies..."
	ncu -u
	yarn install
	yarn check
