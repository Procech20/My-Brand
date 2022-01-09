const postForm = document.querySelector('[create-form]');
const createBlog = document.querySelector('#create');
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
            console.log(preview);
            return previewpic.appendChild(preview);
        });
        readImage.readAsDataURL(file);
    }
}
createBlog.addEventListener('click', e => {
    e.preventDefault();

    const title = postForm.title.value.trim();
    const description = postForm.body.value.trim();

    const key = Math.floor(Math.random() * 1000000);

    const data = new FormData(postForm);
    data.append('photo', pic.files[0]);
    if (!title) {
        titleError.innerHTML = 'Please Add a title to your blog';
        error.style.display = 'block';
    }
    else if (title.length < 10) {
        titleError.innerHTML = 'A title should be atleast 10 characters long';
        error.style.display = 'block';
    }
    else if (!description) {
        blogError.innerHTML = "Please add a description for your blog";
        blogError.style.display = 'block';
    }
    else if (description.length < 150) {
        blogError.innerHTML = 'The blog body should be composed of atleast 150 words';
        error.style.display = 'block';
    }
    let blogs = JSON.parse(localStorage.getItem('posts'));
    console.log("wazaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const blog = {
        'id': key,
        'title': title,
        'body': description,
        'image': imageFile
    }
    if (!blogs) localStorage.setItem('posts', JSON.stringify([blog]));
    else localStorage.setItem('posts', JSON.stringify([...blogs, blog]));
    location.href = './blogs.html';
    return true
});
