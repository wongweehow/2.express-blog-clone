const blogpostContainer = document.getElementById('blogpost-container');

const parser = new DOMParser();

const totalPageCount = parseInt(blogpostContainer.dataset.pagecount);
let pageCounter = 2;

window.addEventListener('scroll', async () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = Math.round(window.scrollY);
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight === scrollHeight) {
    console.log(pageCounter, totalPageCount)
    if (pageCounter < totalPageCount) {
      console.log('hello world')
      try {
        const blogs = await fetch(`/page/${pageCounter}`);
        const { moreBlogs } = await blogs.json();
        moreBlogs.forEach(blog => {
          blogpostContainer.appendChild(populate(blog));
        })

        // const addPages = parser.parseFromString(morePages, 'text/html');
        // blogpostContainer.appendChild(blogpost.appendChild(addPages.body));
      } catch (error) {
        console.log(error.message);
      }
    }
    console.log('still working')
  }
});

function populate(blog) {
  
  // blogpost container
  const blogpost = document.createElement('div');
  blogpost.classList.add('blogpost');
  
  // blogpost title
  const titleText = parser.parseFromString(blog.title, 'text/html').body.firstChild.textContent;
  const title = document.createElement('h1');
  title.innerHTML = titleText;
  blogpost.appendChild(title);

  // blogpost content
  const content = parser.parseFromString(blog.sanitizedHtml, 'text/html').body;
  const n = content.children.length
  for (let i = 0; i < n; i++) {
    const paragraph = document.createElement(content.children[i].localName);
    paragraph.innerHTML = content.children[i].textContent;
    blogpost.appendChild(paragraph);
  }

  // blogpost dateCreated
  const dateCreated = parser.parseFromString(blog.dateCreated, 'text/html').body.firstChild.textContent;
  const date = document.createElement('h6');
  date.innerHTML = dateCreated;
  blogpost.appendChild(date);
  
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