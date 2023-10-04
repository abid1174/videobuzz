import { v4 as uuidv4 } from "uuid";
import { VIDEO_QUEUE_EVENTS } from "../../constants/queue.constants.js";
import { addQueueItem } from '../../modules/queues/queue.js'

const uploadVideo = async (req, res) => {
  try {
    //   console.log("POST upload", JSON.stringify(req.body));
    // const dbPayload = {
    //   ...req.body,
    //   fileName: req.file.filename,
    //   originalName: req.file.originalname,
    //   recordingDate: new Date(),
    //   videoLink: req.file.path,
    // };
    // console.log("dbPayload", dbPayload);
    // TODO: save the file info and get the id from the database
    //   const result = await insert(dbPayload);
    //   console.log("result", result);

    await addQueueItem(VIDEO_QUEUE_EVENTS.VIDEO_UPLOADED, {
      // id: result.insertedId.toString(),
      id: uuidv4(),
      ...req.body,
      ...req.file,
    });

    res.status(200).json({
      status: "success",
      message: "Upload success",
      ...req.file,
      // ...result,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

export { uploadVideo };
