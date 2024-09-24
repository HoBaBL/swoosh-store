import style from './basket.module.css'
import Footer from '../footer/footer'
import CatalogLast from '../home/components/catalogLast'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from "react-router-dom";
import { GoArrowRight} from "react-icons/go";
import { TbTrashX } from "react-icons/tb";
import { useAppDispatch } from '../../hooks';
import { PlusProduct } from '../../redux/slice/cart';
import { MinusProduct } from '../../redux/slice/cart';
import { deleteProduct } from '../../redux/slice/cart';

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

const Basket = () => {
    const [catalogFull, setCatalogFull] = useState<SneakersType[]>([])
    const Cart = useSelector((state: RootState) => state.Cart.Cart)
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetch(`https://66b4c4049f9169621ea44441.mockapi.io/store`)
        .then((res) => {
            return res.json()
        })
        .then((arr) => {
            setCatalogFull(arr)
        })
    },[])

    const miniCatalogLast = catalogFull.slice(6,12)
    const text2 = 'Возможно вас заинтересует'

    let sum = 0
    for (let i = 0; Cart.length > i; i++) {
        sum = sum + Number(Cart[i].price)  * Cart[i].count
    }

    return (
        <div>
            <div className={style.container}>
                <div className={style.textGrayFlex}>
                    <p className={style.textGray}>Swoosh Store</p>
                    <LiaLongArrowAltRightSolid color='rgb(134, 134, 134)'/>
                    <p style={{color:'rgb(67, 67, 67)'}} className={style.textGray}>Корзина товаров</p>
                </div>
                <h1 className={style.h1}>Корзина товаров</h1>
                <div>
                    {Cart.length > 0 ?
                        <div className={style.flexBasket}>
                            <table className={style.table}>
                                <thead className={style.thead}>
                                    <tr>
                                        <th style={{width:'356px'}} className={style.th}>Товар</th>
                                        <th style={{width:'124px'}} className={style.th1}>Цена</th>
                                        <th style={{width:'176px'}} className={style.th1}>Количество</th>
                                        <th style={{width:'126px'}} className={style.th1}>Сумма</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Cart.map((item) => 
                                        <tr key={item.id}>
                                            <th className={style.thWhite}>
                                                <Link className={style.tableBodyFlex} to={`/store/sneakers/${item.link}`}>
                                                    <img width={'90px'} height={'90px'} src={item.img} alt="" />
                                                    <div className={style.tableFlex}>
                                                        <p className={style.tableText}>{item.name}</p>
                                                        <p className={style.textSize}>Размер: {item.size}</p>
                                                    </div>
                                                </Link>
                                            </th>
                                            <th className={style.thWhite}>
                                                <p className={style.price}>{item.price} ₽</p>
                                            </th>
                                            <th className={style.thWhite}>
                                                <div className={style.counter}>
                                                    <button onClick={() => dispatch(MinusProduct(item))} className={style.counterBtn}>-</button>
                                                    <span className={style.counterText}>{item.count}</span>
                                                    <button onClick={() => dispatch(PlusProduct(item))} className={style.counterBtn}>+</button>
                                                </div>
                                            </th>
                                            <th className={style.thWhite}>
                                                <div className={style.flexTrash}>
                                                    <p className={style.price}>{item.count * Number(item.price)} ₽</p>
                                                    <button onClick={() => dispatch(deleteProduct(item))} className={style.trashBtn}>
                                                        <TbTrashX color='rgb(173, 173, 173)' size={22}/>
                                                    </button>
                                                    
                                                </div>
                                            </th>
                                        </tr>
                                    )

                                    }
                                </tbody>
                            </table>
                            <div className={style.tableMin} style={{width:'100%'}}>
                                {Cart.map((item) => 
                                    <div className={style.boxProduct} key={item.id}>
                                        <div className={style.thWhite}>
                                            <Link className={style.tableBodyFlex} to={`/store/sneakers/${item.link}`}>
                                                <img width={'90px'} height={'90px'} src={item.img} alt="" />
                                                <div className={style.tableFlex}>
                                                    <p className={style.tableText}>{item.name}</p>
                                                    <p className={style.textSize}>Размер: {item.size}</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className={style.flexFlex}>
                                            <div className={style.thWhite}>
                                                <p className={style.price}>{item.price} ₽</p>
                                            </div>
                                            <div className={style.thWhite}>
                                                <div className={style.counter}>
                                                    <button onClick={() => dispatch(MinusProduct(item))} className={style.counterBtn}>-</button>
                                                    <span className={style.counterText}>{item.count}</span>
                                                    <button onClick={() => dispatch(PlusProduct(item))} className={style.counterBtn}>+</button>
                                                </div>
                                            </div>
                                            <div className={style.thWhite}>
                                                <div className={style.flexTrash}>
                                                    <button onClick={() => dispatch(deleteProduct(item))} className={style.trashBtn}>
                                                        <TbTrashX color='rgb(173, 173, 173)' size={22}/>
                                                    </button>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                        
                                    </div>
                                )

                                }
                            </div>
                            <div>
                                <div className={style.sumBlock}>
                                    <p className={style.sumMaxText}>Итог</p>
                                    <div className={style.sumFlex}>
                                        <p>Сумма</p>
                                        <div className={style.lineSum}></div>
                                        <p className={style.sumPrice}>{sum} ₽</p>
                                    </div>
                                    <input className={style.sumInput} placeholder='Промокод' type="text" />
                                    <button className={style.btnPromo}>Применить промокод</button>
                                    <button className={style.moreDetailedBlack}>
                                        Оформить заказ
                                        <span className={style.moreDetailedVektorBlack}><GoArrowRight size={18}/></span>
                                    </button>
                                </div>

                            </div>
                            
                        </div>
                        :
                        <div className={style.nonePosition}>
                            <div className={style.heartBox}>    
                                <img className={style.sad} src="../../../img/sad.png" alt="" />
                            </div>
                            <p className={style.textBig}>Ваша корзина на данный момент пуста</p>
                            <p className={style.textNone}>Прежде чем приступить к оформлению заказа, вы должны добавить некоторые <br /> товары в корзину. На странице <span className={style.span}>"Каталог"</span> вы найдете много интересных товаров.</p>
                            <Link className={style.moreDetailed} to={'/store/catalog'}>
                                Подробнее <span className={style.moreDetailedVektor}><GoArrowRight size={18}/></span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
            <div style={{marginBottom:'70px'}}>
                <CatalogLast miniCatalog={miniCatalogLast} text={text2}/>
            </div>
            
            <Footer/>
        </div>
        
    )
}

export default Basket