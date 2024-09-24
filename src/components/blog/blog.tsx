import { useEffect, useState } from "react"
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import style from './blog.module.css'
import Header from "../header/header";
import Footer from "../footer/footer";
import { Link } from "react-router-dom";
import { setBlogMenu } from "../../redux/slice/blogMenu";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from "../../hooks";

const Blog = () => {
    const [blog, setBlog] = useState<{
        id: string,
        name:string,
        date: string,
        img: string, 
        categories:string
    }[]>([])
    const [blogFull, setBlogFull] = useState<{
        id: string,
        name:string,
        date: string,
        img: string, 
        categories:string
    }[]>([])

    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const blogMenu = useSelector((state: RootState) => state.blogMenu.blogMenu) /// для вкладки Избранное

    useEffect(() => {
        fetch(`https://66b4c4049f9169621ea44441.mockapi.io/blog?categories=${blogMenu}`)
        .then((res) => {
            return res.json()
        })
        .then((arr) => {
            setBlog(arr)
            setLoading(true)
        })
    },[blogMenu])

    useEffect(() => {
        fetch(`https://66b4c4049f9169621ea44441.mockapi.io/blog`)
        .then((res) => {
            return res.json()
        })
        .then((arr) => {
            setBlogFull(arr)
            setLoading(true)
        })
    },[])

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    return (
        <>
            <Header/>
            <div className={style.container}>
                <div className={style.grayFlex}>
                    <span className={style.grayText}>Swoosh Store</span>
                    <LiaLongArrowAltRightSolid color='rgb(134, 134, 134)'/>
                    <span style={{color:'black'}} className={style.grayText}>Блог</span>
                    { blogMenu !== '' 
                        ?
                        <>
                            <LiaLongArrowAltRightSolid color='rgb(134, 134, 134)'/>
                            <span style={{color:'black'}} className={style.grayText}>{blogMenu}</span>
                        </>
                        : ''
                    }
                    
                </div>
                <h2 className={style.h2}>
                    Блог
                </h2>
                <div>
                    {loading ? 
                        <div className={style.flexContainer}>
                            <div className={style.blogflexBlock}>
                                {
                                blog.map((item) => 
                                    <Link to={`article/${item.id}`} key={item.id} className={style.blogBoxPosition}>
                                        <div className={style.blogBox} style={{backgroundImage: `url(${item.img})`}}></div>
                                        <div className={style.textBlock}>
                                                <div style={{flex:0}}>
                                                    <div className={style.blockInfo}>{item.categories}</div>
                                                    <p className={style.text}>{item.name}</p>
                                                </div>
                                                <div className={style.blogFlex}>
                                                    <button className={style.blogBtn}>Подробнее</button>
                                                    <p className={style.blogDate}>{item.date}</p>
                                                </div>
                                            </div>
                                    </Link>
                                )}
                            </div>
                            <div className={style.categories}>
                        <div className={style.categoriesCategories}>
                            <p className={style.categoriesTextMax}>Рубрики</p>
                            <div>
                                <button onClick={() => dispatch(setBlogMenu(''))} className={style.categoriesFlexText}>
                                    <p className={style.categoriesText}>все публикации</p>
                                    <span className={style.categoriesNum}>{blogFull.length}</span>
                                </button>
                                <div className={style.line}></div>
                                    <Link to={'/blog'}>
                                        <button onClick={() => dispatch(setBlogMenu('новости'))} className={style.categoriesFlexText}>
                                            <p className={style.categoriesText}>Новости</p>
                                            <span className={style.categoriesNum}>{blogFull.filter((i) => i.categories === "новости").length}</span>
                                        </button>
                                    </Link>
                                        
                                        <div className={style.line}></div>
                                        <button onClick={() => dispatch(setBlogMenu('статьи'))} className={style.categoriesFlexText}>
                                            <p className={style.categoriesText}>Статьи</p>
                                            <span className={style.categoriesNum}>{blogFull.filter((i) => i.categories === "статьи").length}</span>
                                        </button>
                                        <div className={style.line}></div>
                                        <button onClick={() => dispatch(setBlogMenu('советы'))} className={style.categoriesFlexText}>
                                            <p className={style.categoriesText}>Советы</p>
                                            <span className={style.categoriesNum}>{blogFull.filter((i) => i.categories === "советы").length}</span>
                                        </button>
                                        <div className={style.line}></div>
                                        <button onClick={() => dispatch(setBlogMenu('обзоры'))} className={style.categoriesFlexText}>
                                            <p className={style.categoriesText}>Обзоры</p>
                                            <span className={style.categoriesNum}>{blogFull.filter((i) => i.categories === "обзоры").length}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={style.grayBox}>
                                    <p className={style.grayBoxTextMax}>Подпишитесь на рассылку</p>
                                    <p className={style.grayBoxText}>Регулярные скидки и спецпредложения, а так же новости компании.</p>
                                    <input className={style.grayBoxInput} placeholder="Ваш Email" type="text" />
                                    <button className={style.btnBlack}>Подписаться</button>
                                    <p className={style.grayBoxMiniText}>Согласен с политикой <br /> конфиденциальности</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div style={{height:'1400px'}}>'Загрузка'</div>
                    }
                </div>
            </div>
            <Footer/>
        </>
        
    )
}

export default Blog