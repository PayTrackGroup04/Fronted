//import { platformBrowser } from '@angular/platform-browser';
//import { AppModule } from './app/app.module';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app-routing-module';
//import { routes } from './app/app.routes';

//platformBrowser().bootstrapModule(AppModule, {
//  ngZoneEventCoalescing: true,
//})
//  .catch(err => console.error(err));

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));
