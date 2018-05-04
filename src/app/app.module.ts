import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { ApplyNowComponent} from './apply-now/apply-now.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DynamicApplyNowComponent } from './dynamic-apply-now/dynamic-apply-now.component';
import {DynamicFormQuestionComponent} from './dynamic-apply-now/dynamic-form-question.component';
import {HttpClientModule} from '@angular/common/http';
import {RemoteQuestionsService} from './services/remote-questions.service';
import { QuestionControlService } from './services/question-control.service';
import {DialogService} from './services/dialog.service';
import {CanDeactivateGuard} from './services/can-deactivate-guard.service';
import { SomethingWentWrongComponent } from './something-went-wrong/something-went-wrong.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    ApplyNowComponent,
    WelcomeComponent,
    DynamicApplyNowComponent,
    DynamicFormQuestionComponent,
    SomethingWentWrongComponent,
    
  ],
  imports: [
    BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, MatDatepickerModule,MatMomentDateModule,BrowserAnimationsModule
  ],
  providers: [ RemoteQuestionsService, QuestionControlService, DialogService, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
