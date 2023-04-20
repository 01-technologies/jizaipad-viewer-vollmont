// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Janus, JanusJS } from 'janus-gateway';
import { useCallback, useState } from 'react';

const JANUS_URL = 'https://dev.janus.jizaipad.jp:8089/janus';
const opaqueId = `videostream-${Janus.randomString(12)}`;

export type JanusObject = {
  streamingHandle: JanusJS.PluginHandle | null;
  janusInstance: InstanceType<typeof JanusJS.Janus> | null;
  video: HTMLVideoElement;
};

export const useStreaming = (debug: boolean, streamingID: number): HTMLVideoElement => {
  const janusObject = {
    streamingHandle: null,
    janusInstance: null,
    video: document.createElement('video'),
  };

  const [videoElement, setVideoElement] = useState<HTMLVideoElement>(janusObject.video);

  const janusStreamingInit = useCallback(() => {
    janusInit(debug, streamingID, janusObject, setVideoElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [janusObject]);

  janusStreamingInit();

  return videoElement;
};

const janusInit = (
  debug: boolean,
  streamingID: number,
  janusObject: JanusObject,
  setVideoElement: React.Dispatch<React.SetStateAction<HTMLVideoElement>>
) => {
  Janus.init({
    debug: debug,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dependencies: Janus.useDefaultDependencies(),
    callback: () => {
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
        if (track.kind === 'video') {
          const mediaStream = new MediaStream([track]);
          const video = document.createElement('video');
          video.srcObject = mediaStream;
          setVideoElement(video);
        }
      }
    },
  });
};
