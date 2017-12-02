package org.techforumist.maxburn.config;

import java.net.URI;
import java.net.URISyntaxException;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.apache.log4j.spi.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

public class DataSourceConfig {

    @Bean
    public DataSource postgresDataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
       // log.info("Initializing PostgreSQL database: {}", databaseUrl);

        URI dbUri;
        try {
            dbUri = new URI(databaseUrl);
        }
        catch (URISyntaxException e) {
          //  log.error(String.format("Invalid DATABASE_URL: %s", databaseUrl), e);
            return null;
        }

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' 
                       + dbUri.getPort() + dbUri.getPath();

        org.apache.tomcat.jdbc.pool.DataSource dataSource 
            = new org.apache.tomcat.jdbc.pool.DataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl(dbUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setTestOnBorrow(true);
        dataSource.setTestWhileIdle(true);
        dataSource.setTestOnReturn(true);
        dataSource.setValidationQuery("SELECT 1");
        return dataSource;
    }
}
