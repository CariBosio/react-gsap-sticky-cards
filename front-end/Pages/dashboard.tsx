import baseClasses from '@components/Themes/layout.module.scss'
import stylesmodulescss from 'dist/css/styles.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { FunctionComponent } from 'react'

import Typography from '@mui/material/Typography'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
gsap.registerPlugin(
  ScrollTrigger,

  ScrollSmoother
)

const Dashboard: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('en')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const cardInnerRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const theme = { ...baseClasses, ...stylesmodulescss }

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  // Theme selection

  const cardsData = [
    {
      id: 1,
      info: 'A surreal dive into neon hues and playful decay',
      title: 'Reverie',
      description:
        'A psychedelic skull study exploring the tension between playfulness and decay. Bold candy tones, liquid forms, and crisp vectors bring a surreal, pop-art mood ment for covers and prints.',
      imgSrc: '/img/01.jpg',
    },
    {
      id: 2,
      info: 'A retro-futurist scene where nostalgia meets glitch',
      title: 'Vaporwave',
      description:
        'An 80s-ui dreamscape: stacked windows, checkerboard floors, and a sunset gradient, built to feel like a loading screen to another world-nostalgic, glossy, and a bit uncanny.',
      imgSrc: '/img/02.jpg',
    },
    {
      id: 3,
      info: 'A kaleidoscope of folk motifs reimagined in digital form',
      title: 'Kaleido',
      description:
        'Ornamental symmetry inspired by folk motifs and stained-glass glow. Designed as a seamless, tileable pattern for textiles, wallpapers, and rich ui backgrounds.',
      imgSrc: '/img/03.jpg',
    },
    {
      id: 4,
      info: 'A portrait framed by oddball creatures and doodles',
      title: 'Menagerie',
      description:
        ' playful portrait surreunded by oddball companions -mascots, monsters, and mindnight snacks. Loose linework meet pastel whimsy, perfect for merch, stickers, and editorial spots.',
      imgSrc: '/img/04.jpg',
    },
  ]

  React.useEffect(() => {
    // Inicializar ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: containerRef.current, // contenedor padre
      content: containerRef.current, // contenido
      smooth: 1.5, // suavizado de scroll
      effects: true, // habilita efectos data-speed, data-lag etc.
    })

    // Animación de las cardInner
    cardRefs.current.forEach((card, i) => {
      if (i < cardRefs.current.length - 1) {
        const cardInner = cardInnerRefs.current[i]

        gsap.fromTo(
          cardInner,
          {
            y: '0%',
            z: 0,
            rotationX: 0,
          },
          {
            y: '-50%',
            z: -250,
            rotationX: 45,
            scrollTrigger: {
              trigger: cardRefs.current[i + 1],
              start: 'top 85%',
              end: 'top -75%',
              scrub: true,
              pin: cardRefs.current[i],
              pinSpacing: false,
            },
          }
        )
        gsap.to(cardInner, {
          '--after-opacity': 1,
          scrollTrigger: {
            trigger: cardRefs.current[i + 1],
            start: 'top 75%',
            end: 'top -25%',
            scrub: true,
          },
        })
      }
    })

    return () => {
      smoother.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <section data-title="section Hero" className={theme.hero}>
          <Typography variant="h1" className={theme.titles}>
            Art That Lives Onlines
          </Typography>
        </section>

        <section data-title="section Sticky Cards" className={theme.stickyCards}>
          {cardsData.map((card, index) => {
            return (
              <React.Fragment key={'P5pQv0iv_' + index}>
                <div
                  data-title="{`Card ${card.id}`}"
                  id={`card${card.id}`}
                  className={`${theme.card} ${theme.card1}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  key={card.id}
                >
                  <div data-title="Card inner" className={theme.cardInner} ref={(el) => (cardInnerRefs.current[index] = el)}>
                    <div data-title="Info" className={theme.cardInfo}>
                      <Typography variant="body1">{card.info}</Typography>
                    </div>

                    <div data-title="Title" className={theme.cardTitle}>
                      <Typography variant="h1" className={theme.titles}>
                        {card.title}
                      </Typography>
                    </div>

                    <div data-title="Description" className={theme.cardDescription}>
                      <Typography variant="body1">{card.description}</Typography>
                    </div>

                    <div data-title="Image" className={theme.cardImage}>
                      <picture>
                        <img src={card.imgSrc} alt={card.imgSrc} />
                      </picture>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </section>

        <section data-title="section Outro" className={theme.outro}>
          <Typography variant="h1" className={theme.titles}>
            Next Canvas Awaits
          </Typography>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
