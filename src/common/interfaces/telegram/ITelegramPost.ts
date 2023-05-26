interface ITelegramPost {
  id: number;
  date: number;
  text: string;
  views?: number;
  attachments?: ITelegramAttachment[];
}