### migration

```sh
$ mkdir data
$ diesel setup --database-url $(pwd)/data/sqlite.db
```

### run

```sh
$ ./build.sh
$ DATABASE_URL=./data/sqlite.db cargo run
```
