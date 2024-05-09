const blogpostContainer = document.getElementById('blogpost-container');

const totalPageCount = parseInt(blogpostContainer.dataset.pagecount);

let pageLoaded = 1;

window.addEventListener('scroll', async () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = Math.round(window.scrollY);
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight === scrollHeight) {
    if (pageLoaded < totalPageCount) {
      try {
        const blogs = await fetch(`/page/${pageLoaded}`);
        pageLoaded++;
        const { moreBlogs } = await blogs.json();
        moreBlogs.forEach(blog => {
          blogpostContainer.appendChild(populate(blog));
        })
      } catch (error) {
        console.log(error.message);
      }
    }
  }
});

function populate(blog) {

  // blogpost container
  const blogpost = document.createElement('div');
  blogpost.classList.add('blogpost');
  
  // blogpost title
  const title = document.createElement('h1');
  title.innerHTML = blog.title;
  blogpost.appendChild(title);

  // blogpost content
  const htmlList = blog.sanitizedHtml.split('\n');
  for (let i = 0; i < htmlList.length; i++) {
    if (htmlList[i] != '') {
      blogpost.insertAdjacentHTML('beforeend', htmlList[i])
    }
  }

  // blogpost dateCreated
  const dateCreated = blog.dateCreated;
  const date = document.createElement('h6');
  date.innerHTML = dateCreated;
  blogpost.appendChild(date);

  // share-links
  const links = document.createElement('div');
  links.classList.add('share-links');
  links.innerHTML = `
    <a target="_blank" data-href-facebook="https://www.facebook.com"><i class="fa-brands fa-square-facebook"></i></a>
    <a target="_blank" data-href-twitter="https://www.twitter.com"><i class="fa-brands fa-square-x-twitter"></i></a>
    <a target="_blank" data-href-linkedin="https://www.reddit.com"><i class="fa-brands fa-linkedin"></i></a>
    <a target="_blank" data-href-copylink="https://www.youtube.com"><i class="fa-solid fa-link"></i></a>
  `;
  blogpost.appendChild(links);
  
  return blogpost;
}

/* 

when client scrolls to the bottom of the page:
1. sends a signal to backend to fetch the 'next 2 pages of blog entries'
2. receives the blog entries and append them to the existing page

at the back end, need to send back the client an array of blog entries

as the front end receives that array, 

const morePage = [{title, date, html}, {title, date, html}]

morePage.forEach(
  someElement.appendChild(
    div
      h1 title
      whatever html
    /div
  )
)


*/