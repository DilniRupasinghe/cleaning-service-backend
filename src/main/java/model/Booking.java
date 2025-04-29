package model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Booking {
    @Id
    private String id;
    private String customerName;
    private String address;
    private LocalDateTime dateTime;
    private String serviceId;
    private String userId;

}
