import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private messages = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messages.asObservable();

  private isOpen = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpen.asObservable();

  // Predefined responses based on keywords
  private responses: { [key: string]: string[] } = {
    hello: [
      'Hi there! How can I help you find restaurants today?',
      'Hello! Looking for a place to eat?',
    ],
    restaurant: [
      'We have many restaurants listed on our platform. Would you like to search by cuisine or location?',
    ],
    menu: [
      'You can view restaurant menus by clicking on a restaurant and navigating to their details page.',
    ],
    booking: [
      'You can make reservations directly through our app on the restaurant details page.',
    ],
    help: [
      'I can help you find restaurants, check menus, or learn how to use our platform. What do you need?',
    ],
    about: [
      'We are a platform dedicated to helping you discover great restaurants in your area.',
    ],
    login: [
      'You can log in using the button in the top right corner of the screen.',
    ],
    register: [
      'New here? You can create an account by clicking on the "Register" button.',
    ],
    cuisine: [
      'What type of cuisine are you in the mood for today?',
      'We have restaurants offering Italian, Chinese, Mexican, Indian, and many more cuisines. Any preference?',
    ],
    italian: [
      'Italian is a popular choice! We have several Italian restaurants with great pasta and pizza options.',
    ],
    chinese: [
      'In the mood for Chinese? We have authentic Chinese restaurants ranging from dim sum to Szechuan cuisine.',
    ],
    mexican: [
      'Our Mexican restaurants offer everything from street tacos to upscale dining experiences.',
    ],
    vegetarian: [
      'Looking for vegetarian options? Many of our restaurants offer dedicated vegetarian menus.',
    ],
    vegan: [
      'We have several restaurants with excellent vegan options. Would you like me to suggest some?',
    ],
    'gluten-free': [
      'Need gluten-free options? I can help you find restaurants with gluten-free menus.',
    ],
    new: [
      'Have you tried any of our newly added restaurants? We have 5 new spots added just this week!',
    ],
    reviews: [
      'Our restaurant listings include user reviews and ratings to help you decide.',
    ],
    hours: [
      'Restaurant opening hours are listed on their detail pages. Any specific place you want to know about?',
    ],
    'thank you': [
      "You're welcome! Is there anything else I can help you with?",
      'Happy to help! Enjoy your meal!',
    ],
    lunch: [
      'For lunch, you might enjoy our quick-service restaurants or lunch special deals at select locations.',
    ],
    dinner: [
      'Planning dinner? We have everything from casual dining to fine dining experiences available.',
    ],
    group: [
      'Need a place for a group? Several restaurants offer group bookings and private dining spaces.',
    ],
    family: [
      "Many restaurants on our platform are family-friendly with kids' menus available.",
    ],
    outdoor: [
      'Looking for outdoor seating? Many restaurants offer patios or rooftop dining options.',
    ],
    ratings: [
      'Our restaurant ratings are based on verified user reviews from people who havve dined there.',
    ],
  };

  // Default fallback responses
  private fallbackResponses: string[] = [
    "I'm not sure I understand. Could you rephrase that?",
    "Sorry, I didn't catch that. Are you looking for restaurants?",
    'I can help with finding restaurants, viewing menus, or making reservations. What would you like to do?',
    "I'd love to help you find the perfect restaurant. Could you give me more details about what you're looking for?",
    "I'm here to help with restaurant-related questions. Can you tell me more about what you need?",
    "I might have missed what you're looking for. Are you interested in finding a restaurantor checking menus?",
    "Let's try another approach. Are you looking for a specific type of cuisine or restaurant?",
    'I want to make sure I help you correctly. Could you phrase your question about restaurants differently?',
  ];

  constructor() {}

  toggleChat(): void {
    this.isOpen.next(!this.isOpen.value);

    // If opening the chat and no messages, send welcome message
    if (this.isOpen.value && this.messages.value.length === 0) {
      this.addBotMessage(
        'Hello! I am your restaurant assistant. How can I help you today?'
      );
    }
  }

  sendMessage(text: string): void {
    // Add user message
    this.addUserMessage(text);

    // Process and respond
    setTimeout(() => {
      this.respondToMessage(text);
    }, 500); // Small delay to simulate "thinking"
  }

  private addUserMessage(text: string): void {
    const currentMessages = this.messages.value;
    const newMessage: ChatMessage = {
      text,
      isBot: false,
      timestamp: new Date(),
    };
    this.messages.next([...currentMessages, newMessage]);
  }

  private addBotMessage(text: string): void {
    const currentMessages = this.messages.value;
    const newMessage: ChatMessage = {
      text,
      isBot: true,
      timestamp: new Date(),
    };
    this.messages.next([...currentMessages, newMessage]);
  }

  private respondToMessage(text: string): void {
    const lowerText = text.toLowerCase();

    // Check for keyword matches
    for (const keyword in this.responses) {
      if (lowerText.includes(keyword)) {
        const responses = this.responses[keyword];
        const randomIndex = Math.floor(Math.random() * responses.length);
        this.addBotMessage(responses[randomIndex]);
        return;
      }
    }

    // Use fallback if no keywords match
    const randomIndex = Math.floor(
      Math.random() * this.fallbackResponses.length
    );
    this.addBotMessage(this.fallbackResponses[randomIndex]);
  }

  clearChat(): void {
    this.messages.next([]);
  }
}