/**
SBC: M5Stick-C Plus
Connection: Wi-Fi
Protocol: MQTT

{date: status} (status = 0 | 1)の形式のJsonを受け取り、
statusの値によってLEDや画面の表示を変更するプログラム。
**/

#include "M5StickCPlus.h"
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

/** 基本設定 **/

//本番・デバッグ切り替え機能。必須ではないです。
//もともとテスト用のnurupoさんアカウントと、ごまのアカウントを切り替えるためにつけました。
//でも開発で普通に便利そうなので残しておきます
#define DEBUG 1   

#define LEDPIN 10       // M5Stack-CビルトインのLED。

#define SERVER "mqtt.beebotte.com"     // Domain name of Beebotte MQTT service

// Enter your WiFi credentials
const char* ssid = "nurupoWiFi";
const char* password = "ask_nurupo";

// to track delay since last reconnection
long lastReconnectAttempt = 0;

WiFiClient wifiClient;
PubSubClient client(wifiClient);


/** モード切り替え **/

# if DEBUG == 0

#define TOKEN "your_production_token"    // Set your channel token here
#define CHANNEL "channel_name"          // Replace with your device name
#define TOPIC "topic_name"       //ここがMQTTのトピックであることに注意

#else

#define TOKEN "your_debug_token"    // Set your channel token here
#define CHANNEL "channel_name"          // Replace with your device name
#define TOPIC "topic_name"     //ここがMQTTのトピックであることに注意 

#endif



/** セットアップ **/
void setup()
{
  /** M5StickCの設定 **/
  M5.begin();
  pinMode(LEDPIN, OUTPUT);
  M5.Lcd.setRotation(1);
  M5.Lcd.setTextSize(1.7);
  M5.Lcd.fillScreen(WHITE);
  M5.Lcd.setTextColor(BLACK);
  
  /** Wifiの設定 **/
  M5.Lcd.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    M5.Lcd.setTextColor(RED);
    M5.Lcd.println("WiFi Connection Failed, Retrying...");
    delay(1000);
  }
  M5.Lcd.setTextColor(GREEN);
  M5.Lcd.println("WiFi connected");

  /** MQTT Client Serverの設定 **/
  client.setServer(SERVER, 1883);
  client.setCallback(onMessage);

  // give the WiFi a second to initialize:
  delay(1000);
  lastReconnectAttempt = 0;
}



/** MQTTメッセージ受信時のコールバック関数 **/
void onMessage(char* topic, byte* payload, unsigned int length) {

  // Convert byte* payload to String
  String payload_str = String((char*)payload).substring(0, length);

  // Deserialize JSON
  DynamicJsonDocument jsonDoc(128);
  DeserializationError error = deserializeJson(jsonDoc, payload_str);

  if (error) {
    // If there's an error in parsing, display it on the screen
    M5.Lcd.fillScreen(RED);
    M5.Lcd.setTextColor(WHITE);
    M5.Lcd.print("JSON Parsing Error: ");
    M5.Lcd.println(error.c_str());
    return;
  }

  // Read 'status' from JSON
  const char* status = jsonDoc["data"];

  if (strcmp(status, "true") == 0) {
    M5.Lcd.fillScreen(GREEN);
    M5.Lcd.setTextColor(WHITE);
    digitalWrite(10, LOW);
  } else {
    M5.Lcd.fillScreen(BLACK);
    M5.Lcd.setTextColor(WHITE);
    digitalWrite(10, HIGH);
  }

}



/** デバイス毎に一意を期待する、IDの生成と付与。MQTTの仕様による **/
const char chars[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
char id[17];

const char * generateID()
{
  randomSeed(analogRead(0));
  int i = 0;
  for (i = 0; i < sizeof(id) - 1; i++) {
    id[i] = chars[random(sizeof(chars))];
  }
  id[sizeof(id) - 1] = '\0';

  return id;
}



/** MQTT接続用関数 **/
boolean reconnect() {
  M5.Lcd.fillScreen(WHITE);
  M5.Lcd.println("Connecting to MQTT...");
  if (client.connect(generateID(), TOKEN, "")) {
    M5.Lcd.setTextColor(GREEN);
    M5.Lcd.println("MQTT connected");
    char topic[64];
    sprintf(topic, "%s/%s", CHANNEL, TOPIC);
    client.subscribe(topic);
  } else {
    M5.Lcd.setTextColor(RED);
    M5.Lcd.print("MQTT Connection Failed, Retrying...");
    M5.Lcd.println(client.state());
  }
  return client.connected();
}



/** メインループ **/
void loop()
{
  if (!client.connected()) {
    long now = millis();
    if (now - lastReconnectAttempt > 5000) {
      lastReconnectAttempt = now;
      // Attempt to reconnect
      if (reconnect()) {
        lastReconnectAttempt = 0;
      }
    }
  } else {
    // Client connected
    delay(50);
    client.loop();
  }
}
