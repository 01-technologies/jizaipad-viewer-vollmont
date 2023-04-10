document.addEventListener('DOMContentLoaded', () => {
    const onButton1 = document.getElementById('onButton1');
    const offButton1 = document.getElementById('offButton1');
  
    onButton1.addEventListener('click', () => {
      sendData1('true');
    });
    offButton1.addEventListener('click', () => {
      sendData1('false');
    });
  
    function sendData1(status) {
          //URL末尾で、チャンネルとトピックを指定
      const url1 = 'https://api.beebotte.com/v1/data/publish/vollmont/coneunit';
      const channelToken1 = 'your_token'; // ここに実際のチャンネルトークンを入れてください
      fetch(url1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': channelToken1,
        },
        body: JSON.stringify({
          data: status.toString(),
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Request succeeded:', JSON.stringify({ data: status }));
          } else {
            console.error('Request failed:', response.status);
          }
        })
        .catch((error) => {
          console.error('Request error:', error);
        });
    }
    // const onButton2 = document.getElementById('onButton2');
    // const offButton2 = document.getElementById('offButton2');
  
    // onButton2.addEventListener('click', () => {
    //   sendData2('true');
    // });
    // offButton2.addEventListener('click', () => {
    //   sendData2('false');
    // });
  
    // function sendData2(status) {
    //       //URL末尾で、チャンネルとトピックを指定
    //   const url2 = 'https://api.beebotte.com/v1/data/publish/vollmont/led';
    //   const channelToken2 = 'your_token'; // ここに実際のチャンネルトークンを入れてください
    //   fetch(url2, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-Auth-Token': channelToken2,
    //     },
    //     body: JSON.stringify({
    //       data: status.toString(),
    //     }),
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         console.log('Request succeeded:', JSON.stringify({ data: status }));
    //       } else {
    //         console.error('Request failed:', response.status);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Request error:', error);
    //     });
    // }
  });