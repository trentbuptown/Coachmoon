// ---------------- VIDEO MODAL ----------------
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalIframe');
    iframe.src = videoUrl;
    modal.classList.remove('hidden');
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalIframe');
    iframe.src = '';
    modal.classList.add('hidden');
}


// -------- CAROUSEL 6 BƯỚC (Step Images) --------
const sliderSteps = document.getElementById('sliderSteps');
const prevBtnSteps = document.getElementById('prevBtnSteps');
const nextBtnSteps = document.getElementById('nextBtnSteps');

// Tự động tính khoảng scroll theo chiều rộng thực tế
function scrollSliderSteps(direction) {
  const itemWidth = sliderSteps.querySelector('div').offsetWidth + 24; // 24 = khoảng cách giữa các items (space-x-4)
  
  sliderSteps.scrollBy({
    left: direction === 'next' ? itemWidth : -itemWidth,
    behavior: 'smooth',
  });
}

if (sliderSteps && prevBtnSteps && nextBtnSteps) {
  prevBtnSteps.addEventListener('click', () => scrollSliderSteps('prev'));
  nextBtnSteps.addEventListener('click', () => scrollSliderSteps('next'));
}




// my story
const slider = document.getElementById('slider');
const next = document.getElementById('nextBtn');
const prev = document.getElementById('prevBtn');
let scrollAmount = slider?.offsetWidth / 2;

function scrollToNext() {
    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0; // Quay lại đầu slider
    } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

if (slider && next && prev) {
    next.addEventListener('click', scrollToNext);

    prev.addEventListener('click', () => {
        if (slider.scrollLeft === 0) {
            slider.scrollLeft = slider.scrollWidth - slider.offsetWidth;
        } else {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });

    // Tự động trượt ảnh
    let autoSlideInterval = setInterval(scrollToNext, 5000);
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', () => autoSlideInterval = setInterval(scrollToNext, 5000));

    // Cập nhật lại scrollAmount khi thay đổi kích thước màn hình
    window.addEventListener('resize', () => {
        scrollAmount = slider?.offsetWidth / 2;
    });
}


// ---------------- HEADER SPACING FOR MOBILE ----------------
const header = document.getElementById('header');
const bannerSection = document.querySelector("section");
const isMobile = window.innerWidth < 768;

if (header && bannerSection && isMobile) {
  const headerHeight = header.offsetHeight;
  bannerSection.style.paddingTop = `${headerHeight}px`;
}

// ---------------- HIDE HEADER ON SCROLL DOWN, SHOW ON SCROLL UP ----------------
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (!header) return;

  if (currentScroll > lastScrollTop) {
    // Cuộn xuống → ẩn header
    header.style.transform = 'translateY(-100%)';
  } else {
    // Cuộn lên → hiện lại header
    header.style.transform = 'translateY(0)';
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


// ---------------- VIDEO BUTTON OPEN/CLOSE ----------------
const openBtn = document.getElementById("openVideoBtn");
const closeBtn = document.getElementById("closeVideoBtn");
const modal = document.getElementById("videoModal");

if (openBtn && closeBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        const iframe = modal.querySelector("iframe");
        iframe.src = iframe.src;
    });
}

// ---------------- ĐỌC THÊM / THU GỌN ----------------
window.toggleText = (btn) => {
    const card = btn.closest('.flex-col');
    const shortText = card.querySelector('.short-text');
    const fullText = card.querySelector('.full-text');
    const isHidden = fullText.classList.contains('hidden');

    if (isHidden) {
        shortText.classList.add('hidden');
        fullText.classList.remove('hidden');
        btn.textContent = 'Thu gọn';
    } else {
        shortText.classList.remove('hidden');
        fullText.classList.add('hidden');
        btn.textContent = 'Đọc thêm';
    }
};

// ---------------- SLIDER PRODUCT ----------------
const sliderProducts = document.getElementById('sliderProducts');
const prevProd = document.getElementById('prevBtnProducts');
const nextProd = document.getElementById('nextBtnProducts');

// Tự động tính khoảng scroll theo chiều rộng thực tế
function scrollSlider(direction) {
  const itemWidth = sliderProducts.querySelector('div').offsetWidth + 24; // 24 = khoảng cách giữa items (space-x-6)
  sliderProducts.scrollBy({
    left: direction === 'next' ? itemWidth : -itemWidth,
    behavior: 'smooth',
  });
}

if (sliderProducts && prevProd && nextProd) {
  prevProd.addEventListener('click', () => scrollSlider('prev'));
  nextProd.addEventListener('click', () => scrollSlider('next'));
}


// ---------------- FAQ ----------------
window.toggleFAQ = (button) => {
    const answer = button.previousElementSibling;
    const isHidden = answer.classList.contains('hidden');
    if (isHidden) {
        answer.classList.remove('hidden');
        button.textContent = 'Thu gọn';
    } else {
        answer.classList.add('hidden');
        button.textContent = 'Xem thêm';
    }
};
// gửi mail
const scriptURL = 'https://script.google.com/macros/s/AKfycbyWXWJLMefYEVs6jiU2SaKXOrGehOHO6sd3122HeZg6XBVDGpxM4YerEeXfqtomVZqf/exec';
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      form.reset();
      showToast();
    })
    .catch(error => {
      alert('Gửi thất bại. Vui lòng thử lại sau.');
      console.error('Error!', error.message);
    });
});

function showToast() {
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');
  
    setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none');
      toast.classList.remove('opacity-100');
    }, 4000);
  }

//   E_BOOK
const scriptURLebook = 'https://script.google.com/macros/s/AKfycbwVuHZGUWdprCFAVZ2nH9Q9ctyn3_TJoO0TMMxXTsGeNMuxDROynQtYQ3xokCchrf3z/exec';
const forme = document.getElementById('contactFormEbook');
const toaste = document.getElementById('toastEbookEbook');

if (forme) {
  forme.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(forme);

    fetch(scriptURLebook, { method: 'POST', body: formData })
      .then(response => {
        forme.reset();
        showToastEbook();
      })
      .catch(error => {
        alert('Gửi thất bại. Vui lòng thử lại sau.');
        console.error('Error!', error.message);
      });
  });

  function showToastEbook() {
    toaste.classList.remove('opacity-0', 'pointer-events-none');
    toaste.classList.add('opacity-100');

    setTimeout(() => {
      toaste.classList.add('opacity-0', 'pointer-events-none');
      toaste.classList.remove('opacity-100');
    }, 4000);
  }
}

