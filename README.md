Library Management Web Application

This web application is a comprehensive library management system developed using the MERN stack (MongoDB, Express, React, and Node.js). It allows users to sign up, log in, browse books by category, read them online, and save their favorite titles for later reading.

Key Features:

User Functionality:

1. Sign Up & Login: Users can create an account and securely log in to access the library's full features.
2. Browse Books: Explore a wide range of books organized by categories, making it easy to find what you're interested in.
3. Read Online: Users can read books directly within the application.
4. Save for Later: If a user wants to save a book for future reading, they can easily add it to their saved list.
   
Admin Panel (Demo Only):

1. An admin panel is included in this demo version, exclusively for demonstration purposes. Regular users will not have access to this feature.
2. Manage Books: Through the admin panel, the admin can add new books to the library or remove existing ones, providing full control over the library's content.
   
Note:
The website is currently optimized for desktop use and may not display correctly on smaller screens. For the best experience, it is recommended to view the application on a PC.

Demo Link:
You can explore the demo version of the website at the following link:

Demo Version
https://66b3cb7080da1811df3131ff--incredible-longma-dd3efb.netlify.app


To manually run your React web application through VS Code when the GitHub repository contains both client and server folders, follow these steps:

Prerequisites
1. Node.js: Ensure that Node.js is installed on your system. You can download it from nodejs.org.
2. Git: Ensure that Git is installed on your system. You can download it from git-scm.com.

Step-by-Step Process

1. Clone the Repository
-Open VS Code.
-Open the terminal in VS Code by navigating to View > Terminal or by pressing `Ctrl + ``.
-Clone your GitHub repository by running the following command in the terminal: git clone <your-repo-url>
-Replace <your-repo-url> with the actual URL of your GitHub repository.

2. Navigate to the Project Directory
-After cloning, navigate into the project folder using: cd <your-project-folder-name>

3. Install Dependencies
You need to install the dependencies for both the client and server folders.

For the Server:

-Navigate to the server folder: cd server
-Install the dependencies using npm or yarn: npm install
-Or, if you're using yarn: yarn install

For the Client:

-Open a new terminal or return to the root directory and navigate to the client folder: cd ../client
-Install the dependencies: npm install
-Or: yarn install

IMPORTANT TO COMPLETE THIS PROCESS!!!

- Open the Search and Replace Panel: Press Ctrl + Shift + F (or Cmd + Shift + F on macOS) to open the global search in VS Code.
- Search for the URL: In the search field, type https://librozone-react.onrender.com.
- Replace with Localhost URL: Click on the arrow next to the search field to reveal the replace input field.
- In the replace input field, type http://localhost:5000
- Replace All Instances: Click on the Replace All button (the double arrow icon) or press Alt + Enter to replace all instances across the entire project.

4. Run the Server
-After installing the dependencies, start the server by navigating back to the server directory if you're not already there: cd ../server
-Run the server: npm start
-Or, if you are using nodemon for auto-restarts: npx nodemon
-The server should now be running on the specified port (e.g., http://localhost:5000).

5. Run the Client
-Open a new terminal in VS Code or navigate back to the client directory in your existing terminal: cd ../client
-Start the React application: npm start
-The React app should now be running on http://localhost:3000 by default.

6. View the Application
-Open your web browser and navigate to http://localhost:3000 to view the React frontend.
-The frontend will make API requests to the backend server running on http://localhost:5000.
