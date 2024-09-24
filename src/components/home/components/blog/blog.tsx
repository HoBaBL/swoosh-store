import { useEffect, useState } from "react"
import { LiaLongArrowAltRightSolid, LiaLongArrowAltLeftSolid } from "react-icons/lia";
import style from './blog.module.css'
import { Link } from "react-router-dom";

const Blog = () => {
    const [blog, setBlog] = useState<{
        id: string,
        name:string,
        date: string,
        img: string,
        categories:string
    }[]>([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`https://66b4c4049f9169621ea44441.mockapi.io/blog`)
        .then((res) => {
            return res.json()
        })
        .then((arr) => {
            setBlog(arr)
            setLoading(true)
        })
    },[])

    const [num, setNum] = useState(0)

    function previousSlide() {
        if (num === 0) {
            setNum(6)
            
        } else {
            setNum(num-1)
        } 
    }

    function nextSlide() {
        if (num < 6) {
            setNum(num+1)
        } else if (num===6) {
            setNum(0)
        } 
    }

    return (
        <div className={style.container}>
            <div className={style.flexlastText}>
                <h2 className={style.h2}>
                    Последние публикации
                </h2>
                <div className={style.arrowFlex}>
                    <button disabled={num===0} className={style.btnArrowLast} onClick={() => previousSlide()}><LiaLongArrowAltLeftSolid size={30}/></button>
                    <button disabled={num===6} className={style.btnArrowLast} onClick={() => nextSlide()}><LiaLongArrowAltRightSolid size={30}/></button>
                </div>
            </div>
            <div  className={style.blogflexBlock}>
                {loading ? 
                    blog.map((item) => 
                        <Link key={item.id} to={`blog/article/${item.id}`}>
                            <div  style={{ transform: `translateX(-${num * 103}%)` }} className={style.blogBoxPosition}>
                                <div className={style.blogBox} style={{backgroundImage: `url(${item.img})`}}></div>
                                <div className={style.textBlock}>
                                        <div style={{flex:0}}>
                                            <div className={style.blockInfo}>{item.categories}</div>
                                            <p className={style.text}>{item.name}</p>
                                        </div>
                                        <div className={style.blogFlex}>
                                            <button className={style.blogBtn}>Подробнее</button>
                                            <p className={style.blogDate}>10 Августа 2023</p>
                                        </div>
                                    </div>
                            </div>
                        </Link>
                    )
                    :
                    'Загрузка' 
                }
            </div>
        </div>
    )
}

export default Blog