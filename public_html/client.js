function addUser(){
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  console.log(username);


  fetch('add/user',
    {method : "POST",
    headers : {'Content-Type' : "application/json"},
    body: JSON.stringify({username: username, password : password})}
  )}

function addItem(){
  const title = document.getElementById('title').value;
  const description = document.getElementById('desc').value;
  const image = document.getElementById('image').value;
  const price = document.getElementById('price').value;
  const status = document.getElementById('status').value;
  const username = document.getElementById('Username').value;

  const url = 'add/item/' + username;
  console.log(url);

  p = fetch(url, {
    method: "POST",
    headers: {"Content-Type" : 'application/json'},
    body: JSON.stringify({title: title,
      description: description,
      image: image,
      price: price,
      stat: status,
    })
  })
  p.then(() =>{
    console.log('post item requested');
  }
  )
  p.catch(()=>{
    alert('something went wrong');
  })
}