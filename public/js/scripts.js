var escopy = {
  'toggle' : 'También hablo español', 
  'home': 'Inicio',
  'about': 'Sobre mi',
  'email': 'Email',
  'dark': 'Ir al lado oscuro',
  'light': 'Ir a la luz'
};
var encopy = {
  'toggle' : 'I also speak english', 
  'home': 'Home',
  'about': 'About',
  'email': 'Email me',
  'dark': 'Go dark',
  'light': 'Bring me to light'
};
var body = document.getElementsByTagName('body')[0];
document.getElementById("year").innerHTML = new Date().getFullYear();

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.add('night');
  document.getElementById('mode').setAttribute('onClick', "togglemode(\'day\')");
  if (document.getElementById('es').style.display == 'block') {
    document.getElementById('mode').innerHTML=escopy['light'];
  } else {
    document.getElementById('mode').innerHTML=encopy['light'];
  }
}
function togglemode(which) {
  if (which == 'night') {
    body.classList.add('night');
    document.getElementById('mode').setAttribute('onClick', "togglemode(\'day\')");
    if (document.getElementById('es').style.display == 'block') {
      document.getElementById('mode').innerHTML=escopy['light'];
    } else {
      document.getElementById('mode').innerHTML=encopy['light'];
    }
  } else {
    body.classList.remove('night');
    document.getElementById('mode').setAttribute('onClick', "togglemode(\'night\')");
    if (document.getElementById('es').style.display == 'block') {
      document.getElementById('mode').innerHTML=escopy['dark'];
    } else {
      document.getElementById('mode').innerHTML=encopy['dark'];
    }
  }
}
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
function togglepan(which)
{
  if (which == 'es')
  {
    if (hasClass(document.getElementById('es'), 'article')) {
      document.getElementById('es').style.display='flex';  
    } else {
      document.getElementById('es').style.display='block';
    }
    document.getElementById('en').style.display='none';
    
    document.getElementById('toggle').innerHTML=encopy['toggle'];

    document.getElementById('homelink').innerHTML=escopy['home'];
    document.getElementById('aboutlink').innerHTML=escopy['about'];
    document.getElementById('emaillink').innerHTML=escopy['email'];

    if (body, 'night') {
      document.getElementById('mode').innerHTML=escopy['light'];
    } else {
      document.getElementById('mode').innerHTML=escopy['dark'];
    }

    document.getElementById('toggle').setAttribute('onClick', "togglepan(\'en\')");
  }
  else
  {
    if (hasClass(document.getElementById('en'), 'article')) {
      document.getElementById('en').style.display='flex';  
    } else {
      document.getElementById('en').style.display='block';
    }
    document.getElementById('es').style.display='none';

    document.getElementById('toggle').innerHTML = escopy['toggle'];

    document.getElementById('homelink').innerHTML= encopy['home'];
    document.getElementById('aboutlink').innerHTML= encopy['about'];
    document.getElementById('emaillink').innerHTML= encopy['email'];
    
    if (hasClass(body, 'night')) {
      document.getElementById('mode').innerHTML=encopy['light'];
    } else {
      document.getElementById('mode').innerHTML=encopy['dark'];
    }

    document.getElementById('toggle').setAttribute('onClick', "togglepan(\'es\')");
  }
}