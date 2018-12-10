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
import { MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatButtonModule } from "@angular/material";
import { BlogCardComponent } from './components/blog-card/blog-card.component';


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
    BlogCardComponent
  ],
  imports: [
    RouterModule, 
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
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
        }
      ],
      {}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
