import style from '../home.module.css'
import { GoArrowRight } from "react-icons/go";
import fon from '../img/footerFon.png'
import { Link } from 'react-router-dom';
import img1 from '../img/crosiFon.png'
import img2 from '../img/womenFon.png'

const HomeFooter = () => {

    return (
        <div>
            <div className={style.container}>
                <div className={style.footerFlex}>
                    <Link to={`/store/catalog`} className={style.footerBox}>
                        <div style={{backgroundImage: img1}} className={style.footerImg}></div>
                        <div className={style.footerTextPosition}>
                            <p className={style.footerText}>Новая коллекция в каталоге Nike Air Max Solo</p>
                            <button className={style.blogBtn}>Перейти в каталог</button>
                        </div>
                    </Link>
                    <Link to={`/store/catalog`} className={style.footerBox}>
                        <div style={{backgroundImage: img2}} className={style.footerImg1}></div>
                        <div className={style.footerTextPosition}>
                            <p className={style.footerText}>Новая коллекция в каталоге Nike Air Max Solo</p>
                            <button className={style.blogBtn}>Перейти в каталог</button>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={style.container}>
                <div className={style.containerBig}>
                    <div className={style.textFooterPosition}>
                        <h3 className={style.footerH3}>Интернет-магазин Swoosh store</h3>
                        <p >Добро пожаловать в <span className={style.footerTextMini}>Swoosh Store</span> – ваш источник подлинных кроссовок Nike и непревзойденного стиля! Мы рады представить вам уникальную онлайн-платформу, где вы сможете окунуться в мир инноваций и моды от легендарного бренда спортивной обуви.</p>
                        <p className={style.footerTextMini}>Легендарное наследие Nike:</p>
                        <p>Swoosh Store - это место, где история и стиль сливаются воедино. Мы гордимся тем, что предлагаем вам только оригинальные кроссовки Nike, продукцию, которая воплощает более чем полувековое наследие инноваций, комфорта и качества. Каждая пара кроссовок – это не просто спортивная обувь, это произведение искусства, воплощающее дух победы и страстную преданность активному образу жизни.</p>
                        <Link to={'/blog'} className={style.moreDetailed}>Подробнее <span className={style.moreDetailedVektor}><GoArrowRight size={18}/></span></Link>
                    </div>
                    <div>
                        <img className={style.fonImgFooter} src={fon} alt="" />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default HomeFooter