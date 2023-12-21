# ConvoHub

ConvoHub is a straightforward real-time chat application developed using Express, React, Socket.io, and TypeScript. Users can instantly join the chat by entering their usernames, enabling seamless communication across all connected clients within the same server.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/BugReportOnWeb/convo-hub.git
cd convo-hub
```

2. Navigate to the server directory and install its dependencies:
```bash
cd server
npm install
```

3. Create a .env file in the server directory and set the PORT variable:
```env
SERVER_PORT=4000
CLIENT_PORT=5173
HOST=localhost
```

4. Start the server:
```bash
npm run dev
```

5. Navigate to the client directory and install its dependencies
```bash
cd ../client
npm install
```

6. Start the client:
```bash
npm run dev
```

- Open your web browser and go to http://localhost:5173.
- Enter your desired username to log in and start chatting!

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
