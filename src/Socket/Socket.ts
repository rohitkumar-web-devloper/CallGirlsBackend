import { Server as SocketIOServer, Socket as SocketIOClient } from "socket.io";
import http, { Server as HTTPServer } from "http";
import app from "../app";
interface HandshakeAuth {
  email: string;
}
let server: HTTPServer = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const users: Map<string, string> = new Map();

io.on('connection', (socket: SocketIOClient) => {

  const { email }: HandshakeAuth = socket.handshake.auth as HandshakeAuth;
  console.log(`${email} connected with socket ID: ${socket.id}`);
  users.set(email, socket.id);

  socket.on('callStart', ({ name, receive, sender }) => {
    const roomId = `${sender}-${receive}`;
    socket.join(roomId);
    const receiverSocketId = users.get(receive);
    if (receiverSocketId) {
      socket.to(receiverSocketId).emit('callIncoming', {
        sender,
        receive,
        senderName: name,
        roomId,
      });

      // Add the receiver to the room
      const receiverSocket = io.sockets.sockets.get(receiverSocketId);
      receiverSocket?.join(roomId);
    }
    console.log(`Room ${roomId} created with ${sender} and ${receive}`);
  });

  socket.on("joinCallRoom", ({ sender, receive, roomId }) => {
    if (!roomId) {
      console.error("Room ID not provided");
      return;
    }
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.to(roomId).emit("userJoined", { userId: socket.id, sender, receive, roomId });
    users.set(socket.id, roomId);
  });
  socket.on('sendMessage', ({ roomId, message }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const roomSize = room ? room.size : 0;
    console.log(`Room ${roomId} has ${roomSize} user(s)`);
    socket.to(roomId).emit('message', { message })
  });
  // WEBRTC CONGIF

  socket.on('webrtcOffer', ({ roomId, offer }) => {
    console.log(`Received WebRTC offer in room ${roomId}`);
    socket.to(roomId).emit('webrtcOffer', { offer });
  });

  socket.on('webrtcAnswer', ({ roomId, answer }) => {
    console.log(`Received WebRTC answer in room ${roomId}`);
    socket.to(roomId).emit('webrtcAnswer', { answer });
  });
  socket.on('webrtcCandidate', ({ roomId, candidate }) => {
    console.log(`Received ICE candidate in room ${roomId}`);
    socket.to(roomId).emit('webrtcCandidate', { candidate });
  });

  socket.on('call_cancel', ({ sender, receiver }) => {
    socket.to(users.get(sender)!).emit('callCencel');
  })
  socket.on('callEndFromCaller', ({ email }) => {
    socket.to(users.get(email)!).emit('callEndFromCaller2');
  })

  socket.on('callAccept', (res) => {
    console.log(res, 'call accept');
    socket.to(users.get(res.sender)!).emit('answerCall', res);
  })
  socket.on('callCutAfterAccept', (res) => {
    socket.to(users.get(email)!).emit('');
  })
  // Handle the call answer event
  socket.on('answerCall', ({ to, answer }: { to: string, answer: string }) => {
    console.log(`Received "answerCall" event from ${email} to ${to} with answer: ${answer}`);
    console.log(users.has(to), 'ppp');
    if (users.has(to)) {
      // Emit call answered event to the sender user
      io.to(users.get(to)!).emit('callAnswered', { answer });
      console.log(`Emitting "callAnswered" to ${to} with answer: ${answer}`);
    } else {
      console.log(`User ${to} not connected`);
    }
  });

  // Handle ICE candidate event
  socket.on('iceCandidate', ({ to, candidate }: { to: string, candidate: any }) => {
    console.log(`Received "iceCandidate" event from ${email} to ${to} with candidate:`, candidate);
    if (users.has(to)) {
      // Emit ICE candidate event to the recipient user
      io.to(users.get(to)!).emit('iceCandidate', { candidate });
      console.log(`Emitting "iceCandidate" to ${to} with candidate:`, candidate);
    } else {
      console.log(`User ${to} not connected`);
    }
  });

  // Handle user disconnect event
  socket.on('disconnect', () => {
    // Find the user based on the socket id and remove them from the users map
    for (const [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        users.delete(userId);
        console.log(`User ${userId} disconnected with socket ID: ${socketId}`);
        break;
      }
    }
  });
});

// Export the server and io instance for further use
export {
  server,
  io
};
