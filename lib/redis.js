const { createClient } = require('redis');

// Create Redis client
const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD || undefined,
});

// Error handling
client.on('error', (err) => console.error('Redis Error:', err));
client.on('connect', () => console.log('Connected to Redis'));

// Connect to Redis
client.connect().catch(console.error);

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.quit();
  process.exit(0);
});

module.exports = client;
