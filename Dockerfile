# ui build
FROM node:16.1 AS ui_builder

WORKDIR /todo

COPY web/public .
COPY web/src .
COPY web/package.json .
COPY web/tsconfig.json .
COPY web/yarn.lock .

RUN npm install --global yarn \
 && yarn install \
 && yarn build


# api build
FROM rust:1.52 AS api_builder

WORKDIR /todo

COPY --from=ui_builder /todo/build .
COPY Cargo.toml .
RUN mkdir src
RUN echo "fn main() {}" > src/main.rs
RUN cargo build --release
COPY src .
COPY build.rs .
ENV ASSET_DIR=./build
RUN rm -f target/release/deps/todo*
RUN cargo build --bin todo --release

COPY migrations .
COPY diesel.toml .
RUN mkdir data 
RUN diesel setup --database-url ./data/sqlite.db

# image for release
FROM debian:latest
COPY --from=api_builder /todo/target/release/todo /usr/local/bin/todo
COPY --from=api_builder /todo/data /var/local/todo/data
ENV DATABASE_URL=/var/local/todo/data/sqlite.db
CMD ["todo"]