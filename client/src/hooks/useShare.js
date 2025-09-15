import {useEffect} from 'react';
import toast from 'react-hot-toast';

// 카카오 sdk초기화 함수
const initializeKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
  }
};

const useShare = (shareData) => {
  useEffect(() => {
    initializeKakao();
  }, []);

  // Web Share API 지원 여부 확인
  const isNativeShareSupported = !!navigator.share;

  // 시스템 공유 (모바일)
  const handleNativeShare = async () => {
    if (!navigator.share) {
      toast.error('이 브라우저에서는 시스템 공유를 지원하지 않습니다.');
      return;
    }
    try {
      await navigator.share({
        title: shareData.title,
        text: shareData.text,
        url: shareData.url
      });
      toast.success('레시피가 공유되었습니다!');
    } catch (error) {
      console.error('공유 실패:', error);
    }
  };

  // 카카오톡 공유 (데스크탑)
  const handleKakaoShare = () => {
    if (!window.Kakao) {
      toast.error('카카오 SDK를 불러오지 못했습니다.');
      return;
    }
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareData.title,
        description: shareData.text,
        imageUrl: shareData.imageUrl,
        link: {
          mobileWebUrl: shareData.url,
          webUrl: shareData.url
        }
      },
      buttons: [
        {
          title: '레시피 보러가기',
          link: {
            mobileWebUrl: shareData.url,
            webUrl: shareData.url
          }
        }
      ]
    });
  };

  // 클립보드 복사 (데스크탑)
  const handleClipboardCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      toast.success('링크가 클립보드에 복사되었습니다.');
    } catch (error) {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  return {
    isNativeShareSupported,
    handleNativeShare,
    handleKakaoShare,
    handleClipboardCopy
  };
};

export default useShare;
