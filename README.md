**Insight Application**<br>

**Description**<br>
Insight is a web application designed to manage client contracts and information securely and efficiently. It offers separate dashboards for admin and client users, allowing for tailored functionalities and interactions.

**Features**<br>
Admin Dashboard: Admin users can create, view, update, and delete client information and contracts.<br>
Client Dashboard: Client users can view and manage their contracts and personal information.<br>


**Installation**<br>
To set up the Insight application locally, follow these steps:

**1. Clone the repository:**<br>
git clone https://github.com/MichalKuthan/Insight-public.git<br>

**2.Navigate to the project directory:**<br>
cd Insight

**3.Install the necessary dependencies:**<br>
npm install

**Usage**<br>
To run the application, execute the following command in the project root directory:<br>
npm start<br>
The application will start and can be accessed at http://localhost:3000 (adjust the port as per your server's configuration).

**Issue Tracking**<br>
Any bugs or improvements can be tracked through the GitHub issues page at Insight Issues.

**Dependencies**<br>
The Insight application relies on several key dependencies listed below. These are automatically installed when you run npm install in the project directory.

Express: A web framework for Node.js, used to build the server-side logic of the application.<br>
Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, used for managing database interactions.<br>
Bcrypt: A library to help you hash passwords, providing security for user authentication.<br>
Bcryptjs: An optimized bcrypt in JavaScript with zero dependencies, used for hashing and checking passwords.<br>
Express-session: A middleware for Express to handle user sessions.<br>
Multer: A middleware for handling multipart/form-data, primarily used for uploading files.<br>

**Installing Dependencies**<br>
If you're setting up the project for the first time, you can install all required dependencies by running:<br>
npm install<br>
This command will install all the dependencies listed in the package.json file, including:

bcrypt<br>
bcryptjs<br>
express<br>
express-session<br>
mongoose<br>
multer<br>
Ensure that you have Node.js and npm installed on your machine before running this command. These dependencies are essential for the application's functionality, from server setup and routing (Express) to user authentication (Bcrypt, Bcryptjs) and file upload handling (Multer).<br>

For more information about these dependencies and their specific roles in the application, you can visit their respective documentation pages.

