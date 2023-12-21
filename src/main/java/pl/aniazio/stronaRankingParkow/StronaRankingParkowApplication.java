package pl.aniazio.stronaRankingParkow;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pl.aniazio.stronaRankingParkow.entities.Park;
import pl.aniazio.stronaRankingParkow.service.ParkService;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@SpringBootApplication
public class StronaRankingParkowApplication {

	public static void main(String[] args) {
		SpringApplication.run(StronaRankingParkowApplication.class, args);
	}


	@Bean
	public CommandLineRunner commandLineRunner(ParkService parkService) {

		return runner -> {
			addSomeData(parkService);
		};
	}

	void addSomeData(ParkService parkService) {

		String str;

		try(BufferedReader input = new BufferedReader(new FileReader("src/main/resources/park_data.txt"))) {

			while((str = input.readLine()) != null) {
				int index = str.indexOf("'");
				str = str.substring(index+1);
				index = str.indexOf("'");

				String name = str.substring(0,index);
				str = str.substring(index+1);
				if(parkService.isParkAlreadySaved(name)) continue;

				index = str.indexOf("'");
				str = str.substring(index+1);
				index = str.indexOf("'");

				String district = str.substring(0,index);
				str = str.substring(index+2);

				index = str.indexOf(" ");
				String substr = str.substring(0,index);
				str = str.substring(index+1);
				double rating = Double.parseDouble(substr);


				index = str.indexOf(" ");
				substr = str.substring(0,index);
				str = str.substring(index+1);
				double latitude = Double.parseDouble(substr);

				index = str.indexOf(" ");
				if(index == -1) index = str.length();
				substr = str.substring(0,index);
				double longitude = Double.parseDouble(substr);

				Park park = new Park();
				park.setName(name);
				park.setDistrict(district);
				park.setRating(rating);
				park.setLatitude(latitude);
				park.setLongitude(longitude);

				parkService.save(park);
			}


		} catch (IOException exc) {
			System.out.println("Input-output exception: " + exc);
		}

	}

}
