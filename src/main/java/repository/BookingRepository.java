package repository;

import model.Booking;
import org.apache.catalina.Service;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository  extends MongoRepository<Service, String> {
    List<Booking> findByUserId(String userId);
}
