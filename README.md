# Chainbreak
## Technologies
Hosting:  
AWS (Amazon web services)  

Database:  
MySQL, hosted on AWS RDS, credentials stored in environment variables.  

Server:  
ExpressJs server, written in NodeJs, a javascript runtime, hosted on an EC2 part of an EB environment.   

Client:    
React  
React-Router-Dom - routing  
React-Redux - state management  
Redux-Saga - middleware for API calls  
Axios - HTTP requests  
Bootstrap - components eg modal and toasts  
SASS - styling  

## Initial Project setup
### In Git bash
    npx express-generator total-so-far
    cd total-so-far
    npm install
    npx create-react-app client  
    cd client  
    npm install  
    npm run-script build  
    cd ..  
    atom .  
**  
edit api/app.js:20 to  
app.use(express.static(path.join(__dirname, 'client', 'build')));  
**  
copy original react app into client folder  
**  
git ignore node_modules and client/node_modules  
**  

    git remote add origin GIT_REPO_URI  
    git add *  
    git commit -m 'initial commit'  
    git push origin master  

### In PowerShell  
    eb init --platform node.js --region eu-west-1  
    eb create node-express-env  
    eb deploy  

### In ACM
Create certificate.  

### In EB Console
1. Select the total-so-far application and insert at config->software->npm command: npm start  
2. Again config->load balancer->Add(port: 443, protocol: https, instance port: 80, instance protocol: https, select cert).  
3. Again config->database sql standard settings username: root, pass: a7PwVWhfVxJ7p3Lx  

### In Route 53
Update records to point to eb app url.  

## Joining the Project
Great! You want to join in.  
In git bash clone the repo and get dependencies:

    git clone REPO_URL  
    cd client  
    npm install  
    cd ..  
    npm install  

### Permissions
Get IAM permissions and create and download security credentials to authorise you eb and aws clis to access the aws service.

### Run Development
Create ssl keys:

    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
    
Create a script to run react server with https

    touch runsecure
    cat echo 'HTTPS=true SSL_CRT_FILE=server.cert SSL_KEY_FILE=server.key npm start' >> runsecure

Open 2 git bash consoles:  

    cd client && ./runsecure 

    npm run dev  

This will run the react client app on http://localhost:3000/ and the API on http://localhost:5000/ both with hot reloading, so no rebuilding necessary!  

### Deploy to Production
Open git bash:  

    cd client  
    npm run build  

open powershell    

    eb deploy  

Node variables will handle changing certain settings for production.
