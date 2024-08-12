Welcome to the Library Management System, a full-featured web application developed using the MERN stack. This platform provides users with a dynamic and interactive way to explore a vast collection of books. With a user-friendly interface, you can easily sign up, log in, and browse through different categories of books tailored to your interests.

Once logged in, you have the option to read books directly on the platform or save them to your personal library for later reading. The application is designed to offer a seamless reading experience, whether you're looking to dive into a new book immediately or curate a list of favorites for future enjoyment.

For the purposes of this demonstration, the site also includes an admin panel. This exclusive feature is available only during the demo and is not accessible to regular users. The admin panel allows administrators to manage the book collection, including adding new titles or removing existing ones. This feature showcases the platform's scalability and ease of content management. Please note that in a production environment, access to the admin panel would be restricted to authorized personnel only.

The demo is currently not responsive for mobile devices and a PC is recommended for viewing it.

Check out the demo website here: https://loquacious-chimera-c5670e.netlify.app/

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
