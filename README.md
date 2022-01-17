# fatcoder-farm

### Description ###

* Quick summary:
An app to demonstrate my understanding of  System design patterns in a real world scenario.

* Version: 
1.0

### How to Setup? ###

To run this application, you'll need 
[Git](https://git-scm.com)  
[Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. 
[Postgres](https://www.postgresql.org/download/) for the database.
[Docker](https://www.docker.com/products/docker-desktop) for containerization.
[Docker-Compose](https://docs.docker.com/compose/install/) to manage docker.

* Clone the repository using this command(in your Command Line)
```
git clone https://github.com/Comurule/fatcoder-farm.git
```

* Go into the repository
```
cd fatcoder-farm
```

* Create .env file for environmental variables in your root directory like the __.env.sample__ file and provide the mongo database uri 

* Install all dependencies using this command(in your Command Line)
```
npm install
```

* Run the app with this command(in your Command Line)
```
npm start
```

* Check the port on the specified port on the env or 8080

### API End Points ###
The Endpoints documentation can be gotten in [this Postman documentation](https://documenter.getpostman.com/view/11194465/UVXknFB6).

### Recommended Improvements
- More input valdation and Error handling
- API unit and integration testing

### Author
Chibuike Umechukwu