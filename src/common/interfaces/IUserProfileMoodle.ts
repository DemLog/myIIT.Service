/**
 * Интерфейс, описывающий профиль пользователя в системе Moodle
 */
interface IUserProfileMoodle {
  /** Имя пользователя */
  firstName: string;
  /** Фамилия пользователя */
  lastName: string;
  /** Отчество пользователя */
  patronymic: string;
  /** Электронная почта пользователя */
  email: string;
  /** Страна пользователя */
  country: string;
  /** Город пользователя */
  city: string;
  /** Статус пользователя */
  status: string;
  /** Учебная группа пользователя */
  studyGroup: string;
  /** Направление обучения пользователя */
  studyDirection: string;
  /** Профиль обучения пользователя */
  profile: string;
  /** Форма обучения пользователя */
  formStudy: string;
}