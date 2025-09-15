import React from 'react';
import useShare from '../hooks/useShare';
import './ShareButtons.css';

function ShareButtons({recipe}) {
  // recipe가 없으면 렌더링하지 않음
  if (!recipe) {
    return null;
  }

  // 현재 페이지 URL을 동적으로 생성
  const shareUrl = window.location.href;

  // useShare 훅에 공유할 데이터 전달
  const {
    isNativeShareSupported,
    handleNativeShare,
    handleKakaoShare,
    handleClipboardCopy
  } = useShare({
    title: recipe.title,
    text: recipe.content.description,
    url: shareUrl,
    imageUrl: recipe.imageUrl.mainImage
  });

  return (
    <div className="share-buttons-container">
      {isNativeShareSupported ? (
        // 모바일: 시스템 공유 버튼
        <>
          <button onClick={handleNativeShare} className="share-btn">
            공유하기
          </button>
          <button onClick={handleKakaoShare} className="share-btn kakao-btn">
            카카오톡 공유
          </button>
          <button onClick={handleClipboardCopy} className="share-btn copy-btn">
            링크 복사
          </button>
        </>
      ) : (
        // 데스크탑: 카카오톡, 링크 복사 버튼
        <>
          <button onClick={handleKakaoShare} className="share-btn kakao-btn">
            카카오톡 공유
          </button>
          <button onClick={handleClipboardCopy} className="share-btn copy-btn">
            링크 복사
          </button>
        </>
      )}
    </div>
  );
}

export default ShareButtons;
