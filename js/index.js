const discussCards = document.getElementById('discuss-cards');
const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    posts.forEach(post => {
        let activeStatus = '';
        if (post.isActive) {
            activeStatus = 'online';
        }
        else {
            activeStatus = 'offline';
        }
        const div = document.createElement('div');
        div.classList = `flex flex-col md:flex-row gap-4 bg-[#797DFC1A] p-6 md:p-8 rounded-3xl border border-[#797DFC]`;
        div.innerHTML = `
        <div class="avatar active-status ${activeStatus} w-24 h-24">
            <div class="w-24 h-24 rounded-full">
                <img src="${post.image}" />
            </div>
        </div>
        <div class="space-y-2 divide-y-2 divide-dashed w-full">
            <div class="space-y-2 pb-3">
                <h5 class="text-sm font-medium flex gap-4"><span>#<span>${post.category}</span></span><span>Author: <span>${post.author.name}</span></span></h5>
                <h4 class="text-xl font-bold font-mulish">${post.title}</h4>
                <p class="text-gray-500">${post.description}</p>
            </div>
            <div class="flex justify-between items-center gap-4 pt-4">
                <div class="flex gap-4 md:gap-6 items-center text-gray-500">
                    <h5 class="flex gap-2 items-center">
                        <img src="images/comment.png" alt="">
                        <span>${post.comment_count}</span>
                    </h5>
                    <h5 class="flex gap-2 items-center">
                        <img src="images/eye.png" alt="">
                        <span>${post.view_count}</span>
                    </h5>
                    <h5 class="flex gap-2 items-center">
                        <img src="images/watch.png" alt="">
                        <span><span>${post.posted_time}</span> min</span>
                    </h5>
                </div>
                <button class="btn btn-circle btn-ghost">
                    <img src="images/email.png" alt="">
                </button>
            </div>
        </div>
        `;
        discussCards.appendChild(div);
        console.log(post);
    });
};

loadAllPosts()
