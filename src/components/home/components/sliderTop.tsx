import sneaker1 from '../img/sneaker1.png'
import sneaker2 from '../img/sneaker2.png'
import sneaker3 from '../img/sneaker3.png'
import sneaker4 from '../img/sneaker4.png'
import style from '../home.module.css'
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import nike from '../img/Nike.png'
import 'animate.css';
import { useState } from 'react'
import '../homeAnimation.css'
import { Link } from 'react-router-dom'

const SliderTop = () => {
    
    const [numSlider, setNumSlidder] = useState(0)
    const slider = [
        {
            id:0,
            img: sneaker1,
            name1: 'AIR MAX',
            name2: 'FLYKNIT RACER',
            text: 'Усиленный носок и прочный пластиковый каркас. Инновационная технология раскрывается через перфорированную стельку',
            price: '16 985'
        },
        {
            id:1,
            img: sneaker2,
            name1: 'NIKE',
            name2: 'LUNARGLIDE 6',
            text: 'Nike LunarGlide 6 предлагает более плавные ощущения при беге, которые хорошо поддерживаются платформой, которая корректирует скорость пронации у тех, кому нужна такая функция. У этого нет здоровенного веса, который освежает работу пользователя.',
            price: '21 471'
        },
        {
            id:2,
            img: sneaker3,
            name1: 'NIKE W',
            name2: 'AIR MAX 270',
            text: 'Легенда на новом уровне. Культовые кроссовки Nike Air Max с увеличенной воздушной вставкой для дерзких и запоминающихся образов в спортивном стиле.',
            price: '23 949'
        },
        {
            id:3,
            img: sneaker4,
            name2: 'AIR JORDAN 1',
            text: 'Эта модель вдохновлена оригинальной парой AJ1. Культовый силуэт в сочетании с новыми деталями — для твоего уникального стиля.',
            price: '26 599'
        },
    ]

    function previousSlide() {
        if (numSlider === 0) {
            setNumSlidder(3)
            
        } else {
            setNumSlidder(numSlider-1)
        } 
    }

    function nextSlide() {
        if (numSlider < 3) {
            setNumSlidder(numSlider+1)
        } else if (numSlider===3) {
            setNumSlidder(0)
        } 
    }

    // useEffect(() => {
    //     const timerID = setTimeout(() => {nextSlide()}, 8000)
    //     return () => clearInterval(timerID);
    // })
    
    return (
        <div className={style.sliderTopTop}>
            <div key={slider[numSlider].name1} className={style.container}>
                    <div className={style.sliderImgGop}>
                        <div className={style.SliderTextBlock}>
                        {/* height:'605px' */}
                            <div className={style.textDef}>
                                <div className={"animate__animated animate__fadeInLeft animate__fast"}>
                                    <div className={style.textPositionSlider}>
                                        <h1 className={style.h1Slider}>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',maxWidth:'436px'}}>
                                                {slider[numSlider].name1}
                                                {slider[numSlider].name1 === undefined ? '' :<span className={style.h1SliderLine}></span>}
                                            </div>
                                            {slider[numSlider].name2}
                                        </h1>   
                                        <p className={style.sliderText}>{slider[numSlider].text}</p>
                                        <p>от <span className={style.sliderPrice}>{slider[numSlider].price} ₽</span></p>
                                        <Link to={`/store/catalog`} className={style.moreDetailed}>Подробнее <span className={style.moreDetailedVektor}><GoArrowRight size={18}/></span></Link>
                                    </div>
                                </div>
                                <div className={style.sliderBtnArrowFlex}>
                                    <button onClick={() => previousSlide()} className={style.sliderBtnArrow}><GoArrowLeft size={18}/></button>
                                    <button onClick={() => nextSlide()} className={style.sliderBtnArrow} style={{backgroundColor:'rgb(246, 246, 246)'}}><GoArrowRight size={18}/></button>
                                </div>
                            </div>
                            
                        </div>
                        <div className={style.sliderImgBlock}>
                            <img className="animate__animated animate__fadeInRight animate__fast" src={slider[numSlider].img} alt={slider[numSlider].name2} />
                            <img className={ "animate__animated animate__fadeIn animate__slow"} style={{position:'absolute'}} src={nike} alt="Air max Flyknit Racer" />
                        </div>
                        <div className={style.btnPointFlex}>
                            {slider.map((item) => 
                            <div className={style.boxBtnSlider} key={item.id}>
                                { item.id === numSlider ?
                                    <svg width="16" height="16" viewBox="0 0 250 250" className="circular-progress">
                                        <circle className="bg"></circle>
                                        <circle className="fg"></circle>    
                                    </svg>
                                    : ''
                                }
                                <button onClick={() => setNumSlidder(item.id)} className={numSlider === item.id ? style.btnPoint : style.btnPointNoneActive}></button>
                            </div>    
                            )}
                        </div>
                    </div> 
                    <div className={style.btnBigFlex}>
                        <div className={style.btnPointMedia}>
                                {slider.map((item) => 
                                <div className={style.boxBtnSlider} key={item.id}>
                                    { item.id === numSlider ?
                                        <svg width="16" height="16" viewBox="0 0 250 250" className="circular-progress">
                                            <circle className="bg"></circle>
                                            <circle className="fg"></circle>    
                                        </svg>
                                        : ''
                                    }
                                    <button onClick={() => setNumSlidder(item.id)} className={numSlider === item.id ? style.btnPoint : style.btnPointNoneActive}></button>
                                </div>    
                                )}
                        </div> 
                    </div>
            </div>
        </div>
        
    )
}

export default SliderTop