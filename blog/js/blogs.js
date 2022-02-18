const BlogId = location.href.split(`?id=`)[1];
const blogList = document.querySelector('.blogs-list');


const getBlogs = async () => {
  const response = await fetch('https://my-brand-pro.herokuapp.com/api/blogs',)
  const data = await response.json();
  const { blogs: value} = data.data;
  console.log(`Data retrieved successfully... `);

  let posts = [];

  value.forEach(post => {

    let { title, content, imageUrl, _id, ...rest } = post;
    content = post?.content.slice(0, 120) + "....";

    posts += `

    <div class="blog">
                <div class="blog-image">
                    <img src="${imageUrl}" />
                </div>
                <div class="blog-title">${title}</div>
                <div class="blog-body">
                    <p>${content}</p>
                    <div class="blog-footer">
                        <span><img src="./assets/img/Thumb-up.svg " alt=" "> 1 Likes</span>
                        <span><img src="./assets/img/comments-svgrepo-com.svg " alt=" "> 2 Comments</span>
                    </div>
                <div  class="view--more"><a href="/blog/blog.html?id=${_id}">View</a></div>
                </div>
            </div>
    `
  });

  blogList.innerHTML = posts;
}

getBlogs()
