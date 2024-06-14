INSERT INTO author
(name, initial, birth, death)
VALUES
('이상', 'ㅇ', '1910-09-23', '1937-04-17');


INSERT INTO book (
  title,
  initial,
  author_id,
  translator,
  country,
  genre,
  pub,
  pub_at,
  detail,
  views
) VALUES (
  '날개',
  'ㄴ',
  1,
  null,
  '대한민국',
  '소설',
  '문학과지성사',
  '1936-01-01',
  '이상의 대표작 중 하나로, 주인공이 겪는 고뇌와 방황을 그린 소설.',
  100
);