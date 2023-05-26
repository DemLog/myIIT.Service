interface ITelegramAttachment {
  type: 'photo' | 'video' | 'document' | 'audio';
  url: string;
  width?: number;
  height?: number;
  duration?: number;
  fileName?: string;
  fileSize?: number;
  title?: string;
  performer?: string;
}