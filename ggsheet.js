const scriptURL = 'https://script.google.com/macros/s/AKfycbwYDtonpBn44Ja6Xf-ysNlm9-0cW4hEptli9C4f4NDJX1-P13DXunZ4VSQTnhqMhBwxwQ/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})