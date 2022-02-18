const tableBody = document.querySelector('tbody')
const table = document.querySelector('table')

const token = localStorage.getItem('token')
const getUsers = async () => {
  const response = await fetch('https://my-brand-pro.herokuapp.com/api/querries', {
    method: 'GET',
    headers: {
	'Access-Control-Allow-Origin': '*',
	'mode': 'no-cors',
      	auth: `Bearer ${token}`,
    },
  })
  const data = await response.json();
  const { querries: value} = data.data;
  console.log(`Querries retrieved successfully... `);

	let querries = [];

	value.sort(function(a, b){
			if(a.createdAt < b.createdAt) { return -1; }
			if(a.createdAt > b.createdAt) { return 1; }
			return 0;
	})
	value.forEach(query => {

    let { names, email, project, message } = query;
    querries += `
		<tr>
			<td>${names}</td>
			<td>${email}</td>
			<td>${project}</td>
			<td>${message}</td>
		</tr> `
  });

	if (querries.length === 0) {
		table.style.textAlign = 'center'
		  table.innerHTML = 'There are no querries yet!'
	    } else {
		    tableBody.innerHTML = querries
	    }

}

getUsers();
