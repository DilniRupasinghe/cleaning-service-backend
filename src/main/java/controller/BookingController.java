package controller;

import model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.BookingRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Get all bookings for a specific user
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable String userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Create a new booking
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    // Update an existing booking
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable String id, @RequestBody Booking updatedBooking) {
        Optional<Booking> existingBooking = bookingRepository.findById(id);
        if (existingBooking.isPresent()) {
            updatedBooking.setId(id);
            return (Booking) bookingRepository.save(updatedBooking);
        } else {
            throw new RuntimeException("Booking not found");
        }
    }

    // Delete a booking
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable String id) {
        bookingRepository.deleteById(id);
    }
}
