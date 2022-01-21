# fatcoder-farm

### Description ###

* Quick summary:
An app to demonstrate my understanding of  System design patterns in a real world scenario.

* Version: 
1.0

### How to Setup? ###

To run this application, you'll need 
- [Git](https://git-scm.com)  
- [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. 
- [Postgres](https://www.postgresql.org/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker-Compose](https://docs.docker.com/compose/install/) 

* Clone the repository using this command(in your Command Line)
```
git clone https://github.com/Comurule/fatcoder-farm.git
```

* Go into the repository
```
cd fatcoder-farm
```

* Create .env file for environmental variables in your root directory like the __.env.sample__ file and provide the necessary details. ( You can also change the default values of the system configurations in `src/config/sysConfig.js`).

* Run the docker-compose file to run the app setup and migrate the database automatically.(Ensure this command is run in the app root directory `/fatcoder-farm`).
For this project, NODE_ENV is set to production to enable the docker to run seamlessly.
```
docker-compose up
```

* Check the port on the specified port on the env or 8080

### API End Points ###
The Endpoints documentation can be gotten in [this Postman documentation](https://documenter.getpostman.com/view/11194465/UVXknFB6).

### Recommended Improvements
- More input validation and Error handling
- API unit and integration testing
- More thought should be given to the scheduler to reduce the frequency of the call to the database.

### Author
Chibuike Umechukwu