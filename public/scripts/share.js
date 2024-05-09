document.querySelectorAll('[data-href-facebook]').forEach((shareBtn) => {
  shareBtn.addEventListener('click', () => {
    const link = shareBtn.dataset.hrefFacebook;
    shareBtn.href = `https://www.facebook.com/share.php?u=${link}`;
  });
});

document.querySelectorAll('[data-href-twitter]').forEach((shareBtn) => {
  shareBtn.addEventListener('click', () => {
    const link = shareBtn.dataset.hrefTwitter;
    shareBtn.href = `http://twitter.com/share?&url=${link}`;
    // http://twitter.com/share?&url={}&text={}&hastags={}
    // the hashtags is comma separated
  });
});

document.querySelectorAll('[data-href-linkedin]').forEach((shareBtn) => {
  shareBtn.addEventListener('click', () => {
    const link = shareBtn.dataset.hrefLinkedin;
    shareBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;
  });
});

document.querySelectorAll('[data-href-copylink]').forEach((shareBtn) => {
  shareBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const link = shareBtn.dataset.hrefCopylink;
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copied to clipboard');
    } catch (error) {
      alert('Sorry bad link');
    }
  });
});