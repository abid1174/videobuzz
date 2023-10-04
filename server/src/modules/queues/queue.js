import { Queue } from "bullmq";
import { VIDEO_QUEUE_EVENTS } from "../../constants/queue.constants.js";

const redisConnection = { host: "localhost", port: 6379 };

const queues = Object.values(VIDEO_QUEUE_EVENTS).map((queueName) => {
  return {
    name: queueName,
    queueObj: new Queue(queueName, { connection: redisConnection }),
  };
});

export const addQueueItem = async (queueName, item) => {
  console.log("addQueueItem", queueName, item);
  const queue = queues.find((q) => q.name === queueName);
  if (!queue) {
    throw new Error(`queue ${queueName} not found`);
  }

  // TODO: update history : { status: queueName, createdAt: now }
  // eventEmitter.emit(`${queueName}`, item);
  await queue.queueObj.add(queueName, item, {
    removeOnComplete: true,
    removeOnFail: false,
  });
};
