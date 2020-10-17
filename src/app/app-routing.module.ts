import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from '@app/shared/views/overview/overview.component';
import { ResultComponent } from '@app/shared/views/result/result.component';
import { PageNotFoundComponent } from '@app/shared/views/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
    },
    {
        path: 'overview',
        pathMatch: 'full',
        component: OverviewComponent,
    },
    {
        path: 'result/:id',
        pathMatch: 'full',
        component: ResultComponent,
    },
    // If path doesnt match previous, fallback to page not found
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
