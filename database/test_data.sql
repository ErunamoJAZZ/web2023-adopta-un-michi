-- Data generated by ChatGPT

-- Insert sample users
INSERT INTO michis."user" ("name", last_name, email, "password", "user_type", birth_day, is_active, created_at)
VALUES
  ('John', 'Doe', 'john@example.com', 'hashed_password_1', 'user', '1990-01-15', true, NOW()),
  ('Jane', 'Smith', 'jane@example.com', 'hashed_password_2', 'user', '1985-05-20', true, NOW()),
  ('Admin', 'Adminson', 'admin@example.com', 'hashed_password_admin', 'administrator', '1980-12-10', true, NOW());


INSERT INTO michis.cat ("name", description, image_url, age, personality, sex, health_state, is_available, added_at)
VALUES
  ('Whiskers', 'A fluffy white cat', 'whiskers.jpg', 2.5, 'Playful and friendly', 'female', 'excellent', true, NOW()),
  ('Tom', 'A mischievous tabby cat', 'tom.jpg', 3.0, 'Curious and independent', 'male', 'medium', true, NOW()),
  ('Luna', 'A sleek black cat', 'luna.jpg', 1.5, 'Gentle and affectionate', 'female', 'excellent', true, NOW());

-- Insert sample donations
INSERT INTO michis.donation (user_id, "type", amount)
VALUES
  (1, 'money', 100.00),
  (2, 'food', NULL),
  (1, 'money', 50.00);


  -- Insert 50 sample cats with random data
DO $$
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO michis.cat ("name", description, image_url, age, personality, sex, health_state, is_available, added_at)
    VALUES
      ('Cat' || i,
       'Description for Cat ' || i,
       'cat' || i || '.jpg',
       random() * 10,
       'Personality for Cat ' || i,
       (CASE WHEN random() < 0.5 THEN 'male' ELSE 'female' end)::michis.sex_type,
       (CASE
         WHEN random() < 0.2 THEN 'poor'
         WHEN random() < 0.4 THEN 'medium'
         WHEN random() < 0.6 THEN 'chronic_disease'
         WHEN random() < 0.8 THEN 'older'
         ELSE 'excellent'
       end)::michis.health_state,
       true,
       NOW());
  END LOOP;
END $$;