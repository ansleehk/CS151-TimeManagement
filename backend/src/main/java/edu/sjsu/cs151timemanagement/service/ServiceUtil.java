package edu.sjsu.cs151timemanagement.service;

import java.util.UUID;

public class ServiceUtil {

    public static String generateUUID(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

}
