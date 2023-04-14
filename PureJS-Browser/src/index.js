import { Janus } from 'janus-gateway';

let janus = null;
let streamingPlugin = null;
const server = 'https://janus.jizaipad.jp:8089/janus'; // JanusサーバーのURLを指定

// Janus初期化
Janus.init({
  debug: 'all',
  callback: function () {
    if (!Janus.isWebrtcSupported()) {
      alert('WebRTCがサポートされていません');
      return;
    }
    // Janusインスタンスを作成
    janus = new Janus({
      server: server,
      success: function () {
        // Streamingプラグインをアタッチ
        janus.attach({
          plugin: 'janus.plugin.streaming',
          opaqueId: 'vollmont',
          success: function (pluginHandle) {
            streamingPlugin = pluginHandle;
            watchStream();
          },
          error: function (error) {
            console.error('Error attaching plugin: ', error);
          },
          onmessage: function (msg, jsep) {
            handleMessage(msg, jsep);
          },
          onremotestream: function (stream) {
            // 映像をvideoタグに設定
            const video = document.getElementById('remoteVideo');
            Janus.attachMediaStream(video, stream);
          },
        });
      },
      error: function (error) {
        console.error('Janusエラー: ', error);
      },
      destroyed: function () {
        console.log('Janusが破棄されました');
      },
    });

    function watchStream() {
      const streamId = 1; // 視聴したいストリームのID
      const watch = {
        request: 'watch',
        id: streamId,
      };
      streamingPlugin.send({ message: watch });
    }

    function handleMessage(msg, jsep) {
      if (msg['error']) {
        console.error('Error: ', msg['error']);
        return;
      }
      const event = msg['streaming'];
      if (event) {
        if (event === 'event') {
          console.log('正常にストリームに接続しました');
        }
      }
      if (jsep) {
        // 映像ストリームを開始
        streamingPlugin.createAnswer({
          jsep: jsep,
          media: { audioSend: false, videoSend: false }, // 受信のみ
          success: function (jsep) {
            const body = { request: 'start' };
            streamingPlugin.send({ message: body, jsep: jsep });
          },
          error: function (error) {
            console.error('Error creating answer: ', error);
          },
        });
      }
    }
  },
});
