import { Worker, QueueEvents } from "bullmq";
import { VIDEO_QUEUE_EVENTS } from "./constants";
import { QUEUE_EVENT_HANDLERS } from "./handlers";

const redisConnection = { host: "localhost", port: 6379 };

const listenQueueEvent = (queueName) => {
  const queueEvents = new QueueEvents(queueName, {
    connection: redisConnection,
  });

  queueEvents.on("waiting", ({ jobId }) => {
    console.log(`A job with ID ${jobId} is waiting`);
  });

  queueEvents.on("active", ({ jobId, prev }) => {
    console.log(`Job ${jobId} is now active; previous status was ${prev}`);
  });

  queueEvents.on("completed", ({ jobId, returnvalue }) => {
    console.log(`${jobId} has completed and returned ${returnvalue}`);
  });

  queueEvents.on("failed", ({ jobId, failedReason }) => {
    console.log(`${jobId} has failed with reason ${failedReason}`);
  });

  // WORKER
  const worker = new Worker(
    queueName,
    async (job) => {
      console.log(job.data);
      const handler = QUEUE_EVENT_HANDLERS[queueName];
      if (handler) {
        return await handler(job);
      }
      throw new Error("No handler found for queue: " + queueName);
    },
    {
      connection: redisConnection,
    }
  );

  worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
  });

  worker.on("failed", (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
  });

  console.log(queueName, " worker started", new Date().toTimeString());
};

const setupAllQueueEvents = (db) => {
  Object.values(VIDEO_QUEUE_EVENTS).map((queueName) =>
    listenQueueEvent(queueName)
  );

  // const { setup: setupVideoHandler } = require("../models/video/handler");
  // setupVideoHandler();
  return true;
};

export default { setupAllQueueEvents, listenQueueEvent };