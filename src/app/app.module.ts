import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FilmService } from './services/film.service';
import { PostsComponent } from './posts/posts.component';
import { DetailedFilmComponent } from './detailed-film/detailed-film.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmCardComponent } from './film-card/film-card.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-film.service';
import { HighlightDirective } from './directives/highlight.directive';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOptimizedImage } from '@angular/common';
import { FilmCardSmallComponent } from './film-card-small/film-card-small.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PostsComponent,
    DetailedFilmComponent,
    FavouritesComponent,
    ErrorComponent,
    HomeComponent,
    FilmCardComponent,
    HighlightDirective,
    AuthComponent,
    LoginComponent,
    FilmCardSmallComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    BrowserAnimationsModule,
    NgOptimizedImage,
  ],
  providers: [FilmService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
