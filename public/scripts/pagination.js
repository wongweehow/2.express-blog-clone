const blogpostContainer = document.getElementById('blogpost-container');

const parser = new DOMParser();

const totalPageCount = parseInt(blogpostContainer.dataset.pagecount);
let pageCounter = 2;

window.addEventListener('scroll', async () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = Math.round(window.scrollY);
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight === scrollHeight) {
    if (pageCounter < totalPageCount) {
      try {
        const blogs = await fetch(`/page/${pageCounter}`);
        const { moreBlogs } = await blogs.json();
        moreBlogs.forEach(blog => {
          // console.log(blog)
          blogpostContainer.appendChild(populate(blog));
        })

        // const addPages = parser.parseFromString(morePages, 'text/html');
        // blogpostContainer.appendChild(blogpost.appendChild(addPages.body));
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
  for (let i = 0; i < htmlList.length - 1; i++) {
    blogpost.insertAdjacentHTML('beforeend', htmlList[i])
  }

  // blogpost dateCreated
  const dateCreated = blog.dateCreated;
  const date = document.createElement('h6');
  date.innerHTML = dateCreated;
  blogpost.appendChild(date);

  // share-links
  const links = document.createElement('div');
  links.classList.add('share-lin');
  links.innerHTML = `
    <a href="#"><i class="fa-brands fa-square-facebook"></i></a>
    <a href="#"><i class="fa-brands fa-square-x-twitter"></i></a>
    <a href="#"><i class="fa-brands fa-linkedin"></i></a>
    <a href="#"><i class="fa-solid fa-link"></i></a>
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