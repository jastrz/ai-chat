import { generateGUID } from "../../utils/utils.js";
import { llamaService } from "../../services/llamaService.js";
import * as sdService from "../../services/sdService.js";
import { io } from "../socketServer.js";

class Session {
  textPromptSettings = Object.assign({}, llamaService.defaultPromptSettings);
  imagePromptSettings = Object.assign({}, sdService.defaultImagePrompt);
  llamaSessionId;
  historyId = undefined;
  activeConnections = [];
  username = "";
  userId = undefined;

  constructor(username, userId) {
    this.username = username;
    this.id = generateGUID();
    this.userId = userId;
  }

  addConnection(socketId) {
    this.activeConnections.push(socketId);
  }

  removeConnection(socketId) {
    this.activeConnections = this.activeConnections.filter(
      (c) => c !== socketId
    );
  }

  broadcast(action, data, excludes = []) {
    if (action.validator) {
      const { error } = action.validator.validate(data);
      if (error) throw new Error(error);
    }

    this.activeConnections.forEach((socketId) => {
      if (!excludes.includes(socketId)) {
        io.to(socketId).emit(action.name, data);
      }
    });
  }
}

export { Session };
