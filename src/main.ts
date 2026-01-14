import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // ESTA LÍNEA ES VITAL PARA EL CONSUMO DE API [cite: 16]
  ]
}).catch(err => console.error(err));