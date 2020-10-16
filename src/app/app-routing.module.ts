import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkComponent } from './shared/components/bookmark/bookmark.component';
import { OverviewComponent } from './shared/components/overview/overview.component';

const routes: Routes = [
    {
        path: 'bookmark',
        pathMatch: 'full',
        component: BookmarkComponent,
    },
    // If path doesnt match bookmark page, fallback to overview
    {
        path: '**',
        component: OverviewComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
