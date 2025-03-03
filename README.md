📌 Net Librarium (TypeScript, Node.js, MongoDB)
📝 Description
A RESTful API for a social network where users can create thoughts, react to thoughts, and manage friendships. Built with Node.js, Express, TypeScript, MongoDB, and Mongoose.

⚡ Installation & Setup
Clone the repository:


Copy
Edit
git clone https://github.com/yourusername/social-network-api-ts.git
cd social-network-api-ts
Install dependencies:


Copy
Edit
npm install
Set up environment variables:

Create a .env file in the root directory and add:
ini
Copy
Edit
MONGO_URI=mongodb://127.0.0.1:27017/socialNetworkDB
PORT=3001
Start MongoDB (if not running):

Copy
Edit
mongod --dbpath "C:\data\db"  # Windows  
mongod --dbpath "/usr/local/var/mongodb"  # Mac/Linux  
Run the server:

sh
Copy
Edit
npm run dev

🌐 API Endpoints
🔹 Users
GET /api/users → Get all users
GET /api/users/:userId → Get a user by ID
POST /api/users → Create a user
PUT /api/users/:userId → Update a user
DELETE /api/users/:userId → Delete a user
POST /api/users/:userId/friends/:friendId → Add a friend
DELETE /api/users/:userId/friends/:friendId → Remove a friend
🔹 Thoughts
GET /api/thoughts → Get all thoughts
GET /api/thoughts/:thoughtId → Get a thought by ID
POST /api/thoughts → Create a thought
PUT /api/thoughts/:thoughtId → Update a thought
DELETE /api/thoughts/:thoughtId → Delete a thought
🔹 Reactions
POST /api/thoughts/:thoughtId/reactions → Add a reaction to a thought
DELETE /api/thoughts/:thoughtId/reactions/:reactionId → Remove a reaction

📊 Sample Data
User Object:
json
Copy
Edit
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "thoughts": [],
  "friends": []
}
Thought Object:
json
Copy
Edit
{
  "thoughtText": "This is my first thought!",
  "username": "JohnDoe",
  "reactions": []
}

🛠 Technologies Used
Node.js – JavaScript runtime
Express.js – Web framework
MongoDB & Mongoose – NoSQL database & ORM
TypeScript – Type-safe JavaScript
Dotenv – Environment variable management
Nodemon – Auto-restart for development

📜 License
This project is licensed under the MIT License.

📞 Contact
For any questions or suggestions, reach out:
📧 Email: your@email.com
🔗 GitHub: yourgithub