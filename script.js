class PortfolioApp {
  constructor() {
    this.init()
  }

  // Méthode d'initialisation principale
  init() {
    this.setupEventListeners()
    this.setupThemeToggle()
    this.setupScrollAnimations()
    this.setupSkillAnimations()
    this.setupFormHandling()
    this.setupSmoothScrolling()
    this.setupHeaderEffects()
    this.setupTypingAnimation()
    this.setupParticleBackground()
  }

  // Configuration de l'arrière-plan avec particules animées
  setupParticleBackground() {
    this.createParticleBackground()
    this.animateParticles()
    this.createNetworkConnections()
  }

  // Création des particules pour l'arrière-plan
  createParticleBackground() {
    const particleContainer = document.createElement("div")
    particleContainer.className = "particle-background"
    document.body.appendChild(particleContainer)

    // Nombre de particules à créer
    const particleCount = 50
    this.particles = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Position aléatoire des particules
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"

      // Animation avec délai et durée aléatoires
      particle.style.animationDelay = Math.random() * 6 + "s"
      particle.style.animationDuration = Math.random() * 4 + 6 + "s"

      particleContainer.appendChild(particle)
      this.particles.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5, // Vitesse horizontale
        vy: (Math.random() - 0.5) * 0.5, // Vitesse verticale
      })
    }
  }

  // Animation des particules avec mouvement continu
  animateParticles() {
    const animate = () => {
      this.particles.forEach((particle) => {
        // Mise à jour de la position
        particle.x += particle.vx
        particle.y += particle.vy

        // Rebond sur les bords de l'écran
        if (particle.x <= 0 || particle.x >= window.innerWidth) {
          particle.vx *= -1
        }
        if (particle.y <= 0 || particle.y >= window.innerHeight) {
          particle.vy *= -1
        }

        // Limitation de la position dans les limites de l'écran
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x))
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y))

        // Application de la nouvelle position
        particle.element.style.left = particle.x + "px"
        particle.element.style.top = particle.y + "px"
      })

      requestAnimationFrame(animate)
    }

    animate()
  }

  // Création des connexions réseau entre les particules
  createNetworkConnections() {
    const connectionContainer = document.createElement("div")
    connectionContainer.className = "network-connections"
    connectionContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
    `
    document.body.appendChild(connectionContainer)

    const updateConnections = () => {
      connectionContainer.innerHTML = ""

      // Vérification des distances entre toutes les paires de particules
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const p1 = this.particles[i]
          const p2 = this.particles[j]

          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

          // Création d'une ligne si les particules sont proches
          if (distance < 150) {
            const line = document.createElement("div")
            line.className = "network-line"

            const angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI
            const opacity = 1 - distance / 150 // Opacité proportionnelle à la distance

            line.style.cssText = `
              position: absolute;
              left: ${p1.x}px;
              top: ${p1.y}px;
              width: ${distance}px;
              height: 1px;
              background: linear-gradient(90deg, 
                rgba(139, 92, 246, ${opacity * 0.3}), 
                rgba(59, 130, 246, ${opacity * 0.5}), 
                rgba(139, 92, 246, ${opacity * 0.3})
              );
              transform: rotate(${angle}deg);
              transform-origin: 0 0;
            `

            connectionContainer.appendChild(line)
          }
        }
      }
    }

    // Mise à jour périodique des connexions
    setInterval(updateConnections, 100)
  }

  // Configuration des écouteurs d'événements principaux
  setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      console.log("[v0] Portfolio app initialized")
      this.setupDropdownMenus()
      this.setupContactForm()
      this.setupCharacterCounter()
      this.setupCVDownload()
    })

    window.addEventListener(
      "resize",
      debounce(() => {
        this.handleResize()
      }, 250),
    )
  }

  // Gestion du redimensionnement de la fenêtre
  handleResize() {
    // Ajustement des particules aux nouvelles dimensions
    if (this.particles) {
      this.particles.forEach((particle) => {
        if (particle.x > window.innerWidth) {
          particle.x = window.innerWidth - 10
        }
        if (particle.y > window.innerHeight) {
          particle.y = window.innerHeight - 10
        }
      })
    }
  }

  // Configuration des menus déroulants
  setupDropdownMenus() {
    const dropdowns = document.querySelectorAll(".dropdown")

    dropdowns.forEach((dropdown) => {
      const btn = dropdown.querySelector(".dropdown-btn")
      const menu = dropdown.querySelector(".dropdown-menu")

      let timeout

      const showMenu = () => {
        clearTimeout(timeout)
        dropdown.classList.add("active")
        btn.setAttribute("aria-expanded", "true")
      }

      const hideMenu = () => {
        timeout = setTimeout(() => {
          dropdown.classList.remove("active")
          btn.setAttribute("aria-expanded", "false")
        }, 150)
      }

      // Gestion hover pour desktop
      dropdown.addEventListener("mouseenter", showMenu)
      dropdown.addEventListener("mouseleave", hideMenu)

      // Gestion clavier pour accessibilité
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          dropdown.classList.toggle("active")
        }
        if (e.key === "Escape") {
          dropdown.classList.remove("active")
          btn.focus()
        }
      })

      // Fermeture au clic extérieur
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove("active")
          btn.setAttribute("aria-expanded", "false")
        }
      })
    })
  }

  // Configuration du basculement de thème (dark/light)
  setupThemeToggle() {
    const toggles = document.querySelectorAll(".toggle-switch")
    const html = document.documentElement

    // Récupération du thème sauvegardé ou détection du préférence système
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light")

    this.setTheme(initialTheme)

    toggles.forEach((toggle) => {
      const slider = toggle.querySelector(".toggle-slider")

      // Initialisation de l'état du toggle
      if (initialTheme === "dark") {
        toggle.classList.add("active")
      }

      toggle.addEventListener("click", () => {
        const isDark = html.classList.contains("dark")
        const newTheme = isDark ? "light" : "dark"

        this.setTheme(newTheme)
        localStorage.setItem("theme", newTheme)

        // Mise à jour de tous les toggles
        toggles.forEach((t) => {
          if (newTheme === "dark") {
            t.classList.add("active")
          } else {
            t.classList.remove("active")
          }
        })
      })
    })

    // Écoute des changements de préférence système
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        this.setTheme(e.matches ? "dark" : "light")
      }
    })
  }

  // Application du thème sélectionné
  setTheme(theme) {
    const html = document.documentElement

    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  // Configuration des animations au défilement
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")

          // Animation spécifique pour la section compétences
          if (entry.target.classList.contains("competences")) {
            this.animateSkillBars()
          }
        }
      })
    }, observerOptions)

    // Observation des éléments à animer
    const elementsToAnimate = document.querySelectorAll(`
      .hero-content,
      .presentation-card,
      .timeline-item,
      .skill-card,
      .contact-form-container,
      .competences
    `)

    elementsToAnimate.forEach((el) => {
      el.classList.add("animate-on-scroll")
      observer.observe(el)
    })
  }

  // Configuration des animations des compétences
  setupSkillAnimations() {
    const skillCards = document.querySelectorAll(".skill-card")

    skillCards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => {
        const levelBar = card.querySelector(".level-bar")
        if (levelBar) {
          levelBar.style.animationDelay = `${index * 0.1}s`
        }
      })
    })
  }

  // Animation des barres de compétences
  animateSkillBars() {
    const levelBars = document.querySelectorAll(".level-bar")

    levelBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.transform = "scaleX(1)"
        bar.style.transformOrigin = "left"
      }, index * 200)
    })
  }

  // Configuration de la gestion du formulaire de contact
  setupFormHandling() {
    const form = document.getElementById("contactForm")
    if (!form) return

    const submitBtn = form.querySelector(".submit-btn")
    const btnText = submitBtn.querySelector(".btn-text") || submitBtn
    const originalText = btnText.textContent

    form.addEventListener("submit", async (e) => {
      e.preventDefault()

      if (!this.validateForm(form)) {
        return
      }

      // État de chargement
      submitBtn.classList.add("loading")
      btnText.textContent = "Envoi en cours"
      submitBtn.disabled = true

      try {
        const formData = new FormData(form)
        const data = {
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject") || "",
          message: formData.get("message"),
        }

        console.log("[v0] Form data:", data)

        // Simulation d'envoi (à remplacer par un vrai appel API)
        await this.simulateFormSubmission(data)

        // Succès
        this.showNotification("Message envoyé avec succès !", "success")
        form.reset()
        this.updateCharacterCount()
      } catch (error) {
        console.error("[v0] Form submission error:", error)
        this.showNotification("Erreur lors de l'envoi. Veuillez réessayer.", "error")
      } finally {
        // Retour à l'état normal
        submitBtn.classList.remove("loading")
        btnText.textContent = originalText
        submitBtn.disabled = false
      }
    })
  }

  // Validation du formulaire
  validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      const value = field.value.trim()

      if (!value) {
        this.showFieldError(field, "Ce champ est requis")
        isValid = false
      } else if (field.type === "email" && !this.isValidEmail(value)) {
        this.showFieldError(field, "Adresse email invalide")
        isValid = false
      } else {
        this.clearFieldError(field)
      }
    })

    return isValid
  }

  // Affichage d'une erreur de champ
  showFieldError(field, message) {
    this.clearFieldError(field)

    field.style.borderColor = "#ef4444"
    const errorEl = document.createElement("span")
    errorEl.className = "field-error"
    errorEl.textContent = message
    errorEl.style.cssText = `
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 0.25rem;
      display: block;
    `

    field.parentNode.appendChild(errorEl)
  }

  // Effacement de l'erreur de champ
  clearFieldError(field) {
    field.style.borderColor = ""
    const errorEl = field.parentNode.querySelector(".field-error")
    if (errorEl) {
      errorEl.remove()
    }
  }

  // Validation d'email avec regex
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Simulation d'envoi de formulaire (pour démonstration)
  async simulateFormSubmission(data) {
    // Simulation d'un délai d'envoi
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  // Configuration du compteur de caractères pour le textarea
  setupCharacterCounter() {
    const textarea = document.getElementById("message")
    const counter = document.getElementById("charCount")

    if (!textarea) return

    if (!counter) {
      const counterEl = document.createElement("div")
      counterEl.innerHTML = '<span id="charCount">0</span>/5000 caractères'
      counterEl.style.cssText = `
        font-size: 0.75rem;
        color: var(--muted-foreground);
        margin-top: 0.5rem;
        text-align: right;
      `
      textarea.parentNode.appendChild(counterEl)
    }

    const updateCount = () => {
      const count = textarea.value.length
      const maxLength = textarea.getAttribute("maxlength") || 5000
      const counterElement = document.getElementById("charCount")

      if (counterElement) {
        counterElement.textContent = count

        // Changement de couleur selon le nombre de caractères
        if (count > maxLength * 0.9) {
          counterElement.style.color = "#ef4444"
        } else if (count > maxLength * 0.7) {
          counterElement.style.color = "#f59e0b"
        } else {
          counterElement.style.color = ""
        }
      }
    }

    textarea.addEventListener("input", updateCount)
    updateCount() // Comptage initial
  }

  // Mise à jour du compteur de caractères
  updateCharacterCount() {
    const counter = document.getElementById("charCount")
    if (counter) {
      counter.textContent = "0"
      counter.style.color = ""
    }
  }

  // Configuration du défilement fluide
  setupSmoothScrolling() {
    // Fonction globale pour le défilement vers une section
    window.scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = section.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    }

    // Application aux liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = anchor.getAttribute("href").substring(1)
        if (targetId) {
          window.scrollToSection(targetId)
        }
      })
    })
  }

  // Effets sur l'en-tête au défilement
  setupHeaderEffects() {
    const header = document.querySelector(".header")
    let lastScrollY = window.scrollY
    let ticking = false

    const updateHeader = () => {
      const scrollY = window.scrollY

      // Changement de fond selon la position de défilement
      if (scrollY > 100) {
        header.style.background = "rgba(15, 23, 42, 0.95)"
        header.style.backdropFilter = "blur(20px)"
      } else {
        header.style.background = "rgba(15, 23, 42, 0.8)"
        header.style.backdropFilter = "blur(20px)"
      }

      // Masquage/affichage de l'en-tête au défilement
      if (scrollY > lastScrollY && scrollY > 200) {
        header.style.transform = "translateY(-100%)"
      } else {
        header.style.transform = "translateY(0)"
      }

      lastScrollY = scrollY
      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader)
        ticking = true
      }
    })
  }

  // Animation de dactylographie pour le nom
  setupTypingAnimation() {
    const nameElement = document.querySelector(".highlight-name")
    if (!nameElement) return

    const text = nameElement.textContent
    nameElement.textContent = ""

    let index = 0
    const typeSpeed = 100

    const typeWriter = () => {
      if (index < text.length) {
        nameElement.textContent += text.charAt(index)
        index++
        setTimeout(typeWriter, typeSpeed)
      }
    }

    // Démarrage avec un délai
    setTimeout(typeWriter, 1000)
  }

  // Affichage des notifications
  showNotification(message, type = "info") {
    // Suppression des notifications existantes
    const existing = document.querySelector(".notification")
    if (existing) {
      existing.remove()
    }

    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">
          ${type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}
        </span>
        <span class="notification-message">${message}</span>
      </div>
    `

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 10000;
      background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `

    document.body.appendChild(notification)

    // Animation d'entrée
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Disparition automatique après 5 secondes
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }, 5000)
  }

  // Configuration supplémentaire du formulaire de contact
  setupContactForm() {
    const form = document.getElementById("contactForm")
    if (!form) return

    // Validation en temps réel
    const inputs = form.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input)
      })

      input.addEventListener("input", () => {
        this.clearFieldError(input)
      })
    })
  }

  // Validation individuelle d'un champ
  validateField(field) {
    const value = field.value.trim()

    if (field.hasAttribute("required") && !value) {
      this.showFieldError(field, "Ce champ est requis")
      return false
    }

    if (field.type === "email" && value && !this.isValidEmail(value)) {
      this.showFieldError(field, "Adresse email invalide")
      return false
    }

    this.clearFieldError(field)
    return true
  }

  // Configuration du téléchargement du CV
  setupCVDownload() {
    const cvButton = document.querySelector(".card-btn.primary")
    if (cvButton) {
      cvButton.addEventListener("click", (e) => {
        e.preventDefault()
        this.downloadCV()
      })
    }
  }

  // Téléchargement du CV
  downloadCV() {
    const link = document.createElement("a")
    link.href = "CV_Belhaouz_Anass.pdf"
    link.download = "CV_Belhaouz_Anass.pdf"
    link.style.display = "none"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Notification de succès
    this.showNotification("CV téléchargé avec succès !", "success")
  }
}

// Instanciation de l'application
const portfolioApp = new PortfolioApp()

// Fonction utilitaire pour limiter les appels fréquents (debounce)
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Fonction utilitaire pour limiter la fréquence d'exécution (throttle)
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Mesure des performances de chargement
if (typeof performance !== "undefined") {
  window.addEventListener("load", () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    console.log(`[v0] Page loaded in ${loadTime}ms`)
  })
}

// Gestion des erreurs JavaScript globales
window.addEventListener("error", (e) => {
  console.error("[v0] JavaScript error:", e.error)
})

// Détection du support Service Worker (pour PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Potentielle intégration future de Service Worker
    console.log("[v0] Service Worker support detected")
  })
}

// Styles CSS dynamiques pour l'animation de chargement
const style = document.createElement("style")
style.textContent = `
  .loading .btn-text::after {
    content: "...";
    animation: dots 1.5s infinite;
  }

  @keyframes dots {
    0%, 20% { content: ""; }
    40% { content: "."; }
    60% { content: ".."; }
    80%, 100% { content: "..."; }
  }
`
document.head.appendChild(style)