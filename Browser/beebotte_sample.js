document.addEventListener('DOMContentLoaded', () => {
  const onButton = document.getElementById('onButton');
  const offButton = document.getElementById('offButton');

  onButton.addEventListener('click', () => {
    sendData('true');
  });
  offButton.addEventListener('click', () => {
    sendData('false');
  });

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
});
