const BlogId = location.href.split(`?id=`)[1];
const postForm = document.querySelector('[create-form]');
const updateBlog = document.querySelector('#update')
const cancel = document.querySelector('#cancel');
const pic = document.querySelector('#picture');
const blogPic = document.querySelector('.blog-image');
const previewpic = postForm.querySelector('.image-preview');
const error = document.querySelector('.create--error');

let titleError = document.querySelector('.title--error');
let blogError = document.querySelector('.body--error');


const token = localStorage.getItem('token');

error.style.display = 'none';

pic.addEventListener('change', showPicture);
	let imageFile;

	function showPicture(e) {
		previewpic.innerHTML = '';
		file = e.target.files[0];
		if (file) {
			const readImage = new FileReader();
			readImage.addEventListener('load', () => {
				imageFile = readImage.result
				const preview = document.createElement('img');
				preview.setAttribute('src', imageFile);
				return previewpic.appendChild(preview);
			});
			readImage.readAsDataURL(file);
		}
	}

updateBlog.addEventListener('click', e => {
	e.preventDefault();


	const title = postForm.title.value.trim();
    	const content = postForm.content.value.trim();
	const data = new FormData(postForm);
	data.append('image', pic.files[0]);

	if (title === null || content === null) {

		titleError.innerHTML = 'Please fill all the fields';
		blogError.innerHTML = 'Please fill all the fields';
		titleError.style.display = 'block';
		blogError.style.display = 'block';
	}

		fetch(`https://my-brand-pro.herokuapp.com/api/blogs/${BlogId}`, {
			method: 'PATCH',
			headers: {
				'Access-Control-Allow-Origin': '*',
				auth: `Bearer ${token}`,
			},
			body: data,
		})
			.then(res => {
				title === null;
				content === null;
				return res.json();
			})

			.then(data => {
				console.log(data);
				if (title.length < 10) {
				titleError.innerHTML = 'A title should be atleast 10 characters long';
					titleError.style.display = 'block';
				} else if (content.length < 250) {
					console.log('Error here ......');
					blogError.innerHTML = "Please add contents to your blog of atleast 250 words";
					blogError.style.display = 'block';
				} else if (data.status === 401) {
					createBlog.innerHTML += `<p>Access denied! ${data.message}</p>`;
				} else if (data.status === 403) {
					createBlog.innerHTML += `<p>Access denied! ${data.message}</p>`;
				} else if (data.status === 500) {
					alert(`Ooops! there was an error while updating the blog. Please refresh the page`)
					console.log('Error creating blog!...', data.message,);
				} else if (data.message === 'Successfully created Blog') {
					console.log('Blog created successfully');
					location.href = './blogs.html';
				}
			})

			.catch(err => {
				console.log(err);
				alert(err.message);
			});
});


const populateBlog = async () => {

	fetch(`https://my-brand-pro.herokuapp.com/api/blogs/${BlogId}`, {
	method: 'GET',
	headers: {
	'Access-Control-Allow-Origin': '*',
	auth: `Bearer ${token}`,
	},
	}).then(res => {
		return res.json();
		})
		.then(blog => {
			const { title, imageUrl, content } = blog.data

			postForm.title.value = title;
			postForm.content.value = content;
			blogPic.setAttribute('src', imageUrl);

		});
}

populateBlog();

cancel.addEventListener('click', e => {
    e.preventDefault()

    location.href = `./blog.html?id=${BlogId}`
})
