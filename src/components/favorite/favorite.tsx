import style from './favorite.module.css'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import Footer from '../footer/footer';
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from "react-router-dom";
import { SlHandbag } from "react-icons/sl";
import { useAppDispatch } from '../../hooks';
import { addProductFavorite } from '../../redux/slice/favorite';
import { GoArrowRight} from "react-icons/go";
import { useEffect } from 'react';

type SneakersType = {
    id: string,
    name:string,
    size: number[],
    price: string,
    description:string,
    specifications: string[],
    photo: string[],
    gender: string,
    count: number
}

const Favorite = () => {
    const Favorite = useSelector((state: RootState) => state.Favorite.Favorite)
    const dispatch = useAppDispatch()

    function addFavorite(sneakers:SneakersType, event:any) {
        event.preventDefault()
        dispatch(addProductFavorite(sneakers))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    return (
        <div>
            <div className={style.container}>
                <div className={style.textGrayFlex}>
                    <p className={style.textGray}>Swoosh Store</p>
                    <LiaLongArrowAltRightSolid color='rgb(134, 134, 134)'/>
                    <p style={{color:'rgb(67, 67, 67)'}} className={style.textGray}>Избранные товары</p>
                </div>
                <h1 className={style.h1}>Избранные товары</h1>
                    {
                        Favorite.length > 0 ?
                            <div className={style.store}> {
                                Favorite.map((sneakers) => 
                                    <Link key={sneakers.id} to={`/store/sneakers/${sneakers.id}`}>
                                        <div className={style.product}>
                                            <button onClick={(event) => addFavorite(sneakers, event)} className={style.heart}><FaHeart size={22}/></button>
                                            <img className={style.productImg} src={sneakers.photo[0]} alt="" />
                                            <div className={style.textBox}>
                                                <p className={style.gender}>{sneakers.gender}</p>
                                                <p className={style.name}>{sneakers.name}</p>
                                                <div className={style.pricePosition}>
                                                    <p className={style.name}>{sneakers.price} ₽</p>
                                                    <button className={style.btnBag}><SlHandbag size={24}/></button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                            : 
                            <div className={style.nonePosition}>
                                <div className={style.heartBox}>    
                                    <img src="../../../img/sad.png" alt="" />
                                </div>
                                <p className={style.textBig}>Ваш список желаний пуст</p>
                                <p className={style.textNone}>У вас пока нет товаров в списке желаний. <br /> На странице <span className={style.span}>"Каталог"</span> вы найдете много интересных товаров.</p>
                                <Link className={style.moreDetailed} to={'/store/catalog'}>
                                    Подробнее <span className={style.moreDetailedVektor}><GoArrowRight size={18}/></span>
                                </Link>
                            </div>
                    }
                
            
            </div>
            
            <Footer/>
        </div>
    )
}

export default Favorite