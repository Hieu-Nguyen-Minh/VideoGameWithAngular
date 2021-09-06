import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

const router: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:game-search', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
