#include "M5StickCPlus.h"
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "nurupoWiFi";
const char* password = "1234567890";
const char* mqtt_server = "public.cloud.shiftr.io";
const char* mqtt_user = "public";
const char* mqtt_password = "public";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  
  /** M5StickCの設定 **/
  M5.begin();
  pinMode(10, OUTPUT);
  M5.Lcd.setRotation(1);
  M5.Lcd.setTextSize(1);
  M5.Lcd.setTextColor(WHITE);
  M5.Lcd.println("Connecting to WiFi...");
  
  /** Wifiの設定 **/
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    M5.Lcd.setTextColor(RED);
    M5.Lcd.println("WiFi Connection Failed, Retrying...");
    delay(1000);
  }
  M5.Lcd.setTextColor(GREEN);
  M5.Lcd.println("WiFi connected");

  /** MQTT Client Serverの設定 **/
  client.setServer(mqtt_server, 1883);
  // 受信時のアクションを登録
  client.setCallback(callback);
  while (!client.connected()) {
    M5.Lcd.setTextColor(WHITE);
    M5.Lcd.println("Connecting to MQTT...");
    if (client.connect("M5StickC", mqtt_user, mqtt_password)) {
      M5.Lcd.setTextColor(GREEN);
      M5.Lcd.println("MQTT connected");
      client.subscribe("nurupo/led", 1);
    } else {
      M5.Lcd.setTextColor(RED);
      M5.Lcd.print("MQTT Connection Failed, Retrying...");
      M5.Lcd.println(client.state());
      delay(2000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  M5.Lcd.setTextColor(GREEN);
  M5.Lcd.println("Message Arrived");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  if (payload[0] == '1') {
    M5.Lcd.println("LED on");
    digitalWrite(10, LOW);
  } else {
    M5.Lcd.println("LED off");
    digitalWrite(10, HIGH);
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

void reconnect() {
  while (!client.connected()) {
    M5.Lcd.setTextColor(WHITE);
    M5.Lcd.println("Reconnecting to MQTT...");
    if (client.connect("M5StickC", mqtt_user, mqtt_password)) {
      M5.Lcd.setTextColor(GREEN);
      M5.Lcd.println("MQTT connected");
      client.subscribe("nurupo/led", 1);
    } else {
      M5.Lcd.setTextColor(RED);
      M5.Lcd.print("MQTT Connection Failed, Retrying...");
      M5.Lcd.println(client.state());
      delay(2000);
    }
  }
}
