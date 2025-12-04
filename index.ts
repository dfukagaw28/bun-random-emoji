export function getEmoji() {
  const list = ["😎", "🚀", "🦄", "🔥", "🤖"];
  return list[Math.floor(Math.random() * list.length)];
}
