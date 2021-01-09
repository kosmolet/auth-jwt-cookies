# Authentication using JWT 

### Set up
`.env` file should be created in the root directory, example:    
 `NODE_ENV=development`  
`PORT=5091`  
`JWT_SECRET=26f54e5849ff849c64ahir6f5sdsdhi394016b351ba7af4df304bf287270`  
`MONGO_URI='you_mongo_connection string here`  
  One of ways how to generate JWT_SECRET:   
  * launch the REPL (Node shell): open command prompt or terminal and enter `node`,
  * type and enter `require('crypto').randomBytes(36).toString('hex')` 
### Start  

Type `npm run dev` in the command prompt or terminal

### Test  

The easy way to test this API is:
* Install RESTClient extention in VSCode,
* Open requests folder and navigate to `auth.rest file`  
`@BASE_URL=http://localhost:{{$dotenv PORT}}/api/v1` is the base route of API, PORT will be auto-detected from .env file
* Register a new user by executing (clicking Send Request) above the `POST {{BASE_URL}}/auth/register request`
* Copy a token which will be shown in the Response window  
* Navigate to events.rest file and replace `@TOKEN` value with your tocken  
* To execute requests with `EVENT_ID` first make a POST request and replace `@EVENT_ID` value with your event ID
