const image = ['background.png'];

const bgImage = document.createElement('img');

document.body.style.backgroundImage = `url(img/${image})`;
document.body.style.backgroundPosition = 'top';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundAttachment = 'fixed';
