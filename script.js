// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言切换
    initLanguageSwitch();
    
    // 初始化移动端菜单
    initMobileMenu();
    
    // 初始化回到顶部按钮
    initBackToTop();
    
    // 初始化表单提交
    initFormSubmit();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化导航栏滚动效果
    initNavbarScroll();
    
    // 初始化页面加载动画
    initPageLoadAnimation();
});

// 语言切换功能
function initLanguageSwitch() {
    const langZh = document.getElementById('lang-zh');
    const langEn = document.getElementById('lang-en');
    
    langZh.addEventListener('click', function() {
        switchLanguage('zh');
        langZh.classList.add('active');
        langEn.classList.remove('active');
    });
    
    langEn.addEventListener('click', function() {
        switchLanguage('en');
        langEn.classList.add('active');
        langZh.classList.remove('active');
    });
}

function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
    
    // 保存语言偏好到本地存储
    localStorage.setItem('language', lang);
}

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navUl.classList.toggle('mobile-menu');
        });
    }
}

// 回到顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 表单提交处理
function initFormSubmit() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const organization = document.getElementById('organization').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 简单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 模拟表单提交
            alert('消息已发送！我们会尽快回复您。');
            contactForm.reset();
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                const navUl = document.querySelector('nav ul');
                if (navUl.classList.contains('mobile-menu')) {
                    navUl.classList.remove('mobile-menu');
                }
            }
        });
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 计算透明度，滚动距离越大，透明度越高
        let opacity = Math.min(scrollTop / 100, 1);
        if (scrollTop < 50) {
            opacity = 0.98 - (50 - scrollTop) / 250;
        }
        
        // 更新导航栏样式
        header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        
        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 页面加载动画
function initPageLoadAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// 软件产品卡片动画
function initSoftwareAnimations() {
    const softwareItems = document.querySelectorAll('.software-item');
    
    // 初始状态
    softwareItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 监听滚动事件
    function checkScroll() {
        softwareItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.85) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 监听滚动
    window.addEventListener('scroll', checkScroll);
}

// 服务项目动画
function initServiceAnimations() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    // 初始状态
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    // 监听滚动事件
    function checkScroll() {
        serviceItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.85) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 监听滚动
    window.addEventListener('scroll', checkScroll);
}

// 案例项目动画
function initCaseAnimations() {
    const caseItems = document.querySelectorAll('.case-item');
    
    // 初始状态
    caseItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    // 监听滚动事件
    function checkScroll() {
        caseItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.85) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 监听滚动
    window.addEventListener('scroll', checkScroll);
}

// 加载完成后初始化动画
window.addEventListener('load', function() {
    initSoftwareAnimations();
    initServiceAnimations();
    initCaseAnimations();
    
    // 检查本地存储中的语言偏好
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        switchLanguage(savedLanguage);
        if (savedLanguage === 'en') {
            document.getElementById('lang-en').classList.add('active');
            document.getElementById('lang-zh').classList.remove('active');
        } else {
            document.getElementById('lang-zh').classList.add('active');
            document.getElementById('lang-en').classList.remove('active');
        }
    }
});

// 移动端菜单切换函数
function toggleMobileMenu() {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('mobile-menu');
}

// 添加滚动时的视差效果
function initParallaxEffect() {
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', function() {
        if (heroBg) {
            const scrollY = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
}

// 初始化视差效果
initParallaxEffect();