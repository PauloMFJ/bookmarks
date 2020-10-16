import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from '@app/shared/views/overview/overview.component';
import { ResultComponent } from '@app/shared/views/result/result.component';

const routes: Routes = [
    {
        path: 'result',
        pathMatch: 'full',
        component: ResultComponent,
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
