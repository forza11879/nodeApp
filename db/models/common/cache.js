/* eslint-disable new-cap */
/* eslint-disable prefer-rest-params */
import mongoose from 'mongoose';
import redis from 'redis';
import util from 'util';

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  console.log('OPTION KEY: ', options);
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};

mongoose.Query.prototype.exec = async function() {
  try {
    console.log('I am about to run a query');

    if (!this.useCache) {
      return exec.apply(this, arguments);
    }

    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
      })
    );

    console.log('KEY: ', key);
    console.log('this.hashKey: ', this.hashKey);

    const cacheValue = await client.hget(this.hashKey, key);

    console.log('cacheValue: ', cacheValue);

    if (cacheValue) {
      const doc = JSON.parse(cacheValue);
      return Array.isArray(doc)
        ? doc.map(item => new this.model(item))
        : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);

    client.hset(this.hashKey, key, JSON.stringify(result));
    //   client.set(key, JSON.stringify(result), 'EX', 20);

    return result;
  } catch (error) {
    console.log('cache exec error: ', error);
  }
};

const clearHash = hashKey => {
  client.del(JSON.stringify(hashKey));
};

export { clearHash };
