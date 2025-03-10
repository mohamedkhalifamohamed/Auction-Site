<script>
  import page from 'page';

  import HomePage from './pages/HomePage.svelte';
  import WatchDetailsPage from './pages/WatchDetailsPage.svelte';
  import LoginPage from './pages/LoginPage.svelte';
  import RegistrationPage from './pages/RegistrationPage.svelte';
  import AdminPanelPage from './pages/AdminPanelPage.svelte';
  import UserProfilePage from './pages/UserProfilePage.svelte';

  let currentPage = HomePage;
  let currentParams = {};

  page('/', () => {
    currentPage = HomePage;
    currentParams = {};
  });

  page('/home', () => {
    currentPage = HomePage;
    currentParams = {};
  });

  page('/admin/dashboard', () => {
    currentPage = AdminPanelPage;
    currentParams = {};
  });

  page('/watches/:watchID', (ctx) => {
      currentPage = WatchDetailsPage;
      currentParams = {watchID: ctx.params.watchID};
  });

  page('/login', () => {
    currentPage = LoginPage;
    currentParams = {};
  });

  page('/register', () => {
    currentPage = RegistrationPage;
    currentParams = {};
  });

  page('/users/:userID/profile', (ctx) => {
    currentPage = UserProfilePage;
    currentParams = { userID: ctx.params.userID };
  });

  page.start();
</script>

<svelte:component this={currentPage} {...currentParams} />