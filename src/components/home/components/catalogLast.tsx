import { FC, useState } from "react"
import style from '../home.module.css'
import { SlHandbag } from "react-icons/sl";
import { LiaLongArrowAltRightSolid, LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAppDispatch } from "../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { addProductFavorite } from "../../../redux/slice/favorite";

type Catalog = {
    miniCatalog: SneakersType[],
    text:string,
}

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


const CatalogLast:FC<Catalog> = ({miniCatalog, text}) => {
    const [num, setNum] = useState(0)
    const dispatch = useAppDispatch()
    const Favorite = useSelector((state: RootState) => state.Favorite.Favorite) /// для вкладки Избранное

    function previousSlide() {
        if (num === 0) {
            setNum(3)
            
        } else {
            setNum(num-1)
        } 
    }

    function nextSlide() {
        if (num < 3) {
            setNum(num+1)
        } else if (num===3) {
            setNum(0)
        } 
    }

    function addFavorite(sneakers:SneakersType, event:any) {
        event.preventDefault()
        dispatch(addProductFavorite(sneakers))
    }

    return (
        <div className={style.container}>
            <div className={style.flexlastText}>
                <h2 className={style.h2}>
                    {text}
                </h2>
                <div className={style.arrowFlex}>
                    <button disabled={num===0} className={style.btnArrowLast} onClick={() => previousSlide()}><LiaLongArrowAltLeftSolid size={30}/></button>
                    <button disabled={num===3} className={style.btnArrowLast} onClick={() => nextSlide()}><LiaLongArrowAltRightSolid size={30}/></button>
                </div>
            </div>
            
            <div className={style.sliderLast}>
                {miniCatalog.map((sneakers) => 
                <Link key={sneakers.id} to={`/store/sneakers/${sneakers.id}`}>
                    <div >
                        <div style={{ transform: `translateX(-${num * 104}%)` }} key={sneakers.id} className={style.product}>
                        <button onClick={(event) => addFavorite(sneakers, event)} className={style.heart}>{Favorite.length > 0 ? Favorite.includes(sneakers) ? <FaHeart size={22}/> : <FaRegHeart size={22}/> : <FaRegHeart size={22}/> }</button>
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
                    </div>
                </Link>
                
                )}
            </div>
        </div>
        
    )
}

export default CatalogLast