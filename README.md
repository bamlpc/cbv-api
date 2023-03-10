# CBV-API

Common Blockchain Vulnerabilities and Exposures API

# Initialization

This will install _**deno**_ as runtime, _**denon**_ as script runner

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

Then add the path of Denon:

```sh
denoBinPath=`echo $SHELL | rev | cut -d'/' -f-1 | rev`"rc"
echo 'export PATH="$HOME/.deno/bin:$PATH"' >> $HOME/.$denoBinPath
```

# Deno cache

This project requires dependencies to be in the cache. Run:

```bash
make cache
```

# Documentation

[GraphQL Queries](https://graphql.org/learn/queries/)

[Deno](https://deno.land/manual@v1.29.2/introduction)

[Denon](https://deno.land/x/denon@2.5.0)

# Regenerate GraphQL documentation

_**requires npx**_

```bash
npx spectaql src/graphql/documentation/config.yml
```
