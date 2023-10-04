export const VIDEO_QUEUE_EVENTS = {
  VIDEO_UPLOADED: "video.uploaded",
  VIDEO_PROCESSING: "video.processing",
  VIDEO_PROCESSED: "video.processed",
  VIDEO_THUMBNAIL_GENERATED: "video.thumbnail.generated",
  VIDEO_HLS_CONVERTING: "video.hls-converting",
  VIDEO_HLS_CONVERTED: "video.hls.converted",
};

export const NOTIFY_EVENTS = {
  NOTIFY_VIDEO_HLS_CONVERTED: "notify.video.hls.converted",
};

export const ALL_EVENTS = {
  ...VIDEO_QUEUE_EVENTS,
  ...NOTIFY_EVENTS,
};
