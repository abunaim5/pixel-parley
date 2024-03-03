// handle all post section
const discussCards = document.getElementById('discuss-cards');
const loadAllPosts = async (postCategory) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${postCategory}`);
    const data = await res.json();
    const posts = data.posts;
    discussCards.textContent = '';
    posts.forEach(post => {
        let activeStatus = '';
        if (post.isActive) {
            activeStatus = 'online';
        }
        else {
            activeStatus = 'offline';
        }
        const div = document.createElement('div');
        div.classList = `flex flex-col md:flex-row gap-4 bg-[#F3F3F5] p-6 md:p-8 rounded-3xl border`;
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
                <button class="mark-as-read-btn btn btn-circle btn-ghost">
                    <img src="images/email.png" alt="">
                </button>
            </div>
        </div>
        `;
        discussCards.appendChild(div);
        div.addEventListener('mouseenter', () => {
            div.style.backgroundColor = '#797DFC1A';
            div.style.borderColor = '#797DFC';
        });
        div.addEventListener('mouseleave', () => {
            div.style.backgroundColor = '';
            div.style.borderColor = '';
        });
        // console.log(post);

    });

    // mark as read btn click event
    const markAsReadBtn = document.querySelectorAll('.mark-as-read-btn');
    markAsReadBtn.forEach(markBtn => {
        markBtn.addEventListener('click', () => {
            const postTitle = markBtn.parentNode.parentNode.childNodes[1].childNodes[3].innerText;
            const viewCount = markBtn.parentNode.childNodes[1].childNodes[3].childNodes[3].innerText;
            handleMarkAsRead(postTitle, viewCount);
        });
    });
};

// handle search by category
const searchByCategory = () => {
    const searchInput = document.getElementById('search-input');
    const searchInputText = searchInput.value;
    loadAllPosts(searchInputText);
};

// handle mark as read section
const markAsRead = document.getElementById('mark-as-read');
const readCount = document.getElementById('read-count');
let count = 0;
const handleMarkAsRead = (postTitle, viewCount) => {
    const div = document.createElement('div');
    div.classList = `flex gap-2 justify-between items-center bg-white rounded-2xl p-4`;
    div.innerHTML = `
    <h4 class="font-semibold font-mulish">${postTitle}</h4>
    <div class="flex justify-end gap-2 items-center w-[50%]">
        <p><img src="images/eye.png" alt=""></p>
        <p class="text-gray-500">${viewCount}</p>
    </div>
    `;
    markAsRead.appendChild(div);
    count++
    readCount.innerText = count;
};

// handle latest post section
const latestPostContainer = document.getElementById('latest-post-container');
const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    latestPostContainer.textContent = ''
    data.forEach(latestPost => {
        const div = document.createElement('div');
        div.classList = `card border-2 border-gray-100`;
        div.innerHTML = `
        <div class="p-6">
            <figure class="bg-[#12132D] rounded-xl">
                <img src="${latestPost.cover_image}" alt="" class="rounded-xl" />
            </figure>
        </div>
        <div class="card-body p-6">
            <p class="flex items-center gap-2">
                <span><img src="images/date.png" alt=""></span>
                <span class="font-mulish text-gray-500">${latestPost?.author?.posted_date ?? 'No publish date'}</span>
            </p>
            <h2 class="text-lg font-mulish font-extrabold">${latestPost?.title}</h2>
            <p class="font-mulish text-gray-500">${latestPost.description}</p>
            <div class="flex gap-3 mt-3">
                <div class="avatar">
                    <div class="w-16 h-16 rounded-full">
                        <img src="${latestPost.profile_image}" />
                    </div>
                </div>
                <div>
                    <h4 class="font-bold font-mulish">${latestPost.author.name}</h4>
                    <p class="font-mulish text-gray-500">${latestPost?.author?.designation ?? 'Unknown'}</p>
                </div>
            </div>
        </div>
        `;
        latestPostContainer.appendChild(div);
        // console.log(latestPost);
    });
};
loadLatestPosts();

loadAllPosts('');
