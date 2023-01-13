denoinstall:
	curl -fsSL https://deno.land/x/install/install.sh | sudo DENO_INSTALL=/usr/local sh

setup:
	deno install -Af --unstable https://deno.land/x/denon/denon.ts \
	&& deno install --allow-run --allow-net -f -n dpx https://deno.land/x/dpx/cli.ts
	

cache:
	deno cache --lock-write deps.ts deps.ts \
	&& deno cache --lock-write deps.ts mod.ts

compile:
	deno compile -A --unstable --cached-only --output api mod.ts

builddev:
	docker build -t deno:dev .
buildprod:
	docker build -t deno:prod -f build.Dockerfile .
rundev:
	docker run -p 8000:8000 deno:dev
runprod:
	docker run -p 8000:8000 deno:prod
prune:
	docker system prune --all -f
reset:
	make prune && make buildprod

document:
	npx spectaql src/graphql/documentation/config.yml

denodelete:
	sudo rm $(which deno)

.PHONY: dev builddev buildprod rundev runprod prune cache document denodelete reset compile