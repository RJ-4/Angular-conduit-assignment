import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NavigationBarComponent } from './home-page/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './home-page/header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GlobalFeedComponent } from './home-page/global-feed/global-feed.component';
import { HttpModule } from '@angular/http';
import { GlobalFeedService } from './home-page/global-feed/global-feed.service';
import { FooterComponent } from './home-page/footer/footer.component';
import { SelectedUserComponent } from './selected-user/selected-user.component';
import { SelectedFeedComponent } from './selected-feed/selected-feed.component';
import { SelectedFeedHeaderComponent } from './selected-feed/selected-feed-header/selected-feed-header.component';
import { SelectedFeedBodyComponent } from './selected-feed/selected-feed-body/selected-feed-body.component';
import { SignUpService } from './sign-up/sign-up.service';
import { SignInService } from './sign-in/sign-in.service';
import { YourFeedComponent } from './home-page/your-feed/your-feed.component';
import { SignedInNavigationBarComponent } from './navigation-bar/signed-in-navigation-bar/signed-in-navigation-bar.component';
import { NavigationBarForSignedInUserComponent } from './navigation-bar-for-signed-in-user/navigation-bar-for-signed-in-user.component';
import { AuthService } from './sign-in/auth.service';
import { SettingsComponent } from './settings/settings.component';
import { UpdateUserService } from './settings/update-user.service';
import { GetSelectedUserService } from './selected-user/get-selected-user.service';
import { SelectedUserHeaderComponent } from './selected-user/selected-user-header/selected-user-header.component';
import { SelectedUserAllFeedsComponent } from './selected-user/selected-user-all-feeds/selected-user-all-feeds.component';
import { SelectedUserFavoriteArticlesComponent } from './selected-user/selected-user-favorite-articles/selected-user-favorite-articles.component';
import { GetFeedsService } from './home-page/your-feed/get-feeds.service';
import { LikeUnlikeArticleService } from './like-unlike-article.service';
import { NewArticleComponent } from './new-article/new-article.component';
import { CreateArticleService } from './new-article/create-article.service';
import { CommonModule } from '@angular/common';
import { GetArticleService } from './new-article/get-article.service';
import { UpdateArticleService } from './new-article/update-article.service';
import { DeleteArticleService } from './new-article/delete-article.service';
import { AddCommentComponent } from './selected-feed/comments/add-comment/add-comment.component';
import { DisplayCommentsComponent } from './selected-feed/comments/display-comments/display-comments.component';
import { DisplayCommentsService } from './selected-feed/comments/display-comments/display-comments.service';
import { AddCommentService } from './selected-feed/comments/add-comment/add-comment.service';
import { DeleteCommentService } from './selected-feed/comments/delete-comment/delete-comment.service';
import { FollowUserService } from './selected-user/follow-user.service';
import { UnfollowUserService } from './selected-user/unfollow-user.service';

const appRoutes: Routes=[
  {path: '', component: HomePageComponent},
  {path: 'login', component: SignInComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'article/:slug', component: SelectedFeedComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'editor', component: NewArticleComponent},
  {path: 'editor/:slug', component: NewArticleComponent},
  {path: ':username', component: SelectedUserComponent, children: [
    {path: 'favorites', component: SelectedUserFavoriteArticlesComponent}
  ]}
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignInComponent,
    NavigationBarComponent,
    HeaderComponent,
    SignUpComponent,
    GlobalFeedComponent,
    FooterComponent,
    SelectedUserComponent,
    SelectedFeedComponent,
    SelectedFeedHeaderComponent,
    SelectedFeedBodyComponent,
    YourFeedComponent,
    SignedInNavigationBarComponent,
    NavigationBarForSignedInUserComponent,
    SettingsComponent,
    SelectedUserHeaderComponent,
    SelectedUserAllFeedsComponent,
    SelectedUserFavoriteArticlesComponent,
    NewArticleComponent,
    AddCommentComponent,
    DisplayCommentsComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [GlobalFeedService, SignUpService, SignInService, AuthService, UpdateUserService, GetSelectedUserService, GetFeedsService, LikeUnlikeArticleService, CreateArticleService, GetArticleService, UpdateArticleService, DeleteArticleService, DisplayCommentsService, AddCommentService, DeleteCommentService, FollowUserService, UnfollowUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
