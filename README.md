# Polling-System-API
an API using Nde.js where anyone can create questions with options and also add votes to it. Authentication/User identity is not needed, this is a completely open application.


## Prerequisites
1. Node.js installed
2. MongoDB installed and running

## Installation
1. Clone the repository:

   git clone https://github.com/Aizaz6198/polling-api.git

3. Install dependencies:
 
   npm install

4. Configure MongoDB:
   - Ensure that your MongoDB server is running.
   - Update the MongoDB connection details in `config/mongoose.js` if needed.

5. Run the server:
   
   npm start

The server will start on port 8000 by default.

## Project Structure

- **config**: Configuration file for connecting to MongoDB using Mongoose.

- **controller**: Actions to manage the app for the various API's.

- **models**: Schemas for the the storage of data in Database.
  
- **routes**: Main route file containing route definitions for the application.

- **api**: API's for the app.

- **index.js**: Entry point of the application. Configures and starts the Express server.

## Dependencies

- **express**: Web framework for Node.js.
  
- **body-parser**: Middleware for parsing incoming request bodies.

- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.

## Running the Server

To run the server, execute the following command:

node server.js


The server will start, and you should see a message indicating that it is running on the specified port.

## Usage

- The server is currently set up to handle routes defined below.

- Make sure to update the MongoDB connection details in `config/mongoose.js` according to your database configuration.



## API's
These are the following API's for the app:
- /questions/create (To create a question)
- /questions/:id/options/create (To add options to a specific question)
- /questions/:id/delete (To delete a question)(A question can’t be deleted if one of it’s options has votes)
- /options/:id/delete (To delete an option)(An option can’t be deleted if it has even one vote given to it)
- /options/:id/add_vote (To increment the count of votes)
- /questions/:id (To view a question and it’s options)


