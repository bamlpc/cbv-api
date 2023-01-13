FROM denoland/deno:alpine-1.29.1 as builder
WORKDIR /usr/app
COPY . .
RUN deno cache --lock-write deps.ts
RUN deno cache --lock-write mod.ts
RUN deno compile -A --unstable --cached-only --output api mod.ts

FROM alpine:3.17 as base
WORKDIR /cbv
COPY --from=builder /usr/app/api .
#environment
#COPY [".env", "./"]
#create user
#RUN adduser \
#    --disabled-password \
#    --no-create-home \
#    "deno"
#change user
#RUN chown -R deno:deno /cbv
#USER deno
CMD ./api