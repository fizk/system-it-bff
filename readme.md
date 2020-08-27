## Development

```sh
npm i
npm run dev
```

The Dockerfile is more for production, than development. When creating a production ready docker-image, the TypeScripts files have to be already compiled.

If you want to develop in the docker-container, do the following

```
npm i
npm run dev
docker-compose up --build development
```

* The `npm i` command will (obviously) install all dependencies (including dev)
* The `npm run dev` will start a Typescript compiler in __watch__ mode what will compile to `./build` directory
* The `docker-compose up --build development` will build the Dockerfile and mount the `./build` folder to its `./src` folder and the `./node_modules` folder to its `./node_modules`. It will then spin up a **nodemon** deamon that is watching its `./src` folder (your `./build` folder) with the _--inspector_ running.

The docker-compose file has dependencies on the [unit-api](https://github.com/fizk/system-unit-api).
