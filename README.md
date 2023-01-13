# CBV-API

Common Blockchain Vulnerabilities and Exposures API

# Initialization

This will install _**deno**_ as runtime, _**denon**_ as script runner and
_**dpx**_ to run packages without installing them

Pre-requisites to local development:

- unzip: You can install unzip via `brew install unzip` on MacOS or
  `apt-get install unzip` -y on Linux.
- make: You can install unzip via `brew install make` on MacOS or
  `apt install make` -y on Linux.

Run:

```sh
make denoinstall
make setup
```

Then add the path of denon and dpx:

```sh
denoBinPath=`echo $SHELL | rev | cut -d'/' -f-1 | rev`"rc"
echo 'export PATH="$HOME/.deno/bin:$PATH"' >> $HOME/.$denoBinPath
```

# Deno cache

This project requires dependencies to be in cache. Run:

```bash
make cache
```

# Docker

| Run 	| Description 	|
|------------------	|--------------------------------------------------------------------------	|
| `make devrun`| run _**deno:dev**_ container 	| | `make prodbuild`| build a
container _**deno:prod**_ for production 	| | `make prodrun`| run _**deno:prod**_
container 	| | `make devbuild`| build a container _**deno:dev**_ for development
( w/o building the app) 	| | `make prune`| _**delete**_ all docker
images,networks and containers 	|

# Documentation

[GraphQL Queries](https://graphql.org/learn/queries/)

[Deno](https://deno.land/manual@v1.29.2/introduction)

[Denon](https://deno.land/x/denon@2.5.0)

# Regenerate GraphQL documentation

_**requeries npx**_

```bash
npx spectaql src/graphql/documentation/config.yml
```
