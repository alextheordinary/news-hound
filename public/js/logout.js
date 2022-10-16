// from 14-24 stu

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log("tried to fetch");

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};
  
  document.querySelector('#logout').addEventListener('click', logout);
  console.log("added event listener");