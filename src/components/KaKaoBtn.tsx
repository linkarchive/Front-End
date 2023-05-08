/* eslint-disable no-console */
import React from 'react';
import KakaoLogin from 'react-kakao-login';

const KakaoBtn = () => {
  const onSuccess = (response) => {
    console.log(response);
    // 성공 시 처리할 로직 작성
  };

  const onFailure = (error) => {
    console.log(error);
    // 실패 시 처리할 로직 작성
  };

  return (
    <KakaoLogin
      token={process.env.NEXT_PUBLIC_KAKAO_JS_KEY}
      onSuccess={onSuccess}
      onFail={onFailure}
    />
  );
};

export default KakaoBtn;
