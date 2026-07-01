package com.vilastay.propertyrentalbackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.vilastay.propertyrentalbackend.entity.Property;
import com.vilastay.propertyrentalbackend.entity.User;
import com.vilastay.propertyrentalbackend.repository.BookingRepository;
import com.vilastay.propertyrentalbackend.repository.PropertyRepository;
import com.vilastay.propertyrentalbackend.repository.UserRepository;

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

            // ========== KANDY PROPERTIES (2 properties) ==========
            Property kandy1 = new Property();
            kandy1.setTitle("Hotel Suisse Kandy");
            kandy1.setType("Hotel");
            kandy1.setLocation("Kandy");
            kandy1.setPrice(25000);
            kandy1.setRating(4.9);
            kandy1.setReviews(128);
            kandy1.setGuests(3);
            kandy1.setBeds(1);
            kandy1.setBaths(1);
            kandy1.setDescription("Suisse is housed in a colonial building, across Kandy Lake. Offering rooms with views of the tropical garden or Kandy Lake, it has a spa, a restaurant and free parking.");
            kandy1.setImageUrl("https://cf.bstatic.com/xdata/images/hotel/max1024x768/701829228.jpg?k=4e391a56dfbebce81ee15758f8ae847746296cf08e01de65ee87fd2cfb92483b&o=");
            kandy1.setAmenities("Outdoor swimming pool,Free WiFi ,Airport shuttle,Free parking,Restaurant,Room service,Tea/coffee maker in all rooms,Bar,Good breakfast");
            kandy1.setStatus("APPROVED");
            kandy1.setOwner(owner);
            propertyRepository.save(kandy1);

            /*Property kandy2 = new Property();
            kandy2.setTitle("Beachfront Bungalow");
            kandy2.setType("Bungalow");
            kandy2.setLocation("Kandy");
            kandy2.setPrice(42000);
            kandy2.setRating(4.7);
            kandy2.setReviews(89);
            kandy2.setGuests(4);
            kandy2.setBeds(2);
            kandy2.setBaths(2);
            kandy2.setDescription("This Kandy hotel also offers air-conditioned rooms, including private balconies with mountain or valley views. Each room at Amaya Hills Kandy is fitted with a flat-screen TV and tea/coffee making facilities. The attached bathroom has a bathtub and shower.");
            kandy2.setImageUrl("https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&h=250&fit=crop");
            kandy2.setAmenities("Pool, Restaurant, WiFi");
            kandy2.setStatus("APPROVED");
            kandy2.setOwner(owner);
            propertyRepository.save(kandy2);*/

            // ========== GALLE PROPERTIES (5 properties) ==========
            Property galle1 = new Property();
            galle1.setTitle("Refuge Boutique Villa");
            galle1.setType("Cabana");
            galle1.setLocation("Galle");
            galle1.setPrice(45000);
            galle1.setRating(5.0);
            galle1.setReviews(64);
            galle1.setGuests(8);
            galle1.setBeds(4);
            galle1.setBaths(3);
            galle1.setDescription("Step directly from your private deck into crystal-clear lagoon.");
            galle1.setImageUrl("https://cf.bstatic.com/xdata/images/hotel/max1024x768/863304954.jpg?k=7818e8a071f99c7f3ef4612466e6082e8bd8614266a48083f763ff8b4da2431a&o=");
            galle1.setAmenities("Beachfront, Free WiFi ,Family rooms, Free parking, Non-smoking rooms, Private beach area ,Breakfast");
            galle1.setStatus("APPROVED");
            galle1.setOwner(owner);
            propertyRepository.save(galle1);

            Property galle2 = new Property();
            galle2.setTitle("Beachfront Bungalow");
            galle2.setType("Bungalow");
            galle2.setLocation("Maldives");
            galle2.setPrice(420);
            galle2.setRating(4.8);
            galle2.setReviews(112);
            galle2.setGuests(4);
            galle2.setBeds(2);
            galle2.setBaths(2);
            galle2.setDescription("Beautiful beachfront bungalow with private beach access.");
            galle2.setImageUrl("https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&h=250&fit=crop");
            galle2.setAmenities("Beach access, Pool, Restaurant, WiFi");
            galle2.setStatus("APPROVED");
            galle2.setOwner(owner);
            propertyRepository.save(galle2);

           /*  // ========== SWISS ALPS PROPERTIES (3 properties) ==========
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
            propertyRepository.save(swiss3);*/

            // ========== NUWARA-ELIYA  PROPERTIES (4 properties) ==========
            Property nwe1 = new Property();
            nwe1.setTitle("Aspen Mountain Lodge");
            nwe1.setType("Lodge");
            nwe1.setLocation("Nuwara-Eliya");
            nwe1.setPrice(45000);
            nwe1.setRating(4.7);
            nwe1.setReviews(203);
            nwe1.setGuests(4);
            nwe1.setBeds(2);
            nwe1.setBaths(2);
            nwe1.setDescription("Luxury lodge with stunning mountain views and private hot tub.");
            nwe1.setImageUrl("https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop");
            nwe1.setAmenities("Mountain view, Hot tub, Game room, WiFi");
            nwe1.setStatus("APPROVED");
            nwe1.setOwner(owner);
            propertyRepository.save(nwe1);

            Property nwe2 = new Property();
            nwe2.setTitle("The Bellwood Manor");
            nwe2.setType("Bangalow");
            nwe2.setLocation("Nuwara-Eliya");
            nwe2.setPrice(25000);
            nwe2.setRating(4.6);
            nwe2.setReviews(178);
            nwe2.setGuests(8);
            nwe2.setBeds(4);
            nwe2.setBaths(3);
            nwe2.setDescription("Situated in Nuwara Eliya, 1.8 km from Gregory Lake, The Bellwood Manor features accommodation with a garden, free private parking, a terrace and a bar.");
            nwe2.setImageUrl("https://cf.bstatic.com/xdata/images/hotel/max1024x768/445051770.jpg?k=a497fdfb5b6ad0211abd31a380729b78e4e11c3ba59330f33a525a86bebe60f2&o=");
            nwe2.setAmenities("Free WiFi ,Family rooms ,Free parking ,Spa and wellness centre ,Non-smoking rooms, Room service, Bar ,24-hour front desk ,Tea/coffee maker in all rooms,  Very good breakfast");
            nwe2.setStatus("APPROVED");
            nwe2.setOwner(owner);
            propertyRepository.save(nwe2);

            Property nwe3 = new Property();
            nwe3.setTitle("Breckenridge Ski Cabin");
            nwe3.setType("cabin");
            nwe3.setLocation("Nuwara-Eliya");
            nwe3.setPrice(38000);
            nwe3.setRating(4.8);
            nwe3.setReviews(145);
            nwe3.setGuests(6);
            nwe3.setBeds(3);
            nwe3.setBaths(2);
            nwe3.setDescription("Cozy cabin near Breckenridge ski resort.");
            nwe3.setImageUrl("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop");
            nwe3.setAmenities("Fireplace, Hot tub, Ski storage, Parking");
            nwe3.setStatus("APPROVED");
            nwe3.setOwner(owner);
            propertyRepository.save(nwe3);

            /*// ========== BARCELONA PROPERTIES (2 properties) ==========
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
            propertyRepository.save(barca2);*/

            // ========== NEGOMBO PROPERTIES (3 properties) ==========
            Property negombo1 = new Property();
            negombo1.setTitle("Swanee Grand");
            negombo1.setType("Hotel");
            negombo1.setLocation("Negombo,Kibulapitiya");
            negombo1.setPrice(50000);
            negombo1.setRating(4.8);
            negombo1.setReviews(178);
            negombo1.setGuests(5);
            negombo1.setBeds(3);
            negombo1.setBaths(2);
            negombo1.setDescription("Set in Negombo, less than 1 km from Wellaweediya Beach, Belmont Boutique Hotel Negombo- Free Airport Shuttle Service offers accommodation with an outdoor swimming pool, free private parking and a garden.");
            negombo1.setImageUrl("https://cf.bstatic.com/xdata/images/hotel/max1024x768/286302393.jpg?k=e1a1cfa273714834e27a18dc2260ddb50754e666a1c6daabf989f92fcc6b8c62&o=");
            negombo1.setAmenities("Outdoor swimming pool ,Airport shuttle ,Free WiFi, Family rooms, Restaurant ,24-hour front desk , Free parking, Non-smoking rooms, Tea/coffee maker in all rooms , Fabulous breakfast");
            negombo1.setStatus("APPROVED");
            negombo1.setOwner(owner);
            propertyRepository.save(negombo1);

            Property negombo2 = new Property();
            negombo2.setTitle("Lotus Luxury Residencies");
            negombo2.setType("Apartment");
            negombo2.setLocation("Negombo");
            negombo2.setPrice(2800);
            negombo2.setRating(4.7);
            negombo2.setReviews(134);
            negombo2.setGuests(6);
            negombo2.setBeds(3);
            negombo2.setBaths(2);
            negombo2.setDescription("Situated in Negombo, Lotus Luxury Residencies provides accommodation with seating area. This apartment features free private parking, a 24-hour front desk and free WiFi.");
            negombo2.setImageUrl("https://cf.bstatic.com/xdata/images/hotel/max1024x768/813648706.jpg?k=1cdd2cde01dacb8763209d6abda7c43885040b7f2f1e89157b8dcaa54439e8f4&o=");
            negombo2.setAmenities("Free WiFi, Family rooms, 24-hour front desk, Free parking ,Non-smoking rooms, Air conditioning");
            negombo2.setStatus("APPROVED");
            negombo2.setOwner(owner);
            propertyRepository.save(negombo2);

            Property negombo3 = new Property();
            negombo3.setTitle("Jetwing Thalahena Villa");
            negombo3.setType("villa");
            negombo3.setLocation("Negombo");
            negombo3.setPrice(10000);
            negombo3.setRating(4.6);
            negombo3.setReviews(98);
            negombo3.setGuests(4);
            negombo3.setBeds(2);
            negombo3.setBaths(1);
            negombo3.setDescription("Facing the seafront in Negombo, Jetwing Thalahena Villa is a villa, featuring an outdoor pool and private parking.");
            negombo3.setImageUrl("https://cf.bstatic.com/xdata/images/hotel/max1024x768/51909806.jpg?k=287306821691b07bb4cd144f6631d11cf4b69d1cae9abb22d4fcdde030fdef0f&o=");
            negombo3.setAmenities("Outdoor swimming pool, Free WiFi ,Beachfront ,Free parking ,Non-smoking rooms ,Room service ,Air conditioning, Garden, Breakfast");
            negombo3.setStatus("APPROVED");
            negombo3.setOwner(owner);
            propertyRepository.save(negombo3);

            // ========== COLOMBO ROCKIES PROPERTIES (1 properties) ==========
            Property colo1 = new Property();
            colo1.setTitle("Marino Beach Colombo");
            colo1.setType("Hotel");
            colo1.setLocation("Colombo");
            colo1.setPrice(15000);
            colo1.setRating(4.9);
            colo1.setReviews(203);
            colo1.setGuests(4);
            colo1.setBeds(2);
            colo1.setBaths(2);
            colo1.setDescription("Situated in Colombo, a few steps from Bambalapitiya Beach, Marino Beach Colombo features accommodation with an outdoor swimming pool, free private parking, a fitness centre and a garden.");
            colo1.setImageUrl("https://cf.bstatic.com/xdata/images/hotel/max1024x768/156672332.jpg?k=b4f3d04cbc8b0c80193f63046e63e576ba1a50fc9f48289aa152f10a026aab4d&o=");
            colo1.setAmenities("Outdoor swimming pool, Airport shuttle, Non-smoking rooms, Spa and wellness centre, Fitness centre, Room service ,Facilities for disabled guests, Tea/coffee maker in all rooms, Bar ,Superb breakfast");
            colo1.setStatus("APPROVED");
            colo1.setOwner(owner);
            propertyRepository.save(colo1);

            /*Property colo2 = new Property();
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
            propertyRepository.save(colo4);*/

            // ========== GAMPAHA PROPERTIES (1 properties) ==========
            Property gampaha1 = new Property();
            gampaha1.setTitle("The Covanro Airport Hotel");
            gampaha1.setType("Hotel");
            gampaha1.setLocation("Gampaha,Katunayake");
            gampaha1.setPrice(30000);
            gampaha1.setRating(4.7);
            gampaha1.setReviews(312);
            gampaha1.setGuests(6);
            gampaha1.setBeds(3);
            gampaha1.setBaths(2);
            gampaha1.setDescription("Situated in Gampaha, 26 km from St Anthony's Church, The Covanro Airport Hotel - Katunayake features accommodation with an outdoor swimming pool, free private parking, a garden and a shared lounge.");
            gampaha1.setImageUrl("https://cf.bstatic.com/xdata/images/hotel/max1024x768/351246493.jpg?k=31c2cedbe69ffb41853c9557754690814cbd56ff92d80c1a73a0e8b62d99a62c&o=");
            gampaha1.setAmenities("Free Wi-Fi,Pool,Gym,Facilities for disabled guests, Room service,Tea/coffee maker in all rooms ,Bar, Breakfast,Airport shuttle");
            gampaha1.setStatus("APPROVED");
            gampaha1.setOwner(owner);
            propertyRepository.save(gampaha1);

           /*Property gampaha2 = new Property();
            gampaha2.setTitle("Gatlinburg Log Cabin");
            gampaha2.setType("Cabin");
            gampaha2.setLocation("Great Smoky Mountains");
            gampaha2.setPrice(165);
            gampaha2.setRating(4.6);
            gampaha2.setReviews(245);
            gampaha2.setGuests(4);
            gampaha2.setBeds(2);
            gampaha2.setBaths(2);
            gampaha2.setDescription("Cozy log cabin with fireplace and private deck.");
            gampaha2.setImageUrl("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop");
            gampaha2.setAmenities("Fireplace, Deck, Kitchen, WiFi");
            gampaha2.setStatus("APPROVED");
            gampaha2.setOwner(owner);
            propertyRepository.save(gampaha2);

            Property gampaha3 = new Property();
            gampaha3.setTitle("Mountain View Chalet");
            gampaha3.setType("Chalet");
            gampaha3.setLocation("Great Smoky Mountains");
            gampaha3.setPrice(230);
            gampaha3.setRating(4.8);
            gampaha3.setReviews(167);
            gampaha3.setGuests(6);
            gampaha3.setBeds(3);
            gampaha3.setBaths(2);
            gampaha3.setDescription("Modern chalet with stunning mountain views.");
            gampaha3.setImageUrl("https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop");
            gampaha3.setAmenities("Mountain view, Fire pit, Game room, WiFi");
            gampaha3.setStatus("APPROVED");
            gampaha3.setOwner(owner);
            propertyRepository.save(gampaha3);

            // ========== ANURADHAPURA PROPERTIES (1 properties) ========== */


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