FROM denoland/deno:alpine-1.29.1 as base

RUN deno install -qAf --unstable https://deno.land/x/denon@2.5.0/denon.ts

EXPOSE 8000

WORKDIR /deno-dir/app
COPY . .
RUN denon cache deps.ts
RUN denon cache mod.ts

#RUN chown -R deno:deno /deno-dir/app
#USER deno

CMD [ "denon", "start" ]