const ERROR_MESSAGE = {
  TITLE: {
    INVALID: '제목을 입력해주세요',
    MAXIMUM: '255자만 입력이 가능합니다.',
  },
  HASHTAG: {
    TOO_LONG: '최대 8글자 입력해주세요',
    TOO_SHORT: '최소 2글자 입력해주세요',
    NO_SPECIAL: '특수기호는 안돼요',
    NO_SPACE: '공백을 제거해주세요',
  },
};

const validateHashTag = (text: string): string => {
  const whiteSpaceRegex = /\s/;
  const specialSybmolsRegEx = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
  const isShort = text.length < 2; // 최소 2글자
  const isLong = text.length > 8; // 최대 8글자
  const hasWhitespace = whiteSpaceRegex.test(text); // 공백 불가
  const hasSpecialSymbols = !specialSybmolsRegEx.test(text); // 특수기호, 이모지 불가

  if (isShort) {
    return ERROR_MESSAGE.HASHTAG.TOO_SHORT;
  }
  if (isLong) {
    return ERROR_MESSAGE.HASHTAG.TOO_LONG;
  }
  if (hasWhitespace) {
    return ERROR_MESSAGE.HASHTAG.NO_SPACE;
  }
  if (hasSpecialSymbols) {
    return ERROR_MESSAGE.HASHTAG.NO_SPECIAL;
  }

  return '';
};

const validateUrl = (url: string): string => {
  const urlRegex =
    // eslint-disable-next-line no-useless-escape
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (!urlRegex.test(url)) return ERROR_MESSAGE.URL.INVALID;

  return '';
};

const validateHashTagList = (hashtagList: string[]): string => {
  const MAX_HASHTAG = 10; // 최대 10개 등록 가능

  if (hashtagList.length > MAX_HASHTAG) {
    return ERROR_MESSAGE.HASHTAG.MAXIMUM;
  }

  const errors = hashtagList
    .map((hashtag) => validateHashTag(hashtag))
    .filter((errMesg) => errMesg !== '');

  return errors[0] || '';
};

export { validateHashTag, validateUrl, ERROR_MESSAGE, validateHashTagList };
