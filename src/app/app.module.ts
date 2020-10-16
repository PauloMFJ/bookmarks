import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { OverviewComponent } from './shared/views/overview/overview.component';
import { ResultComponent } from './shared/views/result/result.component';
import { BookmarkComponent } from './shared/components/bookmark/bookmark.component';
import { BookmarksComponent } from './shared/components/bookmarks/bookmarks.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { ButtonComponent } from './shared/components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    OverviewComponent,
    ResultComponent,
    BookmarkComponent,
    BookmarksComponent,
    SearchBarComponent,
    PaginationComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [ ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
