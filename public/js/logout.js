// from 14-24 stu

const logout = async () => {
    // attempts to logout
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // if ok it sends them to the logout page
      document.location.replace('/login');
    } else {
      alert('Failed to log out');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);