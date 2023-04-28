import axios from 'axios';
import cheerio from 'cheerio';

export default class MoodleService {
  private readonly email: string;
  private readonly password: string;
  private session = axios.create({
    withCredentials: true,
  });

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  private static async getLoginToken(session: any): Promise<string> {
    const response = await session.get(
      'https://eu.iit.csu.ru/login/index.php/',
    );
    const $ = cheerio.load(response.data);
    return $("input[name='logintoken']").attr('value') || '';
  }

  private static async getUser(
    session: any,
    username: string,
    password: string,
    logintoken: string,
    ancho = '',
  ): Promise<any> {
    const data_auth = {
      ancho,
      logintoken,
      username,
      password,
    };
    const response = await session.post(
      'https://eu.iit.csu.ru/login/index.php/',
      data_auth,
    );
    return response;
  }

  private static async getUserData(
    userSession: any,
  ): Promise<IUserProfileMoodle> {
    const params: IUserProfileMoodle = {
      firstName: null,
      lastName: null,
      patronymic: 'Отчество',
      email: 'Адрес электронной почты',
      country: 'Страна',
      city: 'Город',
      status: 'Статус',
      studyGroup: 'Учебная группа',
      studyDirection: 'Направление обучения',
      profile: 'Профиль',
      formStudy: 'Форма обучения',
    };

    const user = await userSession.get(
      'https://eu.iit.csu.ru/user/profile.php',
    );
    const $ = cheerio.load(user.data);

    // Взятие имени и фамилии
    const full_name = $('div.page-header-headings h1').contents();
    [params.lastName, params.firstName] = full_name.eq(0).text().split(' ');

    const detailed_info = $('div.profile_tree section ul dd');
    const detailed_info_header = $('div.profile_tree section ul dt');
    for (const [key, value] of Object.entries(params)) {
      detailed_info_header.each((i, elem) => {
        if ($(elem).contents().eq(0).text() == value) {
          if (key === 'email') {
            params[key] = detailed_info.eq(i).find('a').text();
          } else {
            params[key] = detailed_info.eq(i).text();
          }
        }
      });
    }

    return params;
  }

  private static async logoutUser(userSession: any): Promise<any> {
    const response = await userSession.get(
      'https://eu.iit.csu.ru/login/index.php/',
    );
    const $ = cheerio.load(response.data);
    const logoutUrl = $("a[data-title='logout,moodle']").attr('href') || '';
    return userSession.get(logoutUrl);
  }

  public async checkAccount(): Promise<IUserProfileMoodle> {
    const logintoken = await MoodleService.getLoginToken(this.session);
    const user = await MoodleService.getUser(
      this.session,
      this.email,
      this.password,
      logintoken,
    );
    const $ = cheerio.load(user.data); // Проверка, авторизован ли пользователь
    if ($("a[data-title='logout,moodle']").length === 0) {
      throw new Error('Ошибка авторизации: неправильный email или пароль');
    }

    const userData = await MoodleService.getUserData(this.session);
    await MoodleService.logoutUser(this.session);

    return userData;
  }
}
