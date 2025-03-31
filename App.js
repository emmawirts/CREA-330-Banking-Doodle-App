// Define the initial state
let state = Object.freeze({
    account: null,
  });
  
  // Utility function to update the state
  function updateState(property, newData) {
    state = Object.freeze({
      ...state,
      [property]: newData,
    });
  
    // Persist state in localStorage
    localStorage.setItem('savedAccount', JSON.stringify(state.account));
  
    // Log the state for debugging
    console.log(state);
  }
  
  // Initialize the app
  function init() {
    const savedAccount = localStorage.getItem('savedAccount');
    if (savedAccount) {
      updateState('account', JSON.parse(savedAccount));
    }
  
    // Previous initialization code (e.g., route handling)
    window.onpopstate = () => updateRoute();
    updateRoute();
  }
  
  // Update the route to navigate between pages
  function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path];
  
    if (route) {
      const template = document.getElementById(route.templateId);
      document.body.innerHTML = template.innerHTML;
  
      if (route.init) {
        route.init();
      }
    }
  }
  
  // Create the register function
  async function register() {
    // Simulating a registration result
    const result = { user: 'testUser', name: 'Test User' };
    updateState('account', result);
    navigate('/dashboard');
  }
  
  // Create the login function
  async function login() {
    // Simulating a login result
    const data = { user: 'testUser', name: 'Test User' };
    updateState('account', data);
    navigate('/dashboard');
  }
  
  // Logout function to clear account and navigate to login page
  function logout() {
    updateState('account', null);
    navigate('/login');
  }
  
  // Update account data from the server
  async function updateAccountData() {
    const account = state.account;
    if (!account) {
      return logout();
    }
  
    const data = await getAccount(account.user); // Replace with actual API call
    if (data.error) {
      return logout();
    }
  
    updateState('account', data);
  }
  
  // Refresh the dashboard data
  async function refresh() {
    await updateAccountData();
    updateDashboard();
  }
  
  // Simulate getting account data from the server
  async function getAccount(user) {
    // Replace with real API call
    return { user: 'testUser', name: 'Test User' };
  }
  
  // Navigate function to handle routing
  function navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    updateRoute();
  }
  
  // Route definitions
  const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard', init: refresh },
  };
  
  // Initialize the app when loaded
  init();
  