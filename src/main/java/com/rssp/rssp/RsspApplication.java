package com.rssp.rssp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
@MapperScan(value = "com.rssp.rssp.mapper")
public class RsspApplication {

	public static void main(String[] args) {
		SpringApplication.run(RsspApplication.class, args);
	}

}
