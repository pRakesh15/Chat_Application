# Chat_Application

## Description
This is a real-time chat application built using Socket.IO, MongoDB, Chakra UI, Express.js, and Vite with React. It allows users to engage in text-based conversations in real-time.

## Features
- Real-time messaging: Users can send and receive messages instantly without the need to refresh the page.
- User authentication: Users can create accounts and log in securely.
- Chat rooms: Users can join different chat rooms to have separate conversations.
- Message history: Chat history is persisted using MongoDB, allowing users to view previous messages.
- Responsive design: The app is designed to work well on both desktop and mobile devices.

## Technologies Used
- Socket.IO: Enables real-time, bidirectional communication between web clients and servers.
- MongoDB: A NoSQL database used to store user data and chat history.
- Chakra UI: A simple, modular and accessible component library for React used for building the user interface.
- Express.js: A web application framework for Node.js used for building the backend server.
- Vite: A fast build tool that significantly improves frontend development experience.
- React.js: A JavaScript library used for building the user interface.
- Node.js: A JavaScript runtime used for building the server-side application.

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd chat-app`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=3000
     MONGODB_URI=<your-mongodb-uri>
     SECRET_KEY=<your-secret-key>
     ```
5. Start the server: `npm start`
6. Start the frontend development server:
   - Navigate to the `client` directory: `cd client`
   - Install dependencies: `npm install`
   - Start Vite: `npm run dev`
7. Visit `http://localhost:3000` in your browser to use the application.

## Usage
- Register for an account or log in if you already have one.
- Choose a chat room or create a new one.
- Start sending and receiving messages in real-time.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the project.
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

