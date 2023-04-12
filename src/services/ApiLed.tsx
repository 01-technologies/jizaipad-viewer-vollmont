import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ApiLedProps {
  toggleState: boolean;
  onApiCallFailed: () => void;
}

const ApiLed: React.FC<ApiLedProps> = ({ toggleState, onApiCallFailed }) => {
  useEffect(() => {
    changeStatusLed(toggleState)
      .then((response) => {
        console.log('Request succeeded:', response);
      })
      .catch((error) => {
        console.error('Request error:', error);
        onApiCallFailed();
      });
  }, [toggleState, onApiCallFailed]);

  return null;
};

async function changeStatusLed(status: boolean): Promise<void> {
  const url = 'https://api.beebotte.com/v1/data/publish/vollmont/led';
  const channelToken = 'token_1pNm2bOdwap7JiTA'; // ここに実際のチャンネルトークンを入れてください

  const response: AxiosResponse = await axios.post(url, {
    data: status.toString(),
  }, {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': channelToken,
    },
  });

  if (response.status !== 200) {
    throw new Error(`Request failed: ${response.status}`);
  }
}

export default ApiLed;
