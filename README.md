# Prerequisites
You need to have a running mongodb instance available.
Add a .env file or configure the following environment variables.
`PORT=5000
MONGODB_URI='mongodb://localhost:27017'
SECRET=thisisasecret`

# Run
    npm install 
    npm start

# Development
Run tests in watch mode: 
    npm run tdd

# TODOs
1. Login is for demonstrating json web tokens.
    1. Does not have test coverage.
    2. Does not use cookies.
    3. Won't return personalized data based on user.
    4. No implementation for register / forgot password.
2. Build process could be faster
3. Default imports for React
4. Improve test coverage
5. Make sure .jsx is included in the coverage report
6. Clear all the eslint warnings