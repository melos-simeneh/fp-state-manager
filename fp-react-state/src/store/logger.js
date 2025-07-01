export const createLogger = (prefix) => (event) => {
  console.log(`[${prefix}]: ${event.type} -> "${event.payload}"`);
};
