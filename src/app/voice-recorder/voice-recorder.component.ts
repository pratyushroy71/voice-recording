
import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
 import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,MatProgressSpinnerModule],
})
export class VoiceRecorderComponent {
  recognition: any;
  transcript: string = '';
  isRecording: boolean = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private cd: ChangeDetectorRef) {
   
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser && 'webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();

      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.onresult = (event: any) => {
        const currentTranscript = event.results[event.resultIndex][0].transcript;
        this.transcript += currentTranscript;
        this.cd.detectChanges();
      };

      this.recognition.onend = () => {
        this.isRecording = false;
      };
    } else {
      console.error('Speech recognition not supported in this browser.');
    }
  }

  
  startRecording() {
    if (this.isBrowser && this.recognition) {
      this.transcript = ''; 
      this.isRecording = true;
      this.recognition.start();
    }
  }

 
  stopRecording() {
    if (this.isBrowser && this.recognition) {
      this.recognition.stop();
      this.isRecording = false;
    }
  }

 
  resetRecording() {
    this.transcript = '';
  }

  makePDF() {
    const doc = new jsPDF();
    doc.text(this.transcript, 10, 10);
    doc.save('transcript.pdf'); 
  }
}

