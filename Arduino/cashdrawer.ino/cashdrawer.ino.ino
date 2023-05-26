// Globals
#define Led 13
int dataByte;   //Global to read incomming byte

void setup() {
  // Setup COM
  Serial.begin(9600);
  delay(10);

  // Setup IO
  pinMode(Led, OUTPUT);

}

void loop() {
  // Wait for incoming serial data:
  if (Serial.available() > 0) {
    // Read the oldest byte in the serial buffer:
    dataByte = Serial.read();

    // Validate the byte
    if (dataByte == 'o') {
      digitalWrite(Led, HIGH);
      delay(5000);
      digitalWrite(Led, LOW);
    }

    if (dataByte == 'c') {
      digitalWrite(Led, HIGH);
      delay(1000);
      digitalWrite(Led, LOW);
    }
  }
}
