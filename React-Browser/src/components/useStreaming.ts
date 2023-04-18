// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Janus, JanusJS } from 'janus-gateway';
import { useCallback, useState, useEffect } from 'react';

const JANUS_URL = 'https://janus.jizaipad.jp:8089/janus';
const opaqueId = `videostream-${Janus.randomString(12)}`;

export type JanusObject = {
  streamingHandle: JanusJS.PluginHandle | null;
  janusInstance: InstanceType<typeof JanusJS.Janus> | null;
  video: HTMLVideoElement | null;
  thumbnail: string;
  prepared: boolean;
  bitrate: number;
  bitrateTimer?: NodeJS.Timer;
};

export const useStreaming = (
  debug: boolean,
  streamingID: number,
  janusObject: JanusObject
): { videoElement: HTMLVideoElement | null } => {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  const janusStreamingInit = useCallback(
    () => janusInit(debug, janusObject, streamingID, setVideoElement),
    [streamingID, debug, janusObject]
  );

  useEffect(() => {
    janusStreamingInit();
  }, [janusStreamingInit]);

  return { videoElement };
};

const janusInit = (
  debug: boolean,
  janusObject: JanusObject,
  streamingID: number,
  setVideoElement: React.Dispatch<React.SetStateAction<HTMLVideoElement | null>>
) => {
  Janus.init({
    debug: debug,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dependencies: Janus.useDefaultDependencies(),
    callback: () => {
      janusObject = {
        streamingHandle: null,
        janusInstance: null,
        video: null,
        thumbnail: '',
        prepared: false,
        bitrate: 0,
      };
      janusObject.janusInstance = new Janus({
        server: JANUS_URL,
        success: attachPlugin,
        error(error: any) {
          console.log(error);
        },
        destroyed() {
          console.log('destroyed');
          window.location.reload();
        },
      });

      function attachPlugin() {
        janusObject.janusInstance?.attach({
          plugin: 'janus.plugin.streaming',
          opaqueId: opaqueId,
          success: (pluginHandle) => {
            janusObject.streamingHandle = pluginHandle;
            janusObject.streamingHandle.send({
              message: {
                request: 'watch',
                id: streamingID,
              },
            });
          },
          error: (cause) => {
            console.log(streamingID, cause);
          },
          onmessage: handleMessage,
          onremotetrack: handleRemoteTrack,
        });
      }

      function handleMessage(message: JanusJS.Message, jsep: JanusJS.JSEP | undefined) {
        if (message && message.result) {
          Janus.log(message.result);
        } else if (message && message.error) {
          Janus.error(message.error);
        }
        if (jsep) {
          janusObject.streamingHandle?.createAnswer({
            jsep: jsep,
            media: { audioSend: false, videoSend: false }, // We want recvonly audio/video
            success: (jsep: JanusJS.JSEP) => {
              janusObject.streamingHandle?.send({
                message: { request: 'start' },
                jsep: jsep,
              });
            },
            error: (error: any) => {
              console.log(error);
            },
          });
        }
      }

      function handleRemoteTrack(track: MediaStreamTrack) {
        const bitrate = () => {
          const bitrate = janusObject.streamingHandle?.getBitrate();
          return Math.ceil((Number(bitrate?.split(' ')[0]) / 1024) * 100) / 100;
        };
        if (track.kind === 'video') {
          const mediaStream = new MediaStream([track]);
          const videoElement = document.createElement('video');
          videoElement.srcObject = mediaStream;
          janusObject.video = videoElement;
          janusObject.bitrate = bitrate();

          janusObject.bitrateTimer = setInterval(() => (janusObject.bitrate = bitrate()), 1000);

          setVideoElement(videoElement);
        }
      }
    },
  });
};
