const postForm = document.querySelector('.contact__form');
const enquire = document.querySelector('#enquiry');

enquire.style.cursor = 'pointer';

enquire.addEventListener('click', e => {
	    e.preventDefault()
	    let client = postForm.name.value.trim();
	    let em = postForm.email.value.trim();
	    let proj = postForm.project.value.trim();
	    let mess = postForm.message.value.trim();
	    const data = new FormData(postForm);

	    if (client === null || em === null || proj === null) {

		alert('Please fill all the fields');
		titleError.style.display = 'block';
		blogError.style.display = 'block';

	    }

	fetch('https://my-brand-pro.herokuapp.com/api/querries', {
                method: 'POST',
                headers: {
                'Access-Control-Allow-Origin': '*',
                },
                body: data,
            })
            .then(res => {
                client === null;
                em === null;
                proj === null;
                mess === null;
                return res.json();
            })

        .then(data => {
                console.log(data.message);

		if (data.status === 500 && data.message === 'Unable to create querry; Querry validation failed: names: Name can not be empty, email: Please add an email address, project: Please mention the project') {
			alert(`Ooops! there was an error while sending the message. Please refresh the page`)
			console.log(
				'Error creating query!...',
				data.message,
			);
		}
		else if (data.status === 500) {
                        alert(`Ooops! there was an error while sending the message. Please refresh the page`)
                    console.log(
                    'Error creating query!...',
                    data.message,
                    );
                    } else if(data.message === 'Successfully created query') {
                        console.log('Query created successfully');
                        location.reload()
                }
            })
            .catch(err => {
            console.log(err);
            alert(err.message);
            });
 })
