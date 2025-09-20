import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared_components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackMessage: string = '';
  currentLang: string = 'en';

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.currentLang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  submitFeedback(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to submit your feedback?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmSubmitFeedback();
      }
    });
  }

  private confirmSubmitFeedback(): void {
    this.userService.submitFeedback(this.feedbackMessage).subscribe(
      (response) => {
        alert('Feedback submitted successfully!');
        this.feedbackMessage = '';
      },
      (error) => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
}
