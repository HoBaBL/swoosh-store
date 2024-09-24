import { useEffect, useState } from 'react'
import style from './product.module.css'
import { SlHandbag } from "react-icons/sl";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import CatalogLast from '../home/components/catalogLast';
import Footer from '../footer/footer';
import { useAppDispatch } from '../../hooks';
import { addProduct } from '../../redux/slice/cart';

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

const Product = () => {
    const [catalog, setCatalog] = useState<{
        id: string,
        name:string,
        size: number[],
        price: string,
        description:string,
        color: string[],
        materials: string[],
        collection: string,
        warranty: string,
        year: string,
        photo: string[],
        gender: string
    }>()
    const [catalogFull, setCatalogFull] = useState<SneakersType[]>([])
    const size = [35,36,37,38,39,40,41,42,43,44,45,46,47]
    const [activeSize, setActiveSize] = useState<number>(0)
    const [count, setCount] = useState(1)
    const [description, setDescription] = useState(true)
    const [photoIndex, setPhotoIndex] = useState(0)
    const [modal, setModal] = useState(false)
    const [sizeActive, setSizeActive] = useState(false)
    const [downdrop, setDowndrop] = useState(false)
    const dispatch = useAppDispatch()

    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const {data} = await axios.get('https://66b4c4049f9169621ea44441.mockapi.io/store/'+ id)
                setCatalog(data)
                
            } catch (error) {
                alert('Ошибка при получении продукта')
                navigate("/")
            }
        }

        fetchProduct()
        window.scrollTo(0, 0)
    },[id])

    useEffect(() => {
        fetch(`https://66b4c4049f9169621ea44441.mockapi.io/store`)
        .then((res) => {
            return res.json()
        })
        .then((arr) => {
            setCatalogFull(arr)
        })
    },[])

    if (!catalog) {
        return <div className={style.container}>Загрузка...</div>;
    }

    const miniCatalog = catalogFull.slice(0,6)
    const text1 = 'Похожие кроссовки'
    const miniCatalogLast = catalogFull.slice(6,12)
    const text2 = 'Возможно вас заинтересует'

    function addCart(id:string) {
        if (activeSize !== 0) {
            const product = {
                id: id+activeSize,
                img: catalog?.photo[0],
                size:activeSize,
                price: catalog?.price,
                name: catalog?.name,
                count: count,
                link:catalog?.id
            }
            dispatch(addProduct(product))
            setDowndrop(true)
        } else {
            setSizeActive(true)
        }
        
    }

    function otmena() {
        setDowndrop(false)
    }

    
    if (downdrop) {
        setTimeout(otmena, 5000)
    }
    

    return (
        <div key={id}>
            <div className={style.container}>
                <div className={downdrop ? style.downdrop : style.downdropNone}>
                    <p className={style.downdropText}>Добавлено в корзину</p>
                </div>
                    <div className={style.flexBox}>
                        <div>
                            <div className={style.fullImg}>
                                <img className={style.imgImg} src={catalog.photo[photoIndex]} alt="" />
                            </div>
                            
                            <div className={style.boxImg}>
                                {catalog.photo.map((item:any) => 
                                    <img className={style.imgMini} onMouseEnter={() => setPhotoIndex(catalog.photo.indexOf(item))} key={item} src={item} alt="" />
                                )}
                            </div>
                        </div>
                        <div className={style.textBlock}>
                            <h1 className={style.h1}>{catalog.name}</h1>
                            <div>
                                <div className={style.sizeFlex}>
                                    <p className={style.sizeText}>Размер(EU)</p>
                                    <button onClick={() => setModal(true)} className={style.sizeBtn}>Размерная таблица</button>
                                </div>
                                <div className={modal ? style.modalActive : style.modal} onClick={() => setModal(false)}>
                                    <div className={style.ModalContent} onClick={e => e.stopPropagation()}>
                                        <p className={style.modalH1}>Размерная таблица</p>
                                        <p className={style.modalText}>Вам понадобится сделать измерения с помощью линейки или сантиметровой ленты. Для определения нужного размера необходимо соотнести полученную длину с размерами в таблице.</p>
                                        <p className={style.modalText}>Поставьте ногу на чистый лист бумаги. Отметьте крайние границы ступни и измерьте расстояние между самыми дальними точками стопы.</p> 
                                        <p className={style.modalText}>Округление производится в большую сторону. Например если у вас получился результат 27,7 см, то его нужно округлить до длины которая есть в таблице - в данном случае до 28 см.</p>
                                        <p className={style.modalH2}>Таблица соответствия размеров</p>
                                        <table>
                                            <tbody>
                                                <tr><th>Длина ноги, см</th><td>22,5</td><td>23,5</td><td>24,5</td><td>25</td><td>25,5</td><td>26</td><td>26,5</td><td>27,5</td><td>28</td><td>29</td><td>29,5</td></tr>
                                                <tr><th>EU</th><td>36</td><td>37</td><td>38</td><td>39</td><td>40</td><td>41</td><td>42</td><td>43</td><td>44</td><td>45</td><td>46</td></tr>
                                                <tr><th>RUS</th><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td><td>40</td><td>41</td><td>42</td><td>43</td><td>44</td><td>45</td></tr>
                                                <tr><th>US</th><td>5,5</td><td>6</td><td>6,5</td><td>7,5</td><td>8</td><td>8,5</td><td>9</td><td>10</td><td>10,5</td><td>11,5</td><td>12</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={style.sizeBtnPosition}>
                                    {size.map((item) => 
                                        <button onClick={() => setActiveSize(item)} key={item} disabled={!catalog.size.includes(item)} className={activeSize === item ? style.sizeBtnItemActive : style.sizeBtnItem}>{item}</button>    
                                    )}
                                </div>
                                {sizeActive ? <p className={style.redText}>Выберите размер</p> : ''}
                            </div>
                            <p className={style.price}>{catalog.price} ₽</p>
                            <div className={style.payPosition}>
                                <div className={style.counter}>
                                    <button disabled={count===1} onClick={() => setCount(count-1)} className={style.counterBtn}>-</button>
                                    <span className={style.counterText}>{count}</span>
                                    <button onClick={() => setCount(count+1)} className={style.counterBtn}>+</button>
                                </div>
                                <div style={{width:'100%'}}>
                                    <button onClick={() => addCart(catalog.id)} className={style.pay}>Добавить в корзину <span className={style.bag}><SlHandbag/></span></button>
                                </div>
                            </div>
                            <div className={style.descriptionPosition}>
                                <div className={style.descriptionFlex}>
                                    <button onClick={() => setDescription(true)} className={description ? style.descriptionBtn : style.descriptionBtnNone}>ОПИСАНИЕ</button>
                                    <button onClick={() => setDescription(false)} className={!description ? style.descriptionBtn : style.descriptionBtnNone}>ХАРАКТЕРИСТИКИ</button>
                                </div>
                                {description ?
                                    <p className={style.text}>{catalog.description}</p>
                                    :
                                    <div className={style.tablePosition}>
                                        <div className={style.table}>
                                            <span className={style.tableText}>Пол</span>
                                            <div className={style.line}></div>
                                            <span className={style.tableGray}>{catalog.gender}</span>
                                        </div>
                                        <div className={style.table}>
                                            <span className={style.tableText}>Цвет</span>
                                            <div className={style.line}></div>
                                            <span className={style.tableGray}>{catalog.color.join(', ')}</span>
                                        </div>
                                        <div className={style.table}>
                                            <span className={style.tableText}>Состав</span>
                                            <div className={style.line}></div>
                                            <span className={style.tableGray}>{catalog.materials.join(', ')}</span>
                                        </div>
                                        <div className={style.table}>
                                            <span className={style.tableText}>Коллекция</span>
                                            <div className={style.line}></div>
                                            <span className={style.tableGray}>{catalog.collection}</span>
                                        </div>
                                        <div className={style.table}>
                                            <span className={style.tableText}>Гарантия</span>
                                            <div className={style.line}></div>
                                            <span className={style.tableGray}>{catalog.warranty}</span>
                                        </div>
                                        <div className={style.table}>
                                            <span className={style.tableText}>Год выпуска</span>
                                            <div className={style.line}></div>
                                            <span className={style.tableGray}>{catalog.year}</span>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className={style.descriptionPositionMin}>
                        <div className={style.descriptionFlex}>
                            <button onClick={() => setDescription(true)} className={description ? style.descriptionBtn : style.descriptionBtnNone}>ОПИСАНИЕ</button>
                            <button onClick={() => setDescription(false)} className={!description ? style.descriptionBtn : style.descriptionBtnNone}>ХАРАКТЕРИСТИКИ</button>
                        </div>
                        {description ?
                            <p className={style.text}>{catalog.description}</p>
                            :
                            <div className={style.tablePosition}>
                                <div className={style.table}>
                                    <span className={style.tableText}>Пол</span>
                                    <div className={style.line}></div>
                                    <span className={style.tableGray}>{catalog.gender}</span>
                                </div>
                                <div className={style.table}>
                                    <span className={style.tableText}>Цвет</span>
                                    <div className={style.line}></div>
                                    <span className={style.tableGray}>{catalog.color.join(', ')}</span>
                                </div>
                                <div className={style.table}>
                                    <span className={style.tableText}>Состав</span>
                                    <div className={style.line}></div>
                                    <span className={style.tableGray}>{catalog.materials.join(', ')}</span>
                                </div>
                                <div className={style.table}>
                                    <span className={style.tableText}>Коллекция</span>
                                    <div className={style.line}></div>
                                    <span className={style.tableGray}>{catalog.collection}</span>
                                </div>
                                <div className={style.table}>
                                    <span className={style.tableText}>Гарантия</span>
                                    <div className={style.line}></div>
                                    <span className={style.tableGray}>{catalog.warranty}</span>
                                </div>
                                <div className={style.table}>
                                    <span className={style.tableText}>Год выпуска</span>
                                    <div className={style.line}></div>
                                    <span className={style.tableGray}>{catalog.year}</span>
                                </div>
                            </div>
                        }
                        
                    </div>
                
            </div>
            <CatalogLast miniCatalog={miniCatalog} text={text1}/>
            <CatalogLast miniCatalog={miniCatalogLast} text={text2}/>
            <div style={{marginTop:'170px'}}>
                <Footer/>
            </div>
        </div>
    )
}

export default Product