#nodejs outline

- starting nodejs app structure
- server setup
- modules :
  1. built-in modules in node - require() - to require a file or external library - process: gives access to built in constants and variables e.g .env - fs (filesystem) - http : for server setup - path: gets either the absolute path to a file or the relative path
  2. external module : this are external libraries: express, morgan
  3. custom modules : represent custom function packages into files in the project directory
  - API design architecture
    - monolithics : two layer (application or business logic and database fetching login leaves in the same controller function
      ), three layer system (route, controller (business logic), repository(database logic))
    - microservices
- routes or endpoints
- controllers
- database setup using mongoose and mongodb
- CRUD (create, read, update,delete) for mongodb
- API design and rules
- validation of endpoints (joi library): this checks that data ment for an endpoint is as expected by the application in terms of data types, and required attribute
  -middlewares: this are functions that sits between request and controller functions. They are useful for validation, authentical, authorization and other purposes

#next

- error handling

- #expense tracker app

## setup nodejs project

- create a folder for the project
- initiate a package json file in the root directory
  -- npm init (fill in the command prompts)
- install necessary dependencies: express, cors, morgan, colors
  -devDependencies - development: morgan,colors
  -dependencies - production: express, cors
- setup a basic express server
