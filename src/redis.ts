import redis from 'async-redis';

const redisClient = redis.createClient(6379, "redis");

redisClient.on("error", err => {
    console.error("Redis error", err);
});

async function get(key: string) {
    return await redisClient.get(key);
}

async function set(key: string, data: string) {
    await redisClient.set(key, data);
}

async function clear(key: string) {
    return await redisClient.del(key);
}

export async function getCache(key: string) {
    const data = await get(key);
    return JSON.parse(`${data}`);
}

export async function setCache(key: string, data: any) {
    return await set(key, JSON.stringify(data));
}

export async function clearCache(key: string) {
    return await clear(key);
}