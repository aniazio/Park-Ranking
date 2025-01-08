# Park Ranking API

This API was design to read and modify a ranking of parks in Warsaw. After an installation and starting a program, API is available on URL: http://localhost:8080/parks

For detailed documentation of the API see: `openapi.yaml`.

## Start the project

To start the backend application run `docker-compose up -d` in the main directory of the repository. It will start mySQL database. Then you can start an application.

For starting frontend application write `cd frontend` in the terminal and then `npm install` and `npm run dev`.

At the end, when you close the application, run `docker-compose down` or, if you want to delete data in the database, `docker-compose down -v`.

## Screenshots

### Main page with ranking

![ranking-main.png](screenshots%2Franking-main.png)

### Page with park details

![ranking park.png](screenshots%2Franking%20park.png)

### Form for adding/editing park details

![ranking form.png](screenshots%2Franking%20form.png)