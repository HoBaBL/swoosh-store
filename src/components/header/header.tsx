import style from './header.module.css'
import { LuUser } from "react-icons/lu";
import { SlMagnifier } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { SlHandbag } from "react-icons/sl";
import Logo from '../../assets/logo.png'
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch } from '../../hooks';
import { setMenu } from '../../redux/slice/menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { RxCross1 } from "react-icons/rx";

const Header = () => {
    const [modal, setModal] = useState(false)
    const dispatch = useAppDispatch()
    const Favorite = useSelector((state: RootState) => state.Favorite.Favorite)
    const Cart = useSelector((state: RootState) => state.Cart.Cart)

    function genderFilter(item:string) {
        dispatch(setMenu(item))
        localStorage.setItem('gender', item)
    }

    return (
        <div>
            <div className={style.header}>
                {/* <div className={style.minMenuPosition}>
                    <div className={style.minMenuFlex}>
                        <p className={style.headerMinMenu}>О магазине</p>
                        <Link to={'/blog'} className={style.headerMinMenu}>Наш блог</Link>
                        <p className={style.headerMinMenu}>Доставка</p>
                        <p className={style.headerMinMenu}>Оплата</p>
                        <p className={style.headerMinMenu}>Контакты</p>
                        <p className={style.headerMinMenu}>Индивидуальные заказы</p>
                    </div>
                    <div className={style.btnLoginFlex}>
                        <button className={style.btnLogin}>
                            <LuUser size={18}/>Вход
                        </button>
                        \
                        <button className={style.btnLogin}>
                            Регистрация
                        </button>
                    </div>
                </div> */}
                <div className={style.headerMenu}>
                    <div className={style.bigMenuPosition}>
                        <div className={style.imgPosition}>
                            <Link to={'/'}>
                                <img src={Logo} alt="logo" />
                            </Link>
                        </div>
                        <div className={style.menuPosition}>
                            <Link onClick={() => {genderFilter(''), setModal(false)}} to={'/store/catalog'}>
                                <p className={style.headerMenuText}>Каталог</p>
                            </Link>
                            <Link onClick={() => {genderFilter('мужские'), setModal(false)}} to={'/store/catalog?gender=мужские'}>
                                <p className={style.headerMenuText}>Мужские</p>
                            </Link>
                            <Link onClick={() => {genderFilter('женские'), setModal(false)}} to={'/store/catalog?gender=женские'}>
                                <p className={style.headerMenuText}>Женские</p>
                            </Link>
                            <Link onClick={() => {genderFilter(''), setModal(false)}} to={'/store/catalog'}>
                                <p className={style.headerMenuText}>Детские</p>
                            </Link>
                            <Link onClick={() => {genderFilter(''), setModal(false)}} to={'/store/catalog'}>
                                <p className={style.headerMenuText}>Распродажа</p>
                            </Link>
                        </div>
                        <div onClick={() => setModal(true)} className={style.miniMenu}>
                            <GiHamburgerMenu size={20}/>
                            <p className={style.headerMenuText}>Меню</p>
                        </div>
                        <div className={style.imgFlex}>
                            <div className={style.imgBoxLup}>
                                <SlMagnifier size={22}/>
                            </div>
                            <div className={style.imgBox}>
                                { Favorite.length > 0 ? 
                                    <div className={style.count}>{Favorite.length}</div> : ''
                                }
                                <Link onClick={() => setModal(false)} to={'/store/favorite'} className={style.linkAnim}>
                                    <CiHeart size={26}/>
                                </Link>
                                
                            </div>
                            <div className={style.imgBox}>
                                { Cart.length > 0 ? 
                                    <div className={style.count}>{Cart.reduce((acc, item) => acc + item.count, 0)}</div> : ''
                                }
                                <Link onClick={() => setModal(false)} className={style.linkAnim} to={'/store/cart'}>
                                    <SlHandbag  size={22}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className={modal ? style.grayBlack : style.grayBlackNone} onClick={() => setModal(false)}>
                <div className={style.downdrop} onClick={e => e.stopPropagation()}>
                    <div className={style.crossPosition}>
                        <button onClick={() => setModal(false)} className={style.cross}>
                            <RxCross1 size={20}/>
                        </button>
                    </div>
                    <div className={style.downdropFlex} >
                        <div className={style.btnLoginFlex}>
                            <button className={style.btnLogin}>
                                <LuUser size={18}/>Вход
                            </button>
                            \
                            <button className={style.btnLogin}>
                                Регистрация
                            </button>
                        </div>
                        <div className={style.imgFlex}>
                            <div className={style.imgBox}>
                                { Favorite.length > 0 ? 
                                    <div className={style.count}>{Favorite.length}</div> : ''
                                }
                                <Link onClick={() => setModal(false)} to={'/store/favorite'} className={style.linkAnim}>
                                    <CiHeart size={26}/>
                                </Link>
                                
                            </div>
                            <div className={style.imgBox}>
                                { Cart.length > 0 ? 
                                    <div className={style.count}>{Cart.reduce((acc, item) => acc + item.count, 0)}</div> : ''
                                }
                                <Link onClick={() => setModal(false)} className={style.linkAnim} to={'/store/cart'}>
                                    <SlHandbag  size={22}/>
                                </Link>
                            </div>
                        </div>         
                    </div>
                    <div className={style.menuPositionColumn}>
                        <Link onClick={() => {genderFilter(''), setModal(false)}} to={'/store/catalog'}>
                            <p className={style.headerMenuTextDowmdrop}>Каталог</p>
                        </Link>
                        <Link onClick={() => {genderFilter('мужские'), setModal(false)}} to={'/store/catalog?gender=мужские'}>
                            <p className={style.headerMenuTextDowmdrop}>Мужские</p>
                        </Link>
                        <Link onClick={() => {genderFilter('женские'), setModal(false)}} to={'/store/catalog?gender=женские'}>
                            <p className={style.headerMenuTextDowmdrop}>Женские</p>
                        </Link>
                        <Link onClick={() =>{ genderFilter(''), setModal(false)}} to={'/store/catalog'}>
                            <p className={style.headerMenuTextDowmdrop}>Детские</p>
                        </Link>
                        <Link onClick={() => {genderFilter(''), setModal(false)}} to={'/store/catalog'}>
                            <p className={style.headerMenuTextDowmdrop}>Распродажа</p>
                        </Link>
                    </div>
                    <div className={style.minMenuFlexDowndrop}>
                        <p className={style.headerMinMenu}>О магазине</p>
                        <Link onClick={() => setModal(false)} to={'/blog'} className={style.headerMinMenu}>Наш блог</Link>
                        <p className={style.headerMinMenu}>Доставка</p>
                        <p className={style.headerMinMenu}>Оплата</p>
                        <p className={style.headerMinMenu}>Контакты</p>
                        <p className={style.headerMinMenu}>Индивидуальные заказы</p>
                    </div>
                </div>

            </div>
            
            <div>
                <Outlet />
            </div>
            
        </div>
        
    )
}

export default Header