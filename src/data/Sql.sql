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