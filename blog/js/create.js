const postForm = document.querySelector('[create-form]');
const createBlog = document.querySelector('#create');
const cancel = document.querySelector('#cancel');
const pic = document.querySelector('#picture');
const previewpic = postForm.querySelector('.image-preview');
const error = document.querySelector('.create--error');
error.style.display = 'none';

let titleError = document.querySelector('.title--error');
let blogError = document.querySelector('.body--error');

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

createBlog.addEventListener('click', e => {
    e.preventDefault();


    const title = postForm.title.value.trim();
    const content = postForm.body.value.trim();
    const token = localStorage.getItem('token');
    const data = new FormData(postForm);


        if (title === null || content === null) {

            titleError.innerHTML = 'Please fill all the fields';
            blogError.innerHTML = 'Please fill all the fields';
            titleError.style.display = 'block';
            blogError.style.display = 'block';

        }
    fetch('https://my-brand-pro.herokuapp.com/api/blogs', {
                method: 'POST',
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
         if (!title) {
            titleError.innerHTML = 'Please Add a title to your blog';
            error.style.display = 'block';
        }
        else if (!content) {
            blogError.innerHTML = "Please add a content for your blog";
            blogError.style.display = 'block';
        }
        else if (title.length < 10) {
            titleError.innerHTML = 'A title should be atleast 10 characters long';
            error.style.display = 'block';
        } else {

                    if (data.status === 400) {
                        console.log(data.message);
                    }
                else  if (
                    data.status === 400 &&
                    data.message ===
                    'Validation error: Blog content must be atleast 250 characters!'
                ) {
                    blogError.innerHTML = "Please add contents to your blog of atleast 250 words";
                    blogError.style.display = 'block';
                } else if (data.status === 401) {
                    createBlog.innerHTML += `<p>Access denied! ${data.message}</p>`;
                } else if (data.status === 403) {
                    createBlog.innerHTML += `<p>Access denied! ${data.message}</p>`;
                    } else if (data.status === 500) {
                        alert(`Ooops! there was an error while creeating the blog. Please refresh the page`)
                    console.log(
                    'Error creating blog!...',
                    data.message,
                    );
                    } else if(data.message === 'Successfully created Blog') {
                        console.log('Blog created successfully');
                        location.href = './blogs.html';
                }
                }
            })
            .catch(err => {
            console.log(err);
            alert(err.message);
            });
});

cancel.addEventListener('click', e => {
    e.preventDefault()

    location.href = './blogs.html'
})
