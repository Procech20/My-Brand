const singleBlog = document.querySelector('.blog--container');
const id = window.location.search.split("&").find(e => e.includes("id=")).split("=")[1]
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
const posts = JSON.parse(localStorage.getItem("posts"))
const post = posts.find(p => p.id === parseInt(id))
window.addEventListener("load", e => {
        singleBlog.innerHTML = `
<div class="blog--intro">
            <div class="author--section">
                <h1>${post?.title}</h1>
                <div class="author--info">
                    <img src="${loggedInUser?.picture || "../assets/img/about.jpg"} alt = '' class='author--img'">
                    <div>
                        <h2>${loggedInUser?.firstName} ${loggedInUser?.surName}</h2>
                        <h3>May . 01 . 2021</h3>
                    </div>
                </div>

                <img src='${post?.image}' alt="" class="blog--image">
            </div>
        </div>
        <div class=" main--section ">
            <p>${post?.body}</p>
            <div class="reactions ">
                <span><img src="./assets/img/Thumb-up.svg " alt=" "> Likes</span>
                <span><img src="./assets/img/playbutton.svg " alt=" "> views</span>
                <span><img src="./assets/img/comments-svgrepo-com.svg " alt=" ">Comments</span>
            </div>
	</div>
        `
})
