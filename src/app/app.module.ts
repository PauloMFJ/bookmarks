/* Angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* External */
import { AngularSvgIconModule } from 'angular-svg-icon';

/* App */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { OverviewComponent } from './shared/views/overview/overview.component';
import { ResultComponent } from './shared/views/result/result.component';
import { BookmarkComponent } from './shared/components/bookmarks/bookmark/bookmark.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { BookmarkFormComponent } from './shared/components/bookmarks/bookmark-form/bookmark-form.component';
import { PageNotFoundComponent } from './shared/views/page-not-found/page-not-found.component';
import { AddBookmarkComponent } from './shared/components/bookmarks/add-bookmark/add-bookmark.component';
import { SortByComponent } from './shared/components/sort-by/sort-by.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularSvgIconModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LogoComponent,
    OverviewComponent,
    ResultComponent,
    BookmarkComponent,
    SearchBarComponent,
    PaginatorComponent,
    ButtonComponent,
    BookmarkFormComponent,
    PageNotFoundComponent,
    AddBookmarkComponent,
    SortByComponent,
  ],
  providers: [ ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
