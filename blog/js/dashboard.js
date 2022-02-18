const BlogId = location.href.split(`?id=`)[1];
const blogList = document.querySelector('.dashboard--body');

const getBlogs = async () => {
  const response = await fetch('https://my-brand-pro.herokuapp.com/api/blogs',)
  const data = await response.json();
  const { blogs: value} = data.data;
  console.log(`Data retrieved successfully... `);

  let posts = [];

  value.forEach(post => {

    let { title, content, imageUrl, _id, ...rest } = post;
    content = post?.content.slice(0, 120) + "....";

    posts += ` <div class="article--container">
                <div class="article--img">
                    <img src=${imageUrl} />
                </div>
                <div class="article-title">${title}</div>
                <div class="article-body">
                    <p>
                        ${content}
			</p>
                    <div class="reactions article--reactions">
                        <span><img src="../assets/img/Thumb-up.svg " alt=" ">1 Likes</span>
                        <span><img src="../assets/img/comments-svgrepo-com.svg " alt=" ">2 Comments</span>
                    </div>
                </div>
                <div class="actions">
                    <i class="fa-thin fa-trash-can"></i>
                    <i class="fa-thin fa-pen-to-square"></i>
                </div>
            </div>`
  });

  blogList.innerHTML = posts;
}

getBlogs()
