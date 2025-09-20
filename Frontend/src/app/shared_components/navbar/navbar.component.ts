import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnChanges{
  @Input() currentLang!: string;
  @Output() langChange = new EventEmitter<void>();

  isAuthenticated: boolean = false;
  userData:any;

  constructor(private authService: AuthService,
     public router: Router,
     private translate: TranslateService,
     private dialog: MatDialog) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
      this.userData = this.authService.getUser();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentLang'] && changes['currentLang'].currentValue) {
      this.translate.use(this.currentLang);
    }
  }

  logout() {
    this.translate.get('CONFIRM_LOGOUT_MESSAGE').subscribe((translatedMessage) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: { message: translatedMessage }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.confirmLogout();
        }
      });
    });
  }

  confirmLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  toggleLanguage() {
    this.langChange.emit();
  }
}

