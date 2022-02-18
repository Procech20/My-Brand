const table = document.querySelector('tbody')

const token = localStorage.getItem('token')
const getUsers = async () => {
  const response = await fetch('https://my-brand-pro.herokuapp.com/api/users', {
    method: 'GET',
    mode: 'cors',
    headers: {
	'Access-Control-Allow-Origin': '*',
	auth: `Bearer ${token}`,
    },
  })
  const data = await response.json();
  const { users: value} = data.data;
  console.log(`Users retrieved successfully... `);

	let users = [];

	value.sort(function(a, b){
			if(a.role < b.role) { return -1; }
			if(a.role > b.role) { return 1; }
			return 0;
	})
	value.forEach(user => {

    let { firstName, surName, email, _id, role } = user;
    users += `
		<tr>
			<td>${_id}</td>
			<td>${firstName}</td>
			<td>${surName}</td>
			<td>${email}</td>
			<td>${role}</td>
		</tr> `
  });

    table.innerHTML = users
}

getUsers();
