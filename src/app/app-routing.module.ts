import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PostsComponent } from './posts/posts.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { DetailedFilmComponent } from './detailed-film/detailed-film.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'detailed/:id', component: DetailedFilmComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
