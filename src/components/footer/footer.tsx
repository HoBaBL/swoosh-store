import style from './footer.module.css'
import Logo from '../../assets/logoFooter.png'
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";

const Footer = () => {

    return (
        <div className={style.footerPosition}>
            <div className={style.container}>
                <div className={style.footerFlex}>
                    <div>
                        <div className={style.footerLogoPosition}>
                            <img src={Logo} alt="logo" />
                            <div className={style.footerLogoPositionFlex}>
                                <span className={style.footerLogoText}>SWOOSH</span>
                                <span className={style.footerLogoTextOrg}>STORE</span>
                            </div>
                        </div>
                        <div className={style.instFlex}>
                            <div className={style.inst}>
                                <FaInstagram size={20}/>
                            </div>
                            <div className={style.inst}>
                                <SlSocialVkontakte size={20}/>
                            </div>
                            <div className={style.inst}>
                                <FaTwitter size={20}/>
                            </div>
                        </div>
                    </div>
                    <div className={style.flexFooter}>
                        <div className={style.menu}>
                            <p className={style.footerInfo}>Информация</p>
                            <a className={style.footerText}>О магазине</a>
                            <a className={style.footerText}>Наш блог</a>
                            <a className={style.footerText}>Доставка</a>
                            <a className={style.footerText}>Оплата</a>
                            <a className={style.footerText}>Контакты</a>
                        </div>
                        <div className={style.menu}>
                            <p className={style.footerInfo}>Товары</p>
                            <a className={style.footerText}>Каталог</a>
                            <a className={style.footerText}>Мужские</a>
                            <a className={style.footerText}>Женские</a>
                            <a className={style.footerText}>Детские</a>
                            <a className={style.footerText}>Распродажа</a>
                        </div>
                        <div className={style.menu}>
                            <p className={style.footerInfo}>Магазин</p>
                            <a className={style.footerText}>Личный кабинет</a>
                            <a className={style.footerText}>Избранное</a>
                            <a className={style.footerText}>Корзина</a>
                        </div>
                        <div className={style.menuFlex}>
                            <p className={style.footerInfo}>Подписка на новости</p>
                            <p style={{cursor:'default'}} className={style.footerText}>Подпишитесь на новости и скидки</p>
                            <div style={{display:'flex'}}>
                                <input placeholder='Email' className={style.footerInput} type="text" />
                                <button className={style.btn}>Подписаться</button>
                            </div>
                            
                        </div>

                    </div>
                    
                </div>
                <div className={style.flexfooterBlin}>
                    <div className={style.flexFooterMin}>
                        <div className={style.menuMin}>
                            <p className={style.footerInfo}>Информация</p>
                            <a className={style.footerText}>О магазине</a>
                            <a className={style.footerText}>Наш блог</a>
                            <a className={style.footerText}>Доставка</a>
                            <a className={style.footerText}>Оплата</a>
                            <a className={style.footerText}>Контакты</a>
                        </div>
                        <div className={style.menuMin}>
                            <p className={style.footerInfo}>Товары</p>
                            <a className={style.footerText}>Каталог</a>
                            <a className={style.footerText}>Мужские</a>
                            <a className={style.footerText}>Женские</a>
                            <a className={style.footerText}>Детские</a>
                            <a className={style.footerText}>Распродажа</a>
                        </div>
                        <div className={style.menuMin}>
                            <p className={style.footerInfo}>Магазин</p>
                            <a className={style.footerText}>Личный кабинет</a>
                            <a className={style.footerText}>Избранное</a>
                            <a className={style.footerText}>Корзина</a>
                        </div>
                        <div className={style.menuFlex}>
                            <p className={style.footerInfo}>Подписка на новости</p>
                            <p style={{cursor:'default'}} className={style.footerText}>Подпишитесь на новости и скидки</p>
                            <div style={{display:'flex'}}>
                                <input placeholder='Email' className={style.footerInput} type="text" />
                                <button className={style.btn}>Подписаться</button>
                            </div>
                            
                        </div>

                    </div>
                    <div className={style.menuFlexFlex}>
                        <div>
                            <p className={style.footerInfo}>Подписка на новости</p>
                            <p style={{cursor:'default'}} className={style.footerText}>Подпишитесь на новости и скидки</p>
                        </div>
                        <div style={{display:'flex'}}>
                            <input placeholder='Email' className={style.footerInput} type="text" />
                            <button className={style.btn}>Подписаться</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Footer