import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from 'axios'
import style from './blog.module.css'
import Header from "../header/header";
import Footer from "../footer/footer";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { setBlogMenu } from "../../redux/slice/blogMenu";

type ArticleType = {
    name:string,
    date: string,
    img: string,
    id: string,
    categories: string
}


const ArticleBlog = () => {
    const [article, setArticle] = useState<ArticleType>()
    const { id } = useParams()
    const navigate = useNavigate();
    const [blogFull, setBlogFull] = useState<{
        id: string,
        name:string,
        date: string,
        img: string, 
        categories:string
    }[]>([])
    const dispatch = useAppDispatch()


    useEffect(() => {
        async function fetchArticle() {
            try {
                const {data} = await axios.get('https://66b4c4049f9169621ea44441.mockapi.io/blog/'+ id)
                setArticle(data)
                
            } catch (error) {
                alert('Ошибка при получении продукта')
                navigate("/blog")
            }
        }

        fetchArticle()
        window.scrollTo(0, 0)
    },[id])

    useEffect(() => {
        fetch(`https://66b4c4049f9169621ea44441.mockapi.io/blog`)
        .then((res) => {
            return res.json()
        })
        .then((arr) => {
            setBlogFull(arr)
        })
    },[])

    if (!article) {
        return <div className={style.container}>Загрузка...</div>;
    }

    return (
        <>
            <Header/>
            <div className={style.container}>
                <div className={style.grayFlex}>
                    <span className={style.grayText}>Swoosh Store</span>
                    <LiaLongArrowAltRightSolid color='rgb(134, 134, 134)'/>
                    <span style={{color:'black'}} className={style.grayText}>Блог</span>
                </div>
                <div className={style.articleFlex}>
                    <div style={{maxWidth:'1015px'}}>
                        <h2 className={style.h2}>
                            {article.name}
                        </h2>
                        <div className={style.flexbox}>
                            <div className={style.blockInfo}>{article.categories}</div>
                            <p style={{color:'#4F4F4F'}} className={style.blogDate}>{article.date}</p>
                        </div>
                        <div className={style.articleTextBlock}>
                            <p className={style.articleText}>Подбор обуви для повседневной носки – важный аспект, который определяет комфорт и стильность вашего образа. Среди множества вариантов обуви кроссовки занимают особое место. С их появлением в спортивной индустрии кроссовки перешли долгий путь от специализированной спортивной обуви к популярному элементу гардероба. В данной статье мы рассмотрим плюсы и минусы использования кроссовок в качестве повседневной обуви.</p>
                            <img src="../../../public/img/crosi.png" alt="" />
                            <h3 className={style.articleH3}>Плюсы</h3>
                            <p className={style.articleTextNorm}>
                                <span className={style.articleSpan}>Комфорт и поддержка:</span> Кроссовки изначально разрабатывались для активных видов спорта, таких как бег и тренировки. Это означает, что они обеспечивают хорошую амортизацию и поддержку стопы. Когда вы носите кроссовки как повседневную обувь, вы получаете высокий уровень комфорта даже в течение долгого времени.
                                <br />
                                <br />
                                <span className={style.articleSpan}>Стиль и разнообразие:</span> Современные кроссовки предлагают огромное разнообразие дизайнов, цветов и стилей. Они могут быть идеальным дополнением к различным нарядам, от спортивных до повседневных и даже некоторых более формальных.
                                <br />
                                <br />
                                <span className={style.articleSpan}>Прочность и долговечность:</span> Кроссовки, как правило, изготовлены из высококачественных материалов, которые позволяют им выдерживать активное использование. Это делает их долговечными и позволяет сохранить первоначальный вид на протяжении длительного времени.
                                <br />
                                <br />
                                <span className={style.articleSpan}>Активный образ жизни:</span> Если ваш образ жизни активен и включает в себя физические нагрузки или даже длительные прогулки, кроссовки могут быть идеальным выбором. Они поддерживают вашу стопу и способствуют комфортному передвижению.
                            </p>
                            <h3 className={style.articleH3}>Минусы</h3>
                            <p className={style.articleTextNorm}>
                                <span className={style.articleSpan}>Неформальность:</span> Хотя современные кроссовки стали более стильными, они всё равно часто ассоциируются с неформальностью. В некоторых профессиональных или формальных ситуациях кроссовки могут быть неуместны.
                                <br />
                                <br />
                                <span className={style.articleSpan}>Ограниченная вентиляция:</span>  В зависимости от модели и материалов, кроссовки могут обладать ограниченной вентиляцией. Это может привести к неприятному запаху ног и дискомфорту в жаркую погоду.
                                <br />
                                <br />
                                <span className={style.articleSpan}>Неидеально подходящие для определенных видов образов:</span>  В некоторых стилях одежды кроссовки могут выглядеть неподходяще. Например, при носке формальных или классических нарядов.
                                <br />
                                <br />
                                <span className={style.articleSpan}>Износ подошвы:</span>  Если кроссовки активно используются как повседневная обувь, их подошва может быстрее изнашиваться по сравнению с другими типами обуви. Это может потребовать более частой замены пары.
                            </p>
                            <h3 className={style.articleH3}>Выводы</h3>
                            <p className={style.articleTextNorm}>
                                Кроссовки как повседневная обувь имеют как свои плюсы, так и минусы. Они обеспечивают высокий уровень комфорта, стильный внешний вид и подходят для активного образа жизни. Однако их неформальный характер и ограниченная подходящесть к некоторым стилям нарядов могут стать ограничениями. Важно сбалансировать выбор обуви в зависимости от конкретных ситуаций и предпочтений, чтобы сочетать стиль, комфорт и функциональность.
                            </p>
                        </div>
                    </div>
                    <div className={style.categories}>
                        <div className={style.categoriesCategories}>
                            <p className={style.categoriesTextMax}>Рубрики</p>
                            <div>
                                <Link to={'/blog'}>
                                    <button onClick={() => dispatch(setBlogMenu(''))} className={style.categoriesFlexText}>
                                        <p className={style.categoriesText}>все публикации</p>
                                        <span className={style.categoriesNum}>{blogFull.length}</span>
                                    </button>
                                </Link>
                                <div className={style.line}></div>
                                    <Link to={'/blog'}>
                                        <button onClick={() => dispatch(setBlogMenu('новости'))} className={style.categoriesFlexText}>
                                            <p className={style.categoriesText}>Новости</p>
                                            <span className={style.categoriesNum}>{blogFull.filter((i) => i.categories === "новости").length}</span>
                                        </button>
                                    </Link>
                                        
                                        <div className={style.line}></div>
                                        <Link to={'/blog'}>
                                            <button onClick={() => dispatch(setBlogMenu('статьи'))} className={style.categoriesFlexText}>
                                                <p className={style.categoriesText}>Статьи</p>
                                                <span className={style.categoriesNum}>{blogFull.filter((i) => i.categories === "статьи").length}</span>
                                            </button>
                                        </Link>
                                        
                                        <div className={style.line}></div>
                                        <Link to={'/blog'}>
                                            <button onClick={() => dispatch(setBlogMenu('советы'))} className={style.categoriesFlexText}>
                                                <p className={style.categoriesText}>Советы</p>
                                                <span className={style.categoriesNum}>{blogFull.filter((i) => i.categories === "советы").length}</span>
                                            </button>
                                        </Link>
                                        
                                        <div className={style.line}></div>
                                        <Link to={'/blog'}>
                                            <button onClick={() => dispatch(setBlogMenu('обзоры'))} className={style.categoriesFlexText}>
                                                <p className={style.categoriesText}>Обзоры</p>
                                                <span className={style.categoriesNum}>{blogFull.filter((i) => i.categories === "обзоры").length}</span>
                                            </button>
                                        </Link>
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
                
                
                
            </div>
            <Footer/>
        </>
        
    )
}

export default ArticleBlog