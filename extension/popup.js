document.getElementById('dashboard').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:5000/dashboard.html' });
});
