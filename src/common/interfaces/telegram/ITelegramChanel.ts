import { ITelegramChatPhoto } from "./ITelegramChatPhoto";

export interface ITelegramChannel {
  id: number; // Идентификатор канала
  title: string; // Заголовок канала
  username?: string; // Имя пользователя канала (если есть)
  description?: string; // Описание канала
  inviteLink?: string; // Пригласительная ссылка на канал (если есть)
  photo?: ITelegramChatPhoto; // Фото канала
}