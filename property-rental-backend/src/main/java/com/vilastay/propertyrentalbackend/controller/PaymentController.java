package com.vilastay.propertyrentalbackend.controller;

import com.vilastay.propertyrentalbackend.entity.Booking;
import com.vilastay.propertyrentalbackend.entity.Payment;
import com.vilastay.propertyrentalbackend.entity.Property;
import com.vilastay.propertyrentalbackend.entity.User;
import com.vilastay.propertyrentalbackend.repository.BookingRepository;
import com.vilastay.propertyrentalbackend.repository.PaymentRepository;
import com.vilastay.propertyrentalbackend.repository.PropertyRepository;
import com.vilastay.propertyrentalbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired private PaymentRepository paymentRepository;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private PropertyRepository propertyRepository;
    @Autowired private UserRepository userRepository;

    @PostMapping("/process")
    public Map<String, Object> processPayment(@RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        try {
            Long userId     = Long.valueOf(data.get("userId").toString());
            Long propertyId = Long.valueOf(data.get("propertyId").toString());
            LocalDate checkIn  = LocalDate.parse(data.get("checkIn").toString());
            LocalDate checkOut = LocalDate.parse(data.get("checkOut").toString());
            int guests         = Integer.parseInt(data.get("guests").toString());
            String paymentMethod  = data.get("paymentMethod").toString();
            String cardLast4      = data.getOrDefault("cardLast4", "").toString();
            String cardholderName = data.getOrDefault("cardholderName", "").toString();

            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new RuntimeException("Property not found"));

            long nights  = ChronoUnit.DAYS.between(checkIn, checkOut);
            int subtotal = (int) (property.getPrice() * nights * guests);
            int total    = subtotal + 40 + 25;
            String txnId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

            // Simulate card declined: card last 4 digits "0000"
            if ("0000".equals(cardLast4)) {
                Payment failed = new Payment();
                failed.setTransactionId(txnId);
                failed.setAmount(total);
                failed.setStatus("FAILED");
                failed.setPaymentMethod(paymentMethod);
                failed.setCardLast4(cardLast4);
                failed.setCardholderName(cardholderName);
                failed.setPropertyTitle(property.getTitle());
                failed.setPropertyLocation(property.getLocation());
                failed.setUser(user);
                paymentRepository.save(failed);
                response.put("success", false);
                response.put("error", "Card declined. Insufficient funds or card blocked.");
                return response;
            }

            // Create booking
            Booking booking = new Booking();
            booking.setCheckIn(checkIn);
            booking.setCheckOut(checkOut);
            booking.setGuests(guests);
            booking.setNights((int) nights);
            booking.setSubtotal(subtotal);
            booking.setTotalPrice(total);
            booking.setProperty(property);
            booking.setUser(user);
            booking.setStatus("CONFIRMED");
            Booking savedBooking = bookingRepository.save(booking);

            // Create payment
            Payment payment = new Payment();
            payment.setTransactionId(txnId);
            payment.setAmount(total);
            payment.setStatus("SUCCESS");
            payment.setPaymentMethod(paymentMethod);
            payment.setCardLast4(cardLast4);
            payment.setCardholderName(cardholderName);
            payment.setPropertyTitle(property.getTitle());
            payment.setPropertyLocation(property.getLocation());
            payment.setUser(user);
            payment.setBooking(savedBooking);
            Payment savedPayment = paymentRepository.save(payment);

            response.put("success", true);
            response.put("transactionId", txnId);
            response.put("amount", total);
            response.put("bookingId", savedBooking.getId());
            response.put("paymentId", savedPayment.getId());
            response.put("propertyTitle", property.getTitle());
            response.put("propertyLocation", property.getLocation());
            response.put("checkIn", checkIn.toString());
            response.put("checkOut", checkOut.toString());
            response.put("nights", nights);
            response.put("guests", guests);
            response.put("paymentMethod", paymentMethod);
            response.put("cardLast4", cardLast4);

        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }
        return response;
    }

    @PutMapping("/{transactionId}/refund")
    public Map<String, Object> refundPayment(@PathVariable String transactionId) {
        Map<String, Object> response = new HashMap<>();
        try {
            Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

            if (!"SUCCESS".equals(payment.getStatus())) {
                response.put("success", false);
                response.put("error", "Only successful payments can be refunded");
                return response;
            }

            payment.setStatus("REFUNDED");
            paymentRepository.save(payment);

            if (payment.getBooking() != null) {
                Booking booking = payment.getBooking();
                booking.setStatus("CANCELLED");
                bookingRepository.save(booking);
            }

            response.put("success", true);
            response.put("message", "Payment refunded and booking cancelled");
            response.put("transactionId", transactionId);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }
        return response;
    }

    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getUserPayments(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return List.of();

        List<Payment> payments = paymentRepository.findByUserOrderByCreatedAtDesc(user);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Payment p : payments) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("transactionId", p.getTransactionId());
            map.put("amount", p.getAmount());
            map.put("currency", p.getCurrency());
            map.put("status", p.getStatus());
            map.put("paymentMethod", p.getPaymentMethod());
            map.put("cardLast4", p.getCardLast4());
            map.put("cardholderName", p.getCardholderName());
            map.put("propertyTitle", p.getPropertyTitle());
            map.put("propertyLocation", p.getPropertyLocation());
            map.put("createdAt", p.getCreatedAt().toString());
            if (p.getBooking() != null) {
                map.put("bookingId", p.getBooking().getId());
                map.put("checkIn", p.getBooking().getCheckIn().toString());
                map.put("checkOut", p.getBooking().getCheckOut().toString());
                map.put("nights", p.getBooking().getNights());
                map.put("guests", p.getBooking().getGuests());
                map.put("bookingStatus", p.getBooking().getStatus());
            }
            result.add(map);
        }
        return result;
    }

    @GetMapping("/{transactionId}")
    public Map<String, Object> getPaymentByTransactionId(@PathVariable String transactionId) {
        Map<String, Object> response = new HashMap<>();
        Payment p = paymentRepository.findByTransactionId(transactionId).orElse(null);
        if (p == null) {
            response.put("success", false);
            response.put("error", "Transaction not found");
            return response;
        }
        response.put("success", true);
        response.put("id", p.getId());
        response.put("transactionId", p.getTransactionId());
        response.put("amount", p.getAmount());
        response.put("currency", p.getCurrency());
        response.put("status", p.getStatus());
        response.put("paymentMethod", p.getPaymentMethod());
        response.put("cardLast4", p.getCardLast4());
        response.put("cardholderName", p.getCardholderName());
        response.put("propertyTitle", p.getPropertyTitle());
        response.put("propertyLocation", p.getPropertyLocation());
        response.put("createdAt", p.getCreatedAt().toString());
        if (p.getBooking() != null) {
            response.put("bookingId", p.getBooking().getId());
            response.put("checkIn", p.getBooking().getCheckIn().toString());
            response.put("checkOut", p.getBooking().getCheckOut().toString());
            response.put("nights", p.getBooking().getNights());
            response.put("guests", p.getBooking().getGuests());
        }
        return response;
    }

    // Admin: all payments
    @GetMapping("/admin/all")
    public List<Map<String, Object>> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Payment p : payments) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("transactionId", p.getTransactionId());
            map.put("amount", p.getAmount());
            map.put("status", p.getStatus());
            map.put("paymentMethod", p.getPaymentMethod());
            map.put("cardLast4", p.getCardLast4());
            map.put("cardholderName", p.getCardholderName());
            map.put("propertyTitle", p.getPropertyTitle());
            map.put("createdAt", p.getCreatedAt().toString());
            map.put("userName", p.getUser() != null ? p.getUser().getName() : "Unknown");
            map.put("userEmail", p.getUser() != null ? p.getUser().getEmail() : "");
            result.add(map);
        }
        return result;
    }
}
