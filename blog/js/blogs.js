const BlogId = location.href.split(`?id=`)[1];
const blogList = document.querySelector('.blogs-list');
const blogHTML = ({ title, body, image, id, ...rest }) => `
            <div class="blog">
                <div class="blog-image">
                    <img src="${image}" />
                </div>
                <div class="blog-title">${title}</div>
                <div class="blog-body">
                    <p>${body}</p>
                    <div class="blog-footer">
                        <ul>
                            <li>3 likes</li>
                            <li>12 views</li>
                            <li>2 comments</li>
                        </ul>
                    </div>
                <div  class="view--more"><a href="/blog/blog.html?id=${id}">View</a></div>
                </div>
            </div>`

window.addEventListener("load", e => {
    const posts = JSON.parse(localStorage.getItem('posts'))
    for (let post of posts) {
        blogList.innerHTML += blogHTML(post)
    }
})


