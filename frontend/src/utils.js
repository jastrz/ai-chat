export function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var uuid = (Math.random() * 16) | 0;
    return uuid.toString(16);
  });
}

export function splitTextContent(input) {
  const regex = /```([\s\S]*?)```|```([\s\S]*)|```/g;
  const matches = input.match(regex);

  if (!matches) {
    return [{ type: "text", content: input.trim() }];
  }

  let index = 0;
  const result = matches.map((match) => {
    const startIndex = input.indexOf(match, index);
    const endIndex = startIndex + match.length;
    const textBeforeCode = input.substring(index, startIndex).trim();
    index = endIndex;

    return [
      { type: "text", content: textBeforeCode },
      { type: "code", content: match.replace(/```/g, "").trim() },
    ];
  });

  if (index < input.length) {
    result.push({ type: "text", content: input.substring(index).trim() });
  }

  return result.flat();
}
