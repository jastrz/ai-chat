import { Session } from "./session.js";

let sessions = [];

function handleUserConnected(socketId, data) {
  const { username } = data;
  console.log(username, socketId);
  let session = sessions.find((session) => session.username === username);
  if (!session) {
    session = addSession(username);
  }
  session.addConnection(socketId);
  console.log(sessions);
}

function addSession(username) {
  const session = new Session(username);
  sessions.push(session);
  return session;
}

function handleUserDisconnected(socketId) {
  const session = sessions.find((session) =>
    session.activeConnections.includes(socketId)
  );

  if (session) {
    if (session.activeConnections.length === 1) {
      sessions = sessions.filter((s) => s !== session);
    } else {
      session.removeConnection(socketId);
    }
  }

  console.log(sessions);
}

function getSessionBySocketId(socketId) {
  return sessions.find((session) =>
    session.activeConnections.includes(socketId)
  );
}

function getSessionById(sessionId) {
  return sessions.find((session) => session.id === sessionId);
}

export {
  handleUserConnected,
  handleUserDisconnected,
  getSessionBySocketId,
  getSessionById,
};
