# ui build
FROM node:16.1 AS ui_builder

WORKDIR /todo

COPY web/public public/
COPY web/src src/
COPY web/package.json .
COPY web/tsconfig.json .
COPY web/yarn.lock .

RUN yarn install \
 && yarn build


# api build
FROM rust:1.52 AS api_builder

RUN apt-get update -y && apt-get install sqlite3 -y
WORKDIR /todo
RUN mkdir web
COPY --from=ui_builder /todo/build web/build/
COPY Cargo.toml .
RUN mkdir -p src/bin
RUN echo "fn main() {}" > src/bin/main.rs
RUN cargo build --release
COPY src src/
COPY build.rs .
ENV ASSET_DIR=./web/build
RUN rm -f target/release/deps/todo*
RUN cargo build --bin todo --release

COPY migrations migrations/
COPY diesel.toml diesel.toml
RUN mkdir data 
RUN cargo install diesel_cli
RUN diesel setup --database-url ./data/sqlite.db

# image for release
FROM debian:latest
COPY --from=api_builder /todo/target/release/todo /usr/local/bin/todo
COPY --from=api_builder /todo/data /var/local/todo/data
ENV DATABASE_URL=/var/local/todo/data/sqlite.db
CMD ["todo"]
