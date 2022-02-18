const postForm = document.querySelector('.contact__form');
const enquire = document.querySelector('#enquiry');

enquire.style.cursor = 'pointer';

enquire.addEventListener('click', e => {
	    e.preventDefault()
	    let names = postForm.names.value.trim();
	    let email = postForm.email.value.trim();
	    let project = postForm.project.value.trim();
	    let message = postForm.message.value.trim();
	    const data = new FormData(postForm);

	    if (names === null || email === null || project === null) {

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
                names === null;
                email === null;
                project === null;
                message === null;
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
            } else if (data.message === 'Project already exists') {
                alert('Querry already created')
            } else {
                alert('Querry created successfully')
                window.location.reload()
                console.log('Query created successfully');
            }
            })
            .catch(err => {
            console.log(err);
            alert(err.message);
            });
 })
