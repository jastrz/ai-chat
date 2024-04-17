import jwt from "jsonwebtoken";

const config = process.env;

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    socket.user = decoded;
  } catch (err) {
    const socketError = new Error("not_authorized");
    return next(socketError);
  }

  next();
};

export default verifyTokenSocket;
