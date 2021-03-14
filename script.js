const menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

const mainEl = document.querySelector('main');
const topMenuEl = document.getElementById('top-menu');

mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>SEI Rocks!</h1>"
mainEl.classList.add("flex-ctr");
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

menuLinks.forEach(function(link, idx){
  let navBar = document.createElement('a');
  navBar.setAttribute("href", `${link.href}`);
  navBar.innerText = `${link.text}`;
  topMenuEl.appendChild(navBar);
});

const subMenuEl = document.getElementById('sub-menu');

subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

const topMenuLinks = document.querySelectorAll('#top-menu a');
let showingSubMenu = false;

topMenuEl.addEventListener('click', function(el){
  el.preventDefault();
  let link = el.target;
  if (link.tagName !== 'A'){
    return;
  }
  console.log(link.textContent);
  if (link.classList.contains("active")){
    link.classList.remove("active");
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    return;
  };
  topMenuLinks.forEach(function(linkObj){
    linkObj.classList.remove("active");
  });
  link.classList.add("active");
  let menuData = menuLinks.find(function(linkObj){
    return linkObj.text === link.textContent;
  });
  if ('subLinks' in menuData){
      showingSubMenu = true;
    } else {
      showingSubMenu = false;
    }
  if (showingSubMenu === true){
    buildSubMenu(menuData.subLinks);
    subMenuEl.style.top = "100%"
  } else {
    subMenuEl.style.top = "0%";
    console.log(`<h1>${link.textContent}<h1>`);
  };
});

function buildSubMenu(subLinks) {
    subMenuEl.innerText = "";
    subLinks.forEach(function(link){
      let subMenuNavBar = document.createElement('a');
      subMenuNavBar.setAttribute("href", `${link.href}`);
      subMenuNavBar.innerText = `${link.text}`;
      subMenuEl.appendChild(subMenuNavBar);
    })
  };

subMenuEl.addEventListener('click', function(el){
  el.preventDefault();
  let link = el.target;
  if (link.tagName !== 'A'){
    return;
  }
  console.log(`${link.innerText}`);
  showingSubMenu === false;
  subMenuEl.style.top = "0";
  topMenuLinks.forEach(function(linkObj){
    linkObj.classList.remove("active");
  });
  mainEl.innerHTML = `<h1>${link.innerText}<h1>`;
})