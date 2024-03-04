import { generateGUID } from "./utils/utils.js";
import { llamaService } from "./services/llamaService.js";
import * as sdService from "./services/sdService.js";
import { io } from "./socketServer.js";

class Session {
  textPromptSettings = Object.assign({}, llamaService.defaultPromptSettings);
  imagePromptSettings = Object.assign({}, sdService.defaultImagePrompt);
  llamaSessionId;
  history = [];
  activeConnections = [];
  username = "";

  constructor(username) {
    this.username = username;
    this.id = generateGUID();
  }

  addConnection(socketId) {
    this.activeConnections.push(socketId);
  }

  removeConnection(socketId) {
    this.activeConnections = this.activeConnections.filter(
      (c) => c !== socketId
    );
  }

  broadcast(message, data, excludes = []) {
    this.activeConnections.forEach((socketId) => {
      if (!excludes.includes(socketId)) {
        io.to(socketId).emit(message, data);
      }
    });
  }
}

export { Session };
