package com.abordo.config;

import java.time.Clock;
import java.time.ZoneId;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** Las horas de las salidas son hora de Colombia, aunque el servidor esté en otra zona. */
@Configuration
public class RelojConfig {

    @Bean
    public Clock reloj() {
        return Clock.system(ZoneId.of("America/Bogota"));
    }
}
