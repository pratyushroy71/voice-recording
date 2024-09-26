import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoiceRecorderComponent } from './voice-recorder/voice-recorder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VoiceRecorderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'voiceToTextApp';
}
