let isProcessing = false;
let requests = [];

export const addRequest = (request) => {
  requests.push(request);
};

const processNextRequest = async () => {
  if (!isProcessing && requests.length > 0) {
    console.log(`requests: ${requests.length}`);
    isProcessing = true;
    const request = requests.shift();
    await request();
    isProcessing = false;
    processNextRequest();
  }
};

const requestProcessor = setInterval(() => {
  processNextRequest();
}, process.env.REQUEST_PROC_TICK);
