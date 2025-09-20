import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollBottom')
  private scrollContainer!: ElementRef;

  messages$: Observable<ChatMessage[]>;
  isOpen$: Observable<boolean>;
  messageText: string = '';

  constructor(private chatbotService: ChatbotService) {
    this.messages$ = this.chatbotService.messages$;
    this.isOpen$ = this.chatbotService.isOpen$;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {}
  }

  toggleChat(): void {
    this.chatbotService.toggleChat();
  }

  sendMessage(): void {
    if (this.messageText.trim() !== '') {
      this.chatbotService.sendMessage(this.messageText);
      this.messageText = '';
    }
  }
}
