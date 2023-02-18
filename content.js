document.querySelectorAll("div.visible-lg").forEach(e => e.remove());

document.querySelectorAll("div.offer-get-code-link>div.p1").forEach(e => e.nextSibling.remove());
setTimeout(()=>{ document.querySelectorAll("div.offer-get-code-link>div.p1").forEach(e => e.remove());},0)

const observeUrlChange = () => {
  const body = document.querySelector("div.pre-render");
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
        document.querySelectorAll("div.offer-get-code-link>div.p1").forEach(e => e.nextSibling.remove());
        setTimeout(()=>{ document.querySelectorAll("div.offer-get-code-link>div.p1").forEach(e => e.remove());},0)
    });
  });
  observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;