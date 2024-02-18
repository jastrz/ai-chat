import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

class LlamaService {
  sessions = [];
  model;
  initialized = false;

  init() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    console.log(__dirname);

    this.model = new LlamaModel({
      modelPath: path.join(
        __dirname,
        "../../models",
        "solar-10.7b-instruct-v1.0-uncensored.Q4_K_M.gguf"
      ),
      gpuLayers: 24,
    });

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.setPrompt("You: ");

    this.rl.on("line", this.handleInput);
    this.initialized = true;
  }

  async prompt(input) {
    console.log("user: " + input);
    const answer = await this.getSession().prompt(input);
    // console.log(answer);
    return answer;
  }

  getSession = () => {
    return this.sessions[this.sessions.length - 1];
  };

  handleInput = async (input) => {
    this.rl.prompt();
    const answer = await this.prompt(input);
    console.log("AI: " + answer);
    console.log("\n");
    return answer;
  };

  reset = async () => {
    this.sessions.forEach(session => {
      session.st
    });
  }

  start = async () => {
    if (!this.initialized) {
      this.init();
      const context = new LlamaContext({
        model: this.model,
        contextSize: 2048,
        threads: 12,
        batchSize: 256,
      });
      this.sessions.push(new LlamaChatSession({ context }));
    }
  };
}

const llamaService = new LlamaService();

export { llamaService };
