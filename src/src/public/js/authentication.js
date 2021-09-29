
async function loginHandler(event) {
  event.preventDefault();

  const username = event.target.querySelector('input[type="text"]').value.trim();
  const password = event.target.querySelector('input[type="password"]').value.trim();

  if (username && password) {
    try {
      const resp = await fetch('/api/user/login', { 
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
      });
      if (resp.ok) {
        document.location.replace('/')
      }
    } catch (err) {
      console.log(err);
    }
  }

}

document.querySelector('#login-form').addEventListener('submit', loginHandler);
