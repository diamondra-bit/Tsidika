INSERT INTO destinations (id, slug, name, parent_region, zone, description, image_main, hero_image, best_time, access, climat, bon_plan, lat, lng) VALUES
(1, 'nosy-be', 'Nosy Be', 'Diana', 'Nord', 'Surnommée l''île aux parfums...', '/images/destinations/nosybe.jpg', '/images/destinations/nosy-be1.jpg', 'Mai à Octobre', 'Avion ou Bateau depuis Ankify', 'Tropical de mousson', 'Louez une pirogue traditionnelle...', -13.31, 48.26),
(2, 'isalo', 'L''Isalo', 'Ihorombe', 'Sud', 'Un décor de western au cœur de Madagascar...', '/images/destinations/isalo-main.jpg', '/images/destinations/isalo-bg.jpg', 'Avril à Novembre', 'Route Nationale 7 (RN7)', 'Semi-aride', 'Terminez votre journée à la Fenêtre...', -22.48, 45.30),
(3, 'sainte-marie', 'Sainte-Marie', 'Analanjirofo', 'Est', 'Une île-jardin aux allures de paradis perdu...', '/images/destinations/sainte-marie-main.jpg', '/images/destinations/sainte-marie-bg.jpg', 'Juillet à Septembre', 'Avion ou Bateau', 'Tropical humide', 'Louez un vélo ou un scooter...', -16.92, 49.91);

INSERT INTO hebergements (destination_id, name, price, stars, img) VALUES
-- Nosy Be
(1, 'Andilana Beach Resort', 180.00, 5, '/images/hotels/andilana.jpg'),
(1, 'Ravintsara Wellness Hotel', 140.00, 4, '/images/hotels/ravintsara.jpg'),
(1, 'L''Heure Bleue', 95.00, 4, '/images/hotels/heure-bleue.jpg'),
-- Isalo
(2, 'Isalo Rock Lodge', 160.00, 4, '/images/hotels/rock-lodge.jpg'),
(2, 'Le Jardin du Roy', 110.00, 3, '/images/hotels/jardin-roy.jpg'),
(2, 'Relais de la Reine', 105.00, 3, '/images/hotels/relais-reine.jpg'),
-- Sainte-Marie
(3, 'Princesse Bora Lodge', 185.00, 4, '/images/hotels/bora-lodge.jpg'),
(3, 'Soanambo Hotel', 120.00, 4, '/images/hotels/soanambo.jpg'),
(3, 'Libertalia Hotel', 75.00, 3, '/images/hotels/libertalia.jpg');

INSERT INTO gastronomie (destination_id, name, specialite, budget_min, budget_max, stars, img) VALUES
-- Nosy Be
(1, 'Le Papillon', 'Cuisine Italienne & Fruits de mer', 15.00, 40.00, 5, '/images/restos/papillon.jpg'),
(1, 'Chez Loulou', 'Poissons grillés & Plats locaux', 8.00, 20.00, 4, '/images/restos/loulou.jpg'),
-- Isalo
(2, 'La Table d''Aloalo', 'Zébu aux poivres verts', 12.00, 30.00, 4, '/images/restos/aloalo.jpg'),
(2, 'Berny''s', 'Cuisine Européenne & Malagasy', 7.00, 18.00, 3, '/images/restos/berny.jpg'),
-- Sainte-Marie
(3, 'Le Samouraï', 'Carpaccio de poisson & Langoustes', 15.00, 35.00, 4, '/images/restos/samourai.jpg'),
(3, 'La Bigorne', 'Punch coco & Fruits de mer', 10.00, 22.00, 3, '/images/restos/bigorne.jpg');

INSERT INTO activites (destination_id, title, duration, type, img) VALUES
-- Nosy Be
(1, 'Plongée à Nosy Tanikely', 'Demi-journée', 'Sport', '/images/act/plongee.jpg'),
(1, 'Safari Baleines', '3 heures', 'Nature', '/images/act/baleines.jpg'),
(1, 'Tour de l''île en Quad', 'Journée', 'Aventure', '/images/act/quad.jpg'),
-- Isalo
(2, 'Randonnée Namaza', '4 heures', 'Trek', '/images/act/namaza.jpg'),
(2, 'Coucher de soleil à la Fenêtre', '1 heure', 'Photo', '/images/act/fenetre.jpg'),
(2, 'Piscine Naturelle', '2 heures', 'Détente', '/images/act/piscine.jpg'),
-- Sainte-Marie
(3, 'Sortie Baleines', '3 heures', 'Nature', '/images/act/baleines.jpg'),
(3, 'Pirogue à l''Île aux Nattes', '4 heures', 'Détente', '/images/act/nattes.jpg'),
(3, 'Histoire des Pirates', '2 heures', 'Culture', '/images/act/pirates.jpg');


-- Mise à jour de Nosy Be
UPDATE destinations 
SET description = 'Véritable sanctuaire de biodiversité marine et terrestre, Nosy Be envoûte dès l''arrivée par les effluves sucrées d''ylang-ylang et de vanille qui flottent dans l''air. Entre ses baies aux eaux turquoise, ses forêts primaires où se cachent des lémuriens curieux et ses îlots satellites comme Nosy Tanikely, l''île offre une parenthèse hors du temps, où le luxe rencontre l''authenticité malgache.',
    bon_plan = 'Évitez les plages bondées d''Hell-Ville. Prenez une pirogue traditionnelle au lever du soleil vers Nosy Sakatia pour nager avec les tortues vertes en toute intimité, puis terminez la journée par un coucher de soleil au sommet du Mont Passot.'
WHERE slug = 'nosy-be';

-- Mise à jour de L'Isalo
UPDATE destinations 
SET description = 'Sculpté par l''érosion sur des millions d''années, le massif de l''Isalo est un chef-d''œuvre géologique de grès jurassique. Ce décor de western austral, alternant canyons profonds, piscines naturelles d''eau cristalline et savanes dorées, abrite une flore endémique unique et des sépultures sacrées Bara. C''est une terre de contrastes où le silence minéral n''est rompu que par le cri des lémuriens Catta.',
    bon_plan = 'Pour une expérience mystique, demandez à votre guide de vous emmener au Canyon des Singes dès l''ouverture du parc. Vous aurez la chance d''observer les lémuriens s''éveiller avant l''arrivée des autres randonneurs, dans une lumière matinale irréelle.'
WHERE slug = 'isalo';

-- Mise à jour de Sainte-Marie (Nosy Boraha)
UPDATE destinations 
SET description = 'Ancien repaire de pirates au XVIIe siècle, Sainte-Marie est une île-jardin où la nature règne en maître. Bordée de récifs coralliens intacts et de forêts de mangroves, elle devient chaque année le théâtre d''un spectacle majestueux : le ballet des baleines à bosse. Ici, le rythme de vie suit celui des marées, offrant une sérénité absolue loin du tumulte du monde moderne.',
    bon_plan = 'Ne vous contentez pas de la route principale. Louez un vélo et traversez l''île vers l''Est pour rejoindre la côte sauvage. Là, dégustez une langouste grillée les pieds dans le sable à la pointe d''Ampanihy, face à l''immensité de l''Océan Indien.'
WHERE slug = 'sainte-marie';


ALTER TABLE activites
ADD COLUMN IF NOT EXISTS price numeric(10,2) DEFAULT 0;

UPDATE activites SET price = 45.00 WHERE title = 'Plongée à Nosy Tanikely';
UPDATE activites SET price = 35.00 WHERE title = 'Safari Baleines';
UPDATE activites SET price = 50.00 WHERE title = 'Tour de l''île en Quad';

UPDATE activites SET price = 20.00 WHERE title = 'Randonnée Namaza';
UPDATE activites SET price = 10.00 WHERE title = 'Coucher de soleil à la Fenêtre';
UPDATE activites SET price = 12.00 WHERE title = 'Piscine Naturelle';

UPDATE activites SET price = 40.00 WHERE title = 'Sortie Baleines';
UPDATE activites SET price = 18.00 WHERE title = 'Pirogue à l''Île aux Nattes';
UPDATE activites SET price = 15.00 WHERE title = 'Histoire des Pirates';

ALTER TABLE activites
ADD COLUMN IF NOT EXISTS description text;

UPDATE activites
SET description = 'Explorez les fonds marins exceptionnels de la réserve de Nosy Tanikely, entre coraux, poissons tropicaux et eaux translucides.'
WHERE title = 'Plongée à Nosy Tanikely';

UPDATE activites
SET description = 'Partez en mer à la rencontre des baleines dans leur habitat naturel, accompagné d’un guide local passionné.'
WHERE title = 'Safari Baleines';

UPDATE activites
SET description = 'Traversez pistes, villages et panoramas côtiers lors d’une journée riche en sensations.'
WHERE title = 'Tour de l''île en Quad';

UPDATE activites
SET description = 'Une randonnée emblématique au cœur de l’Isalo, entre canyon, faune endémique et oasis naturelle.'
WHERE title = 'Randonnée Namaza';

UPDATE activites
SET description = 'Admirez les dernières lueurs du jour dans l’un des points de vue les plus iconiques de Madagascar.'
WHERE title = 'Coucher de soleil à la Fenêtre';

UPDATE activites
SET description = 'Profitez d’une pause fraîcheur dans un cadre naturel spectaculaire après une marche accessible.'
WHERE title = 'Piscine Naturelle';

UPDATE activites
SET description = 'Observez les majestueuses baleines à bosse au large de Sainte-Marie pendant la saison des migrations.'
WHERE title = 'Sortie Baleines';

UPDATE activites
SET description = 'Une traversée douce en pirogue vers l’Île aux Nattes, idéale pour une immersion au rythme des lagons.'
WHERE title = 'Pirogue à l''Île aux Nattes';

UPDATE activites
SET description = 'Revivez les légendes et l’histoire fascinante des pirates qui ont marqué Sainte-Marie.'
WHERE title = 'Histoire des Pirates';


ALTER TABLE activites
ADD COLUMN IF NOT EXISTS price numeric(10,2) DEFAULT 0;

ALTER TABLE activites
ADD COLUMN IF NOT EXISTS description text;

ALTER TABLE activites
ADD COLUMN IF NOT EXISTS preferred_moment text
CHECK (preferred_moment IN ('morning', 'afternoon', 'evening', 'flex'));

ALTER TABLE activites
ADD COLUMN IF NOT EXISTS category text;

ALTER TABLE activites
ADD COLUMN IF NOT EXISTS intensity text
CHECK (intensity IN ('low', 'medium', 'high'));

ALTER TABLE gastronomie
ADD COLUMN IF NOT EXISTS meal_service text DEFAULT 'both'
CHECK (meal_service IN ('lunch', 'dinner', 'both'));

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists itineraries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text default 'draft',
  total_budget numeric(10,2) default 0,
  total_nights int default 0,
  starts_on date,
  ends_on date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists itinerary_items (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references itineraries(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,

  item_type text not null,
  source_item_id bigint,
  unique_key text not null,

  destination_id bigint,
  title text,
  description text,
  img text,

  price numeric(10,2) default 0,
  total_price numeric(10,2) default 0,

  duration text,
  preferred_moment text,
  meal_service text,
  category text,
  intensity text,

  check_in date,
  check_out date,
  nights int default 0,

  raw_data jsonb default '{}'::jsonb,

  created_at timestamptz default now()
);

create table if not exists itinerary_days (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references itineraries(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,

  day_number int not null,
  date_value date,
  destination_id bigint,
  hotel_title text,

  slots jsonb not null default '[]'::jsonb,

  created_at timestamptz default now()
);
alter table profiles enable row level security;
alter table itineraries enable row level security;
alter table itinerary_items enable row level security;
alter table itinerary_days enable row level security;

create policy "Users can view own profile"
on profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert own profile"
on profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update own profile"
on profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Users can view own profile"
on profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert own profile"
on profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update own profile"
on profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Users can view own itinerary items"
on itinerary_items
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own itinerary items"
on itinerary_items
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own itinerary items"
on itinerary_items
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own itinerary items"
on itinerary_items
for delete
to authenticated
using ((select auth.uid()) = user_id);


create table if not exists recits (
  id bigserial primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  category text not null,
  cover_image text not null,
  featured boolean default false,
  published boolean default true,
  read_time integer default 5,
  created_at timestamptz default now()
);

insert into recits (slug, title, excerpt, content, category, cover_image, featured, read_time)
values
(
  'guide-tsingy-bemaraha',
  'Guide ultime : Traverser les Tsingy de Bemaraha sans encombre',
  'Préparez votre aventure dans les Tsingy avec les bons réflexes, les meilleurs horaires et les points de vigilance.',
  'Les Tsingy de Bemaraha offrent une expérience unique à Madagascar. Pour réussir votre visite, il est conseillé de partir tôt le matin, de prévoir de bonnes chaussures, de l’eau en quantité et un guide local. La traversée des ponts suspendus et des formations calcaires demande un minimum de prudence, mais l’expérience est spectaculaire. Pensez aussi à réserver votre hébergement à l’avance si vous voyagez en haute saison.',
  'Aventure',
  '/TopDestination/tsingy.jpg',
  true,
  8
),
(
  'art-zafimaniry',
  'L''art du Zafimaniry : un patrimoine mondial',
  'Plongez dans l’histoire fascinante de ce peuple sculpteur des Hautes Terres.',
  'Le savoir-faire des Zafimaniry est reconnu pour la finesse de ses sculptures sur bois et son importance culturelle. Dans les Hautes Terres, plusieurs villages permettent de découvrir ce patrimoine vivant. Une visite accompagnée permet de mieux comprendre la transmission des motifs et le rôle de l’artisanat dans la vie quotidienne locale.',
  'Culture',
  '/TopDestination/ambohimanga.jpg',
  false,
  6
),
(
  'saveurs-antsirabe',
  'Top 5 des saveurs à goûter à Antsirabe',
  'Du riz rouge au Vary amin''anana, découvrez les délices de la Ville d''Eau.',
  'Antsirabe est une destination idéale pour découvrir une cuisine chaleureuse et ancrée dans les produits locaux. Entre les marchés colorés, les plats traditionnels et les spécialités préparées en famille, la ville offre une belle introduction à la gastronomie des Hautes Terres. Prenez le temps de goûter les recettes locales dans de petites adresses authentiques.',
  'Gastronomie',
  '/TopDestination/antsirabe.jpg',
  false,
  5
),
(
  'indri-indri-andasibe',
  'À la rencontre de l''Indri-Indri à Andasibe',
  'Écoutez le chant mystique du plus grand lémurien de Madagascar en forêt vierge.',
  'Andasibe est l’un des meilleurs endroits pour observer l’Indri-Indri. Une sortie au lever du jour permet de profiter au mieux des sons de la forêt et d’augmenter les chances d’observation. Le parc offre aussi une biodiversité remarquable, avec caméléons, oiseaux endémiques et végétation luxuriante.',
  'Faune & Flore',
  '/TopDestination/lemurien1.jpg',
  false,
  7
);


