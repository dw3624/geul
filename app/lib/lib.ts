export const getInitialConsonant = (word: string) => {
  // 유니코드 한글 범위 내에서만 동작
  if (word.length === 0) return '';
  const char = word.charAt(0);
  if (char < '가' || char > '힣') {
    // 한글 아닌 경우 첫 문자 반환
    return char;
  }

  const CONSONANTS = [
    'ㄱ',
    'ㄱ',
    'ㄴ',
    'ㄷ',
    'ㄷ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅂ',
    'ㅅ',
    'ㅅ',
    'ㅇ',
    'ㅈ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  // 한글 유니코드 구조 : (초성 * 21 * 28) + (중성 * 28) + 종성
  const charCode = char.charCodeAt(0) - 0xac00;
  const initialConsonantIndex = Math.floor(charCode / 28 / 21);

  return CONSONANTS[initialConsonantIndex];
};
