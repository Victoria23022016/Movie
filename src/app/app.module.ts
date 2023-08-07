import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { DataService } from './data/data.service';
import { PostsComponent } from './posts/posts.component';
import { DetailedFilmComponent } from './detailed-film/detailed-film.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { RecommendatedComponent } from './recommendated/recommendated.component';

@NgModule({
  declarations: [AppComponent, SearchFormComponent, PostsComponent, DetailedFilmComponent, FavouritesComponent, ErrorComponent, HomeComponent, RecommendatedComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
