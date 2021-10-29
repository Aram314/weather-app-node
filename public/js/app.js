console.log('client side js')



const form = document.querySelector('form');
const input = document.querySelector('input');
const p1 = document.getElementById('id1');
const p2 = document.getElementById('id2');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  p1.textContent = 'loading...';
  fetch(`/weather?address=${input.value}`).then(response => {
    response.json().then(data => {
      if(data.error) {
        p1.textContent = data.error;
        console.log(data.error)
      } else {
        p1.textContent = data.location;
        p2.textContent = data.forecast;
        console.log(data)
      }
    })
  })
})