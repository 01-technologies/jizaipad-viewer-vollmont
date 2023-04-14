import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ApiConeUnitProps {
  toggleState: boolean;
  onApiCallFailed: () => void;
}

const ApiConeUnit: React.FC<ApiConeUnitProps> = ({ toggleState, onApiCallFailed }) => {
  useEffect(() => {
    changeStatusConeUnit(toggleState)
      .then((response) => {
        console.log('Request succeeded:', JSON.stringify({ data: toggleState }));
      })
      .catch((error) => {
        console.error('Request error:', error);
        onApiCallFailed();
      });
  }, [toggleState, onApiCallFailed]);

  return null;
};

async function changeStatusConeUnit(status: boolean): Promise<void> {
  const url = 'https://api.beebotte.com/v1/data/publish/vollmont/coneunit';
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

export default ApiConeUnit;
