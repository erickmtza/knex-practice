INSERT INTO blogful_articles
    (title, date_published, content)
VALUES
  ('Playstation',   '2018-01-24 19:00:00',          'Gaming system'),
  ('Travel',        '2018-01-29 11:00:00',          'Places to visit this year'),
  ('Politics',      '2018-02-13 05:00:00',          'Divided for some reason'),
  ('Cars ',         '2018-03-13 09:00:00',          'Luxury vs Economic'),
  ('Music',         '2018-03-31 13:00:00',          'Endless good music'),
  ('Technology',    '2019-04-03 07:00:00',          'Where we are headed'),
  ('Money',         '2019-05-05 21:00:00',          'How much is enough to be happy'),
  ('Investments',   now() - '29 days'::INTERVAL,    'What is a safe investment'),
  ('Games',         now() - '29 days'::INTERVAL,    'New games this year'),
  ('Fashion',       now() - '28 days'::INTERVAL,    'New designs this year'),
  ('Culture',       now() - '22 days'::INTERVAL,    'So many kinds '),
  ('Celebrities',   now() - '20 days'::INTERVAL,    'None'),
  ('Gas',           now() - '20 days'::INTERVAL,    'Expensive and rising as summer approaches'),
  ('Urban',         now() - '19 days'::INTERVAL,    'Lifestyle of many'),
  ('America',       now() - '13 days'::INTERVAL,    'Western civilization with plenty of diversity'),
  ('Europe',        now() - '12 days'::INTERVAL,    'History and culture is interesting'),
  ('Asia',          now() - '5 days'::INTERVAL,     'Asia has much to do and much to share'),
  ('Mobile',        now() - '3 days'::INTERVAL,     'The future is mobile'),
  ('2020',          now() - '2 days'::INTERVAL,     'What to expect i the next year'),
  ('Production',    now() - '10 hours'::INTERVAL,   'What to expect and how to perform at a high level');