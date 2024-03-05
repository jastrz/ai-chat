const { spawn } = require("cross-spawn");

const backend = spawn("npm", ["start"], {
  cwd: "./backend",
  stdio: "inherit",
});

const sd = spawn("./webui-user.bat", {
  cwd: "./stable-diffusion-webui",
  stdio: "inherit",
});

const frontend = spawn("npm", ["start"], {
  cwd: "./frontend",
  stdio: "inherit",
});

const processes = [backend, sd, frontend];

// Handle Ctrl+C to stop all processes
process.on("SIGINT", () => {
  console.log("\nStopping all processes...");

  processes.forEach((process) => {
    process.kill("SIGINT");
  });

  process.exit();
});
