import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { FilmService } from './services/film.service';
import { PostsComponent } from './posts/posts.component';
import { DetailedFilmComponent } from './detailed-film/detailed-film.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-film.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    PostsComponent,
    DetailedFilmComponent,
    FavouritesComponent,
    ErrorComponent,
    HomeComponent,
    MovieCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [FilmService],
  bootstrap: [AppComponent],
})
export class AppModule {}
