import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { RecoverPageComponent } from './components/recover-page/recover-page.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { BlogFormPageComponent } from './components/blog-form-page/blog-form-page.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { RouterModule } from "@angular/router";
import { MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatDividerModule, MatListModule, MatSnackBarModule } from "@angular/material";
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AccessTokenInterceptor } from './interceptors/AccessTokenInterceptor';
import { BlogService } from './services/blog/blog.service';
import { UserService } from './services/user/user.service';
import { MarkdownModule } from "ngx-markdown";
import { CommentService } from './services/comment/comment.service';
import { ResetPageComponent } from './components/reset-page/reset-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RecoverPageComponent,
    FrontPageComponent,
    BlogFormPageComponent,
    BlogPageComponent,
    BlogCardComponent,
    CommentCardComponent,
    CommentFormComponent,
    ResetPageComponent
  ],
  imports: [
    MarkdownModule.forRoot({ loader: HttpClient}),
    HttpClientModule,
    RouterModule, 
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path : '',
          component: FrontPageComponent
        },
        {
          path : 'login',
          component: LoginPageComponent
        },
        {
          path : 'register',
          component: RegisterPageComponent,
        },
        {
          path : "reset-password",
          component: ResetPageComponent,
        },
        {
          path : "recover",
          component: RecoverPageComponent,
        },
        {
          path : 'blog/create',
          component : BlogFormPageComponent
        },
        {
          path : 'blog/:id',
          component : BlogPageComponent,
        },
        {
          path : "***",
          component: FrontPageComponent
        }
      ],
      {}
    )
  ],
  providers: [
    AuthService,
    UserService,
    CommentService,
    BlogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
