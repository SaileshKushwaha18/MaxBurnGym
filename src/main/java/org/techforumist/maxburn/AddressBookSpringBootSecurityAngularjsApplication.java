package org.techforumist.maxburn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * @author Sailesh
 *
 */
@SpringBootApplication
public class AddressBookSpringBootSecurityAngularjsApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(AddressBookSpringBootSecurityAngularjsApplication.class, args);
	}
	
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(applicationClass);
    }

    private static Class<AddressBookSpringBootSecurityAngularjsApplication> applicationClass = AddressBookSpringBootSecurityAngularjsApplication.class;
}
