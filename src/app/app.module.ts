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
import { ShadowingDirective } from './directives/shadowing.directive';

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
    ShadowingDirective,
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
