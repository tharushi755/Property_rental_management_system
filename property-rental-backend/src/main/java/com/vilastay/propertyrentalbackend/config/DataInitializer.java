package com.vilastay.propertyrentalbackend.config;

import com.vilastay.propertyrentalbackend.entity.Property;
import com.vilastay.propertyrentalbackend.entity.User;
import com.vilastay.propertyrentalbackend.repository.BookingRepository;
import com.vilastay.propertyrentalbackend.repository.PropertyRepository;
import com.vilastay.propertyrentalbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // Create Admin User if not exists
        if (!userRepository.existsByEmail("admin@vilastay.com")) {
            User admin = new User();
            admin.setName("Super Admin");
            admin.setEmail("admin@vilastay.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhone("+1 234 567 8900");
            admin.setRole("ADMIN");
            admin.setActive(true);
            userRepository.save(admin);
            System.out.println("✅ Admin user created: admin@vilastay.com / admin123");
        }

        // Create Sample Guest User if not exists
        if (!userRepository.existsByEmail("guest@example.com")) {
            User guest = new User();
            guest.setName("John Guest");
            guest.setEmail("guest@example.com");
            guest.setPassword(passwordEncoder.encode("guest123"));
            guest.setPhone("+1 555 123 4567");
            guest.setRole("GUEST");
            guest.setActive(true);
            userRepository.save(guest);
            System.out.println("✅ Guest user created: guest@example.com / guest123");
        }

        // Create Sample Owner User if not exists
        if (!userRepository.existsByEmail("owner@example.com")) {
            User owner = new User();
            owner.setName("Sarah Owner");
            owner.setEmail("owner@example.com");
            owner.setPassword(passwordEncoder.encode("owner123"));
            owner.setPhone("+1 555 987 6543");
            owner.setRole("OWNER");
            owner.setActive(true);
            userRepository.save(owner);
            System.out.println("✅ Owner user created: owner@example.com / owner123");
        }

        // Get owner
        User owner = userRepository.findByEmail("owner@example.com").orElse(null);

        // ONLY create properties if none exist (don't delete existing)
        if (propertyRepository.count() == 0 && owner != null) {

            // ========== SANTORINI PROPERTIES (2 properties) ==========
            Property santorini1 = new Property();
            santorini1.setTitle("Santorini Cliffside Villa");
            santorini1.setType("Villa");
            santorini1.setLocation("Santorini, Greece");
            santorini1.setPrice(320);
            santorini1.setRating(4.9);
            santorini1.setReviews(128);
            santorini1.setGuests(6);
            santorini1.setBeds(3);
            santorini1.setBaths(2);
            santorini1.setDescription("Perched dramatically on the caldera cliff, this iconic whitewashed villa offers breathtaking views of the Aegean Sea.");
            santorini1.setImageUrl("https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=250&fit=crop");
            santorini1.setAmenities("Private pool, Sea view, Fast WiFi, Parking, Full kitchen, Air conditioning");
            santorini1.setStatus("APPROVED");
            santorini1.setOwner(owner);
            propertyRepository.save(santorini1);

            Property santorini2 = new Property();
            santorini2.setTitle("Caldera View Suite");
            santorini2.setType("Suite");
            santorini2.setLocation("Santorini, Greece");
            santorini2.setPrice(280);
            santorini2.setRating(4.7);
            santorini2.setReviews(89);
            santorini2.setGuests(4);
            santorini2.setBeds(2);
            santorini2.setBaths(2);
            santorini2.setDescription("Beautiful suite with stunning sunset views over the caldera.");
            santorini2.setImageUrl("https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=250&fit=crop");
            santorini2.setAmenities("Sea view, Hot tub, Breakfast included, WiFi");
            santorini2.setStatus("APPROVED");
            santorini2.setOwner(owner);
            propertyRepository.save(santorini2);

            // ========== MALDIVES PROPERTIES (2 properties) ==========
            Property maldives1 = new Property();
            maldives1.setTitle("Maldives Overwater Cabana");
            maldives1.setType("Cabana");
            maldives1.setLocation("Maldives");
            maldives1.setPrice(580);
            maldives1.setRating(5.0);
            maldives1.setReviews(64);
            maldives1.setGuests(2);
            maldives1.setBeds(1);
            maldives1.setBaths(1);
            maldives1.setDescription("Step directly from your private deck into crystal-clear lagoon.");
            maldives1.setImageUrl("https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=250&fit=crop");
            maldives1.setAmenities("Ocean deck, Snorkeling, Welcome drink, Outdoor bath");
            maldives1.setStatus("APPROVED");
            maldives1.setOwner(owner);
            propertyRepository.save(maldives1);

            Property maldives2 = new Property();
            maldives2.setTitle("Beachfront Bungalow");
            maldives2.setType("Bungalow");
            maldives2.setLocation("Maldives");
            maldives2.setPrice(420);
            maldives2.setRating(4.8);
            maldives2.setReviews(112);
            maldives2.setGuests(4);
            maldives2.setBeds(2);
            maldives2.setBaths(2);
            maldives2.setDescription("Beautiful beachfront bungalow with private beach access.");
            maldives2.setImageUrl("https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&h=250&fit=crop");
            maldives2.setAmenities("Beach access, Pool, Restaurant, WiFi");
            maldives2.setStatus("APPROVED");
            maldives2.setOwner(owner);
            propertyRepository.save(maldives2);

            // ========== SWISS ALPS PROPERTIES (3 properties) ==========
            Property swiss1 = new Property();
            swiss1.setTitle("Swiss Alps Luxury Chalet");
            swiss1.setType("Chalet");
            swiss1.setLocation("Swiss Alps");
            swiss1.setPrice(450);
            swiss1.setRating(4.8);
            swiss1.setReviews(91);
            swiss1.setGuests(8);
            swiss1.setBeds(4);
            swiss1.setBaths(3);
            swiss1.setDescription("A masterpiece of alpine architecture nestled amid snow-dusted peaks.");
            swiss1.setImageUrl("https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop");
            swiss1.setAmenities("Ski-in/out, Fireplace, Private sauna, Wine cellar");
            swiss1.setStatus("APPROVED");
            swiss1.setOwner(owner);
            propertyRepository.save(swiss1);

            Property swiss2 = new Property();
            swiss2.setTitle("Mountain View Lodge");
            swiss2.setType("Lodge");
            swiss2.setLocation("Swiss Alps");
            swiss2.setPrice(320);
            swiss2.setRating(4.7);
            swiss2.setReviews(156);
            swiss2.setGuests(6);
            swiss2.setBeds(3);
            swiss2.setBaths(2);
            swiss2.setDescription("Cozy lodge with stunning mountain views and fireplace.");
            swiss2.setImageUrl("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop");
            swiss2.setAmenities("Mountain view, Fireplace, Parking, WiFi");
            swiss2.setStatus("APPROVED");
            swiss2.setOwner(owner);
            propertyRepository.save(swiss2);

            Property swiss3 = new Property();
            swiss3.setTitle("Alpine Retreat Cabin");
            swiss3.setType("Cabin");
            swiss3.setLocation("Swiss Alps");
            swiss3.setPrice(250);
            swiss3.setRating(4.6);
            swiss3.setReviews(98);
            swiss3.setGuests(4);
            swiss3.setBeds(2);
            swiss3.setBaths(1);
            swiss3.setDescription("Rustic cabin perfect for couples seeking mountain adventure.");
            swiss3.setImageUrl("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop");
            swiss3.setAmenities("Hiking trails, Fire pit, Kitchen, WiFi");
            swiss3.setStatus("APPROVED");
            swiss3.setOwner(owner);
            propertyRepository.save(swiss3);

            // ========== BALI PROPERTIES (3 properties) ==========
            Property bali1 = new Property();
            bali1.setTitle("Bali Jungle Retreat");
            bali1.setType("Villa");
            bali1.setLocation("Bali");
            bali1.setPrice(185);
            bali1.setRating(4.7);
            bali1.setReviews(203);
            bali1.setGuests(4);
            bali1.setBeds(2);
            bali1.setBaths(2);
            bali1.setDescription("Immerse yourself in Bali's lush rainforest canopy.");
            bali1.setImageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop");
            bali1.setAmenities("Jungle view, Plunge pool, Breakfast, Spa access");
            bali1.setStatus("APPROVED");
            bali1.setOwner(owner);
            propertyRepository.save(bali1);

            Property bali2 = new Property();
            bali2.setTitle("Ubud Rice Terrace Villa");
            bali2.setType("Villa");
            bali2.setLocation("Bali");
            bali2.setPrice(150);
            bali2.setRating(4.6);
            bali2.setReviews(178);
            bali2.setGuests(3);
            bali2.setBeds(2);
            bali2.setBaths(2);
            bali2.setDescription("Stunning villa overlooking beautiful rice terraces.");
            bali2.setImageUrl("https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=250&fit=crop");
            bali2.setAmenities("Rice terrace view, Pool, Yoga deck, Breakfast");
            bali2.setStatus("APPROVED");
            bali2.setOwner(owner);
            propertyRepository.save(bali2);

            Property bali3 = new Property();
            bali3.setTitle("Beachfront Villa Seminyak");
            bali3.setType("Villa");
            bali3.setLocation("Bali");
            bali3.setPrice(220);
            bali3.setRating(4.8);
            bali3.setReviews(145);
            bali3.setGuests(5);
            bali3.setBeds(3);
            bali3.setBaths(2);
            bali3.setDescription("Luxury beachfront villa with private pool and staff.");
            bali3.setImageUrl("https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=250&fit=crop");
            bali3.setAmenities("Beachfront, Private pool, Staff, WiFi");
            bali3.setStatus("APPROVED");
            bali3.setOwner(owner);
            propertyRepository.save(bali3);

            // ========== BARCELONA PROPERTIES (2 properties) ==========
            Property barca1 = new Property();
            barca1.setTitle("Barcelona Boutique Hotel");
            barca1.setType("Hotel");
            barca1.setLocation("Barcelona");
            barca1.setPrice(140);
            barca1.setRating(4.6);
            barca1.setReviews(312);
            barca1.setGuests(2);
            barca1.setBeds(1);
            barca1.setBaths(1);
            barca1.setDescription("Located in the heart of Barcelona's historic Gothic Quarter.");
            barca1.setImageUrl("https://images.unsplash.com/photo-1564501049412-61c2a30805a1?w=400&h=250&fit=crop");
            barca1.setAmenities("City view, Rooftop café, WiFi, Fitness centre");
            barca1.setStatus("APPROVED");
            barca1.setOwner(owner);
            propertyRepository.save(barca1);

            Property barca2 = new Property();
            barca2.setTitle("Gaudi Apartment");
            barca2.setType("Apartment");
            barca2.setLocation("Barcelona");
            barca2.setPrice(120);
            barca2.setRating(4.5);
            barca2.setReviews(234);
            barca2.setGuests(4);
            barca2.setBeds(2);
            barca2.setBaths(1);
            barca2.setDescription("Modern apartment near Sagrada Familia.");
            barca2.setImageUrl("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop");
            barca2.setAmenities("City view, AC, WiFi, Elevator");
            barca2.setStatus("APPROVED");
            barca2.setOwner(owner);
            propertyRepository.save(barca2);

            // ========== LAKE TAHOE PROPERTIES (3 properties) ==========
            Property tahoe1 = new Property();
            tahoe1.setTitle("Lake Tahoe Luxury Cabin");
            tahoe1.setType("Cabin");
            tahoe1.setLocation("Lake Tahoe, California");
            tahoe1.setPrice(320);
            tahoe1.setRating(4.8);
            tahoe1.setReviews(178);
            tahoe1.setGuests(6);
            tahoe1.setBeds(3);
            tahoe1.setBaths(2);
            tahoe1.setDescription("Stunning lakefront cabin with private dock and mountain views.");
            tahoe1.setImageUrl("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop");
            tahoe1.setAmenities("Lake view, Private dock, Fireplace, Hot tub");
            tahoe1.setStatus("APPROVED");
            tahoe1.setOwner(owner);
            propertyRepository.save(tahoe1);

            Property tahoe2 = new Property();
            tahoe2.setTitle("Ski Chalet at Heavenly");
            tahoe2.setType("Chalet");
            tahoe2.setLocation("Lake Tahoe, California");
            tahoe2.setPrice(280);
            tahoe2.setRating(4.7);
            tahoe2.setReviews(134);
            tahoe2.setGuests(8);
            tahoe2.setBeds(4);
            tahoe2.setBaths(3);
            tahoe2.setDescription("Perfect ski-in/ski-out chalet near Heavenly resort.");
            tahoe2.setImageUrl("https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop");
            tahoe2.setAmenities("Ski-in/out, Fireplace, Hot tub, Parking");
            tahoe2.setStatus("APPROVED");
            tahoe2.setOwner(owner);
            propertyRepository.save(tahoe2);

            Property tahoe3 = new Property();
            tahoe3.setTitle("Lakeview Cottage");
            tahoe3.setType("Cottage");
            tahoe3.setLocation("Lake Tahoe, California");
            tahoe3.setPrice(190);
            tahoe3.setRating(4.6);
            tahoe3.setReviews(98);
            tahoe3.setGuests(4);
            tahoe3.setBeds(2);
            tahoe3.setBaths(1);
            tahoe3.setDescription("Cozy cottage with stunning lake views.");
            tahoe3.setImageUrl("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop");
            tahoe3.setAmenities("Lake view, Fireplace, Kitchen, WiFi");
            tahoe3.setStatus("APPROVED");
            tahoe3.setOwner(owner);
            propertyRepository.save(tahoe3);

            // ========== COLORADO ROCKIES PROPERTIES (4 properties) ==========
            Property colo1 = new Property();
            colo1.setTitle("Aspen Mountain Lodge");
            colo1.setType("Lodge");
            colo1.setLocation("Colorado Rockies");
            colo1.setPrice(520);
            colo1.setRating(4.9);
            colo1.setReviews(203);
            colo1.setGuests(10);
            colo1.setBeds(5);
            colo1.setBaths(4);
            colo1.setDescription("Luxury lodge with stunning mountain views and private hot tub.");
            colo1.setImageUrl("https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop");
            colo1.setAmenities("Mountain view, Hot tub, Game room, WiFi");
            colo1.setStatus("APPROVED");
            colo1.setOwner(owner);
            propertyRepository.save(colo1);

            Property colo2 = new Property();
            colo2.setTitle("Breckenridge Ski Cabin");
            colo2.setType("Cabin");
            colo2.setLocation("Colorado Rockies");
            colo2.setPrice(380);
            colo2.setRating(4.7);
            colo2.setReviews(189);
            colo2.setGuests(6);
            colo2.setBeds(3);
            colo2.setBaths(2);
            colo2.setDescription("Cozy cabin near Breckenridge ski resort.");
            colo2.setImageUrl("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop");
            colo2.setAmenities("Fireplace, Hot tub, Ski storage, Parking");
            colo2.setStatus("APPROVED");
            colo2.setOwner(owner);
            propertyRepository.save(colo2);

            Property colo3 = new Property();
            colo3.setTitle("Vail Mountain Retreat");
            colo3.setType("Chalet");
            colo3.setLocation("Colorado Rockies");
            colo3.setPrice(450);
            colo3.setRating(4.8);
            colo3.setReviews(156);
            colo3.setGuests(8);
            colo3.setBeds(4);
            colo3.setBaths(3);
            colo3.setDescription("Stunning chalet in the heart of Vail.");
            colo3.setImageUrl("https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop");
            colo3.setAmenities("Ski-in/out, Sauna, Fireplace, WiFi");
            colo3.setStatus("APPROVED");
            colo3.setOwner(owner);
            propertyRepository.save(colo3);

            Property colo4 = new Property();
            colo4.setTitle("Telluride Condo");
            colo4.setType("Condo");
            colo4.setLocation("Colorado Rockies");
            colo4.setPrice(290);
            colo4.setRating(4.6);
            colo4.setReviews(112);
            colo4.setGuests(4);
            colo4.setBeds(2);
            colo4.setBaths(2);
            colo4.setDescription("Modern condo with mountain views.");
            colo4.setImageUrl("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop");
            colo4.setAmenities("Mountain view, Pool, Gym, WiFi");
            colo4.setStatus("APPROVED");
            colo4.setOwner(owner);
            propertyRepository.save(colo4);

            // ========== GREAT SMOKY MOUNTAINS PROPERTIES (3 properties) ==========
            Property smoky1 = new Property();
            smoky1.setTitle("Smoky Mountain Retreat");
            smoky1.setType("Cabin");
            smoky1.setLocation("Great Smoky Mountains");
            smoky1.setPrice(195);
            smoky1.setRating(4.7);
            smoky1.setReviews(312);
            smoky1.setGuests(5);
            smoky1.setBeds(3);
            smoky1.setBaths(2);
            smoky1.setDescription("Secluded cabin with panoramic mountain views and private hot tub.");
            smoky1.setImageUrl("https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=250&fit=crop");
            smoky1.setAmenities("Mountain view, Hot tub, Fireplace, Pool table");
            smoky1.setStatus("APPROVED");
            smoky1.setOwner(owner);
            propertyRepository.save(smoky1);

            Property smoky2 = new Property();
            smoky2.setTitle("Gatlinburg Log Cabin");
            smoky2.setType("Cabin");
            smoky2.setLocation("Great Smoky Mountains");
            smoky2.setPrice(165);
            smoky2.setRating(4.6);
            smoky2.setReviews(245);
            smoky2.setGuests(4);
            smoky2.setBeds(2);
            smoky2.setBaths(2);
            smoky2.setDescription("Cozy log cabin with fireplace and private deck.");
            smoky2.setImageUrl("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop");
            smoky2.setAmenities("Fireplace, Deck, Kitchen, WiFi");
            smoky2.setStatus("APPROVED");
            smoky2.setOwner(owner);
            propertyRepository.save(smoky2);

            Property smoky3 = new Property();
            smoky3.setTitle("Mountain View Chalet");
            smoky3.setType("Chalet");
            smoky3.setLocation("Great Smoky Mountains");
            smoky3.setPrice(230);
            smoky3.setRating(4.8);
            smoky3.setReviews(167);
            smoky3.setGuests(6);
            smoky3.setBeds(3);
            smoky3.setBaths(2);
            smoky3.setDescription("Modern chalet with stunning mountain views.");
            smoky3.setImageUrl("https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop");
            smoky3.setAmenities("Mountain view, Fire pit, Game room, WiFi");
            smoky3.setStatus("APPROVED");
            smoky3.setOwner(owner);
            propertyRepository.save(smoky3);

            System.out.println("✅ " + propertyRepository.count() + " Sample properties created!");
        } else {
            System.out.println("📝 Properties already exist. Skipping property creation.");
        }

        System.out.println("========================================");
        System.out.println("  📝 Users:");
        System.out.println("  Admin:  admin@vilastay.com / admin123");
        System.out.println("  Guest:  guest@example.com / guest123");
        System.out.println("  Owner:  owner@example.com / owner123");
        System.out.println("  📝 Properties: " + propertyRepository.count() + " properties available");
        System.out.println("========================================");
    }
}