// Плавный скролл при клике на ссылки в шапке
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);


    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Подсветка активной ссылки при прокрутке страницы
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;


  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
    } else {
      document.querySelector(`a[href="#${sectionId}"]`).classList.remove('active');
    }
  });
});
