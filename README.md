# Authentication using JWT + HttpOnly Cookies, Node.js + React client

#### Register/Login/ResetPassword/ForgotPassword/Emailing  

### Set up
`.env` file should be created in the root directory, example:    
 `NODE_ENV=development`    
`PORT=5091`    
`JWT_SECRET=26f54e5849ff849c64ahir6f5sdsdhi394016b351ba7af4df304bf287270`    
`JWT_EXPIRE=1hr`   
`DOMAIN=http://localhost:3000`    
`MONGO_URI='you_mongo_connection string here`    
`EMAIL_FROM=aaaaaa@gmail.com`  
`SGTEMPLATE_RESET_PASSWORD=d-cbXXXX`  
`SENDGRID_API_KEY=SG.XXXX` 

To use Postmark for emails sending:  
`POSTMARK_SERVER_API_TOKEN=XXXX75-XXXX-XXX-XXX-5566XXXXd24`  
`PSTMK_TEMPLATE_ID_RESET_PASS=11111`  
  One of ways how to generate JWT_SECRET:   
  * launch the REPL (Node shell): open command prompt or terminal and enter `node`,
  * type and enter `require('crypto').randomBytes(36).toString('hex')` 
 

### Start  

Run `npm run dev` in the terminal

