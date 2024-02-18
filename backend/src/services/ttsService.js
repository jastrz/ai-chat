import speaker from "speakertts";

class TTSService {
  constructor() {
    this.voices = [];
    this.init();
  }

  init() {
    speaker.getInstalledVoices((error, voices) => {
      if (error) {
        console.error("Error:", error);
      } else {
        this.voices = voices;
        console.log("Installed voices:", voices);
      }
    });
  }

  synthesize(text) {
    speaker.speak(text, "Microsoft Zira Desktop", 1, "ASCII", (error) => {
      if (error) {
        console.error("Error speaking!", error);
      }
    });
  }
}

const ttsService = new TTSService();

export { ttsService };
