fetch ('https://pokeapi.co/api/v2/pokemon/1/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
 
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));

fetch ('https://pokeapi.co/api/v2/pokemon/4/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
 
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));

fetch ('https://pokeapi.co/api/v2/pokemon/7/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));

fetch ('https://pokeapi.co/api/v2/pokemon/25/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));

fetch ('https://pokeapi.co/api/v2/move/1/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
 
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));



