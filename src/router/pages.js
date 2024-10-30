import NotFound404Page from '../pages/notFound';
import SamplePage from '../pages/sample';
import VacationPage from '../pages/vacation';
import LoginPage from '../pages/login';
import MyPage from '../pages/mypage';

const notFound404Page = new NotFound404Page();
const samplePage = new SamplePage();
const vacationPage = new VacationPage();
const loginPage = new LoginPage();
const myPage = new MyPage();

export { samplePage, loginPage, notFound404Page, myPage, vacationPage };
