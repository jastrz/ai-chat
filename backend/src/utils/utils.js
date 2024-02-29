export function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var uuid = (Math.random() * 16) | 0,
      v = c == "x" ? uuid : (uuid & 0x3) | 0x8;
    return uuid.toString(16);
  });
}

export function removeFileExtension(inputString) {
  const parts = inputString.split(".");
  parts.pop();
  const beforeLastDot = parts.join(".");
  return beforeLastDot;
}
