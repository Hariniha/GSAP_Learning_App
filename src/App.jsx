import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DecorativeBackground from './components/DecorativeBackground'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const landingRef = useRef(null)
  const contentRef = useRef(null)
  const cardsRef = useRef([])
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const topicLinksRef = useRef([])

  const languages = [
    {
      name: 'JavaScript',
      icon: 'JS',
      description: 'Web Development',
      topics: [
        { name: 'JavaScript Basics', url: 'https://www.geeksforgeeks.org/javascript-tutorial/' },
        { name: 'ES6 Features', url: 'https://www.geeksforgeeks.org/introduction-to-es6/' },
        { name: 'Async Programming', url: 'https://www.geeksforgeeks.org/javascript-promises/' },
        { name: 'DOM Manipulation', url: 'https://www.geeksforgeeks.org/dom-document-object-model/' }
      ]
    },
    {
      name: 'Python',
      icon: 'PY',
      description: 'AI & Data Science',
      topics: [
        { name: 'Python Basics', url: 'https://www.geeksforgeeks.org/python-programming-language/' },
        { name: 'Data Structures', url: 'https://www.geeksforgeeks.org/python-data-structures/' },
        { name: 'NumPy & Pandas', url: 'https://www.geeksforgeeks.org/python-pandas/' },
        { name: 'Machine Learning', url: 'https://www.geeksforgeeks.org/machine-learning/' }
      ]
    },
    {
      name: 'TypeScript',
      icon: 'TS',
      description: 'Type-Safe Apps',
      topics: [
        { name: 'TypeScript Basics', url: 'https://www.geeksforgeeks.org/typescript/' },
        { name: 'Interfaces & Types', url: 'https://www.geeksforgeeks.org/typescript-interfaces/' },
        { name: 'Generics', url: 'https://www.geeksforgeeks.org/typescript-generics/' },
        { name: 'Advanced Types', url: 'https://www.geeksforgeeks.org/typescript-utility-types/' }
      ]
    },
    {
      name: 'Solidity',
      icon: 'SOL',
      description: 'Smart Contracts',
      topics: [
        { name: 'Solidity Basics', url: 'https://www.geeksforgeeks.org/solidity-tutorial/' },
        { name: 'Smart Contracts', url: 'https://www.geeksforgeeks.org/introduction-to-smart-contracts/' },
        { name: 'Web3 Development', url: 'https://www.geeksforgeeks.org/what-is-web3/' },
        { name: 'Ethereum & DApps', url: 'https://www.geeksforgeeks.org/ethereum-tutorial/' }
      ]
    },
    {
      name: 'Rust',
      icon: 'RS',
      description: 'Web3 & Systems',
      topics: [
        { name: 'Rust Basics', url: 'https://www.geeksforgeeks.org/rust-programming-language/' },
        { name: 'Ownership & Borrowing', url: 'https://www.geeksforgeeks.org/ownership-in-rust/' },
        { name: 'Solana Development', url: 'https://www.geeksforgeeks.org/blockchain-tutorial/' },
        { name: 'Systems Programming', url: 'https://www.geeksforgeeks.org/rust-tutorial/' }
      ]
    },
    {
      name: 'Go',
      icon: 'GO',
      description: 'Backend & Blockchain',
      topics: [
        { name: 'Go Basics', url: 'https://www.geeksforgeeks.org/golang/' },
        { name: 'Concurrency', url: 'https://www.geeksforgeeks.org/goroutines-concurrency-in-golang/' },
        { name: 'Microservices', url: 'https://www.geeksforgeeks.org/microservices/' },
        { name: 'Blockchain with Go', url: 'https://www.geeksforgeeks.org/blockchain-tutorial/' }
      ]
    },
    {
      name: 'Java',
      icon: 'JV',
      description: 'Enterprise Apps',
      topics: [
        { name: 'Java Basics', url: 'https://www.geeksforgeeks.org/java/' },
        { name: 'OOP Concepts', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/' },
        { name: 'Collections', url: 'https://www.geeksforgeeks.org/collections-in-java-2/' },
        { name: 'Multithreading', url: 'https://www.geeksforgeeks.org/multithreading-in-java/' }
      ]
    },
    {
      name: 'C++',
      icon: 'C++',
      description: 'System Programming',
      topics: [
        { name: 'C++ Basics', url: 'https://www.geeksforgeeks.org/c-plus-plus/' },
        { name: 'STL', url: 'https://www.geeksforgeeks.org/the-c-standard-template-library-stl/' },
        { name: 'Pointers', url: 'https://www.geeksforgeeks.org/pointers-in-c-and-c-set-1-introduction-arithmetic-and-array/' },
        { name: 'Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/' }
      ]
    },
    {
      name: 'React',
      icon: 'RC',
      description: 'UI Development',
      topics: [
        { name: 'React Basics', url: 'https://www.geeksforgeeks.org/react-tutorial/' },
        { name: 'Hooks', url: 'https://www.geeksforgeeks.org/reactjs-hooks/' },
        { name: 'State Management', url: 'https://www.geeksforgeeks.org/reactjs-state-in-react/' },
        { name: 'React Router', url: 'https://www.geeksforgeeks.org/reactjs-router/' }
      ]
    },
    {
      name: 'Move',
      icon: 'MV',
      description: 'Aptos & Sui',
      topics: [
        { name: 'Move Language', url: 'https://www.geeksforgeeks.org/blockchain-tutorial/' },
        { name: 'Resource Types', url: 'https://www.geeksforgeeks.org/smart-contracts/' },
        { name: 'Aptos Blockchain', url: 'https://www.geeksforgeeks.org/blockchain-technology-introduction/' },
        { name: 'DeFi Development', url: 'https://www.geeksforgeeks.org/what-is-decentralized-finance-defi/' }
      ]
    },
    {
      name: 'Vyper',
      icon: 'VY',
      description: 'Pythonic Smart Contracts',
      topics: [
        { name: 'Vyper Basics', url: 'https://www.geeksforgeeks.org/solidity-tutorial/' },
        { name: 'Contract Security', url: 'https://www.geeksforgeeks.org/blockchain-security/' },
        { name: 'EVM Development', url: 'https://www.geeksforgeeks.org/ethereum-tutorial/' },
        { name: 'DApp Architecture', url: 'https://www.geeksforgeeks.org/decentralized-applications-dapps/' }
      ]
    },
    {
      name: 'Node.js',
      icon: 'ND',
      description: 'Backend Development',
      topics: [
        { name: 'Node.js Basics', url: 'https://www.geeksforgeeks.org/nodejs/' },
        { name: 'Express Framework', url: 'https://www.geeksforgeeks.org/express-js/' },
        { name: 'REST APIs', url: 'https://www.geeksforgeeks.org/rest-api-introduction/' },
        { name: 'Database Integration', url: 'https://www.geeksforgeeks.org/mongodb-tutorial/' }
      ]
    }
  ]

  // Initial animation on component mount
  useEffect(() => {
    if (!selectedLanguage) {
      // Animate title with letter-by-letter reveal
      if (titleRef.current) {
        const titleText = titleRef.current.textContent
        titleRef.current.innerHTML = titleText
          .split('')
          .map((char, i) => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('')
        
        gsap.fromTo(
          titleRef.current.children,
          { opacity: 0, y: 50, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)',
            delay: 0.2
          }
        )
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.8
          }
        )
      }

      // Animate language cards with 3D effect
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 100, rotationY: -45, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'random',
            ease: 'power2.out'
          },
          ease: 'back.out(1.4)',
          delay: 1
        }
      )

      // Add continuous floating animation to card icons
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const icon = card.querySelector('.language-icon')
          if (icon) {
            gsap.to(icon, {
              y: -10,
              duration: 1.5 + index * 0.1,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: index * 0.1
            })
          }
        }
      })
    }
  }, [selectedLanguage])

  // Add GSAP hover animations to cards with tilt effect
  const handleCardHover = (index, isHovering) => {
    const card = cardsRef.current[index]
    if (!card) return

    if (isHovering) {
      gsap.to(card, {
        y: -15,
        scale: 1.08,
        rotationY: 5,
        rotationX: 5,
        boxShadow: '0 20px 50px rgba(19, 117, 106, 0.5)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        boxShadow: '0 0 0 rgba(19, 117, 106, 0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  }

  const handleLanguageClick = (language) => {
    // Pulse effect on clicked card
    const clickedCard = event.target.closest('.language-card')
    if (clickedCard) {
      gsap.to(clickedCard, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }

    // Animate out landing page with stagger
    gsap.to(cardsRef.current, {
      opacity: 0,
      y: -100,
      scale: 0.8,
      rotationX: 45,
      stagger: {
        amount: 0.3,
        from: 'random'
      },
      duration: 0.5,
      ease: 'back.in(1.7)'
    })

    gsap.to([titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: -50,
      duration: 0.4,
      ease: 'power2.in'
    })

    setTimeout(() => {
      setSelectedLanguage(language)
      // Animate in content page with topic links
      setTimeout(() => {
        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
          )

          // Animate topic links with stagger
          gsap.fromTo(
            topicLinksRef.current,
            { opacity: 0, x: -50, rotationY: -45 },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.4)',
              delay: 0.3
            }
          )
        }
      }, 50)
    }, 600)
  }

  const handleBackToHome = () => {
    // Animate out content page with rotation
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.9,
      rotationY: 45,
      duration: 0.5,
      ease: 'back.in(1.7)',
      onComplete: () => {
        setSelectedLanguage(null)
        topicLinksRef.current = [] // Reset refs
        // Animate in landing page
        setTimeout(() => {
          if (landingRef.current) {
            gsap.fromTo(
              landingRef.current,
              { opacity: 0, scale: 1.1 },
              { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
            )
          }
        }, 50)
      }
    })
  }
  return (
    <div className="app">
      <DecorativeBackground />

      {/* Landing Page */}
      {!selectedLanguage && (
        <div className="content" ref={landingRef}>
          <div className="content__inner">
            <h2 className="content__title" ref={titleRef}>Master Modern Languages</h2>
            <p className="content__description" ref={descriptionRef}>
              Click on a language to start learning
            </p>
            
            {/* Language Cards */}
            <div className="language-grid">
              {languages.map((lang, index) => (
                <div 
                  key={index} 
                  className="language-card"
                  ref={(el) => (cardsRef.current[index] = el)}
                  onClick={(e) => handleLanguageClick(lang)}
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                >
                  <div className="language-icon">{lang.icon}</div>
                  <h3>{lang.name}</h3>
                  <p>{lang.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Learning Content Page */}
      {selectedLanguage && (
        <div className="content" ref={contentRef}>
          <div className="content__inner">
            <button 
              className="back-button" 
              onClick={handleBackToHome}
              onMouseEnter={(e) => gsap.to(e.target, { x: -5, duration: 0.3 })}
              onMouseLeave={(e) => gsap.to(e.target, { x: 0, duration: 0.3 })}
            >
              ← Back to Home
            </button>
            
            <h2 className="content__title">{selectedLanguage.name}</h2>
            <p className="content__description">
              {selectedLanguage.description} - Learn from GeeksforGeeks
            </p>

            <div className="learning-content">
              <div className="language-section">
                <div className="language-header">
                  <div className="language-icon">{selectedLanguage.icon}</div>
                  <div>
                    <h3>{selectedLanguage.name}</h3>
                    <p>{selectedLanguage.description}</p>
                  </div>
                </div>
                
                <div className="topics-grid">
                  {selectedLanguage.topics.map((topic, topicIndex) => (
                    <a
                      key={topicIndex}
                      ref={(el) => (topicLinksRef.current[topicIndex] = el)}
                      href={topic.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="topic-link"
                      onMouseEnter={(e) => {
                        gsap.to(e.target, { 
                          x: 8, 
                          scale: 1.05,
                          backgroundColor: 'rgba(19, 117, 106, 0.35)',
                          duration: 0.3, 
                          ease: 'back.out(2)' 
                        })
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.target, { 
                          x: 0, 
                          scale: 1,
                          backgroundColor: 'rgba(19, 117, 106, 0.15)',
                          duration: 0.3, 
                          ease: 'power2.out' 
                        })
                      }}
                    >
                      {topic.name} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
