import { createClient } from 'redis';
let redisClient = createClient({
    url: 'redis://:secret@redis:6379'
});
export default redisClient