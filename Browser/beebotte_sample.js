document.addEventListener('DOMContentLoaded', () => {
  const onButton = document.getElementById('onButton');
  const offButton = document.getElementById('offButton');

  onButton.addEventListener('click', () => {
    sendData('true');
  });
  offButton.addEventListener('click', () => {
    sendData('false');
  });

  // ConeUnit
  function sendData(status) {
    const url = 'https://api.beebotte.com/v1/data/publish/vollmont/coneunit';
    const channelToken = 'token_1pNm2bOdwap7JiTA'; // ここに実際のチャンネルトークンを入れてください
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': channelToken,
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
  const onButton2 = document.getElementById('onButton2');
  const offButton2 = document.getElementById('offButton2');

  onButton2.addEventListener('click', () => {
    sendData2('true');
  });
  offButton2.addEventListener('click', () => {
    sendData2('false');
  });

  // LED
  function sendData2(status) {
    const url2 = 'https://api.beebotte.com/v1/data/publish/vollmont/led';
    const channelToken = 'token_1pNm2bOdwap7JiTA'; // ここに実際のチャンネルトークンを入れてください
    fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': channelToken,
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
});
