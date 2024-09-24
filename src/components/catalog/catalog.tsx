import { useCallback, useEffect, useRef, useState } from 'react'
import style from './catalog.module.css'
import { SlHandbag } from "react-icons/sl";
import { Link } from "react-router-dom";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaCheck } from "react-icons/fa";
import Footer from '../footer/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { setMenu } from '../../redux/slice/menu';
import { addProductFavorite } from '../../redux/slice/favorite';
import { GiSettingsKnobs } from "react-icons/gi";

type SneakersType = {
    id: string,
    name:string,
    size: number[],
    price: string,
    description:string,
    specifications: string[],
    photo: string[],
    gender: string,
    count: number,
    color: string[],
    materials: string[],
    collection: string,
    warranty: string,
    year:string
}

const Catalog = () => {
    const [catalog, setCatalog] = useState<SneakersType[]>([])
    const [loading, setLoading] = useState(false)
    const [first, setFirst] = useState('0')
    const [two, setTwo] = useState('40000')
    const [num, setNum] = useState<any>([first, two]) /// диапазон цен
    const size = [35,36,37,38,39,40,41,42,43,44,45,46,47]
    const color = ["Белый", "Черный", "Красный", "Серый", "Синий", "Оранжевый", "Коричневый", "Зелёный"]
    const materials = ["Резина", "Кожа", "Текстиль", "Замша", "Пластик"]
    const [activeSize, setActiveSize] = useState(false) /// фильтр размера кнопка
    const [sizes, setSizes] = useState<number[]>([]) /// выбранные размеры
    const [activeColor, setActiveColor] = useState(false) /// фильтр цвета кнопка
    const [colors, setColors] = useState<string[]>([]) /// выбранные цвета
    const [activeMaterials, setActiveMaterials] = useState(false) /// фильр материалов кнопка
    const [Materials, setMaterials] = useState<string[]>([]) /// выбранные материалы
    const AddTaskDownRef = useRef<any>(null)
    const [filterActive, setFilterActive] = useState(false)
    const [filterFop, setFilterFop] = useState('По популярности')
    const menuGender = useSelector((state: RootState) => state.menu.menu) /// пол из меню
    const dispatch = useAppDispatch()
    const Favorite = useSelector((state: RootState) => state.Favorite.Favorite) /// для вкладки Избранное
    const [modal, setModal] = useState(false)


    useEffect(() => {
        dispatch(setMenu(localStorage.getItem('gender')))
    },[])


    const handleClick = (event:any) => {
        if (AddTaskDownRef.current && AddTaskDownRef.current.contains(event.target)) {
            if (activeSize) {
                setActiveSize(true)
            } else if (activeColor) {
                setActiveColor(true)
            } else if (activeMaterials){
                setActiveMaterials(true)
            } 
            else if (filterActive){
                setFilterActive(true)
            }
            
        } else {
            setActiveSize(false)
            setActiveColor(false)
            setActiveMaterials(false)
            setFilterActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    },[])

    function addSize(item:number) {
        const clone = [...sizes]
        if (clone.length === 0) {
            clone.push(item)
            setSizes(clone)
        } else {
            clone.forEach((i) => {
                if (i !== item && !clone.includes(item)) {
                    clone.push(item)
                    setSizes(clone)
                } else if (i === item) {
                    const index = clone.indexOf(item)
                    clone.splice(index, 1)
                    setSizes(clone)
                }
            })
        }
    }

    function addColor(item:string) {
        const clone = [...colors]
        if (clone.length === 0) {
            clone.push(item)
            setColors(clone)
        } else {
            clone.forEach((i) => {
                if (i !== item && !clone.includes(item)) {
                    clone.push(item)
                    setColors(clone)
                } else if (i === item) {
                    const index = clone.indexOf(item)
                    clone.splice(index, 1)
                    setColors(clone)
                }
            })
        }
    }

    function addMaterials(item:string) {
        const clone = [...Materials]
        if (clone.length === 0) {
            clone.push(item)
            setMaterials(clone)
        } else {
            clone.forEach((i) => {
                if (i !== item && !clone.includes(item)) {
                    clone.push(item)
                    setMaterials(clone)
                } else if (i === item) {
                    const index = clone.indexOf(item)
                    clone.splice(index, 1)
                    setMaterials(clone)
                }
            })
        }
    }

    useEffect(() => {
        const sizeSearch = sizes.join('|')
        const colorSearch = colors.join('|')
        const materialsSearch = Materials.join('|')
        
        async function addCatalog() {
            const url = new URL(`https://66b4c4049f9169621ea44441.mockapi.io/store?size=${sizeSearch}&color=${colorSearch}&materials=${materialsSearch}&gender=${localStorage.getItem('gender')}`);
            if (filterFop === 'По популярности') {
                url.searchParams.append('sortBy', 'id');
                url.searchParams.append('order', 'asc');
            } else if (filterFop === 'Сначала дороже') {
                url.searchParams.append('sortBy', 'price');
                url.searchParams.append('order', 'desc');
            } else if (filterFop === 'Сначала дешевле') {
                url.searchParams.append('sortBy', 'price');
                url.searchParams.append('order', 'asc');
            }
            
            fetch(url, {
                method: 'GET',
                headers: {'content-type':'application/json'},
            }).then(res => {
            if (res.ok) {
                return res.json();
            }
            }).then(data => {
                setCatalog(data)
            }).catch(error => {
                console.log(error)
            })
        }
        addCatalog()
        setLoading(true)
    },[sizes, colors, Materials, filterFop, menuGender])

    function ResetFilter() {
        setSizes([])
        setColors([])
        setMaterials([])
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    const [scroll, setScroll] = useState(Number(sessionStorage.getItem('scroll')));
    const onScroll = useCallback(() => setScroll(Math.round(window.scrollY)),[]);

    setTimeout(() => moveTo(0, scroll),1000)

    useEffect(() => {
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    sessionStorage.setItem('scroll', String(scroll))

    function addFavorite(sneakers:SneakersType, event:any) {
        event.preventDefault()
        dispatch(addProductFavorite(sneakers))
    }

    return  (
        <div className={style.otstyp}>
            <div className={style.container}>
                <div className={style.grayFlex}>
                    <span className={style.grayText}>Swoosh Store</span>
                    <LiaLongArrowAltRightSolid color='rgb(134, 134, 134)'/>
                    <span className={style.grayText}>Nike</span>
                    {menuGender === '' ?
                        '' :
                        <>
                            <LiaLongArrowAltRightSolid color='rgb(134, 134, 134)'/>
                            <span className={style.grayText}>{menuGender}</span>
                        </>

                    }
                </div>
                <p className={style.catalogMaxText}>NIKE <span className={style.numStyle}>{catalog !== undefined ? catalog.filter((i) => i.price > num[0] && i.price < num[1]).length : 0} товаров</span></p>
            </div>
                <div className={style.border}>
                    <div className={style.flexHeader}>
                        <div style={{borderRight: 'solid #DFDFDF 1px', height:'70px', display:'flex', alignItems:'center', width:'177px'}}>
                            <button onClick={() => setActiveSize(true)} className={style.flexFilter}>
                                <p>Размер</p>
                                <p className={style.filter}>{sizes.length < 2 ? sizes[0] : sizes.length} (EU) {activeSize ? <IoIosArrowUp size={16} color='black'/> : <IoIosArrowDown size={16} color='black'/>} </p>
                            </button>
                            {activeSize ?
                                <div ref={AddTaskDownRef} className={style.downBlock}>
                                    {size.map((item) => 
                                        <button key={item} onClick={() => addSize(item)} className={style.sizeBox}>
                                            <span className={style.check}>{sizes.map((i) => i === item ? <FaCheck key={i} size={8}/> : '')} </span>
                                            {item}
                                        </button>
                                    )}
                                </div> :''
                            }
                            
                        </div>
                        <div className={style.priceSlider}>
                            <p>Цена:</p>
                            <Slider 
                                className={style.rangeStyle}
                                range 
                                min={0}
                                max={40000}
                                onChange={(val:any) => setNum(val)}
                                trackStyle={{backgroundColor:'black', height:'2px'}}
                                handleStyle={{border:'solid 2px black', boxShadow:'none', opacity:'1'}}
                                activeDotStyle={{boxShadow:'none'}}
                                railStyle={{height:'2px', width:'175px'}}
                                value={num}
                                step={500}
                            />
                            <input value={num[0]} maxLength={5} onChange={(event) => {setNum([event.target.value, two]);setFirst(event.target.value)}} className={style.priceInput} placeholder='0' type="text" name="" id="" />
                            <input value={num[1]} maxLength={5} onChange={(event) => {setTwo(event.target.value);setNum([first, event.target.value])}} className={style.priceInput} placeholder='40000' type="text" name="" id="" />
                        </div>
                        <div style={{width:'198px', height:'70px', display:'flex', alignItems:'center', justifyContent:'center', borderRight: 'solid #DFDFDF 1px'}}>
                            <button onClick={() => setActiveColor(!activeColor)} className={style.flexFilter}>
                                <p>Цвет</p>
                                <p className={style.filter}>{colors.length === 0 ? "нет" : colors.length === 1 ? colors[0] : colors.length}  {activeColor ? <IoIosArrowUp size={16} color='black'/> : <IoIosArrowDown size={16} color='black'/>}</p>
                            </button>
                            {activeColor ?
                                <div ref={AddTaskDownRef} className={style.downBlock}>
                                    {color.map((item) => 
                                        <button key={item} onClick={() => addColor(item)} className={style.sizeBox}>
                                            <span className={style.check}>{colors.map((i) => i === item ? <FaCheck key={i} size={8}/> : '')} </span>
                                            {item}
                                        </button>
                                    )}
                                </div> :''
                            }
                        </div>
                        <div style={{width:'229px', height:'70px', display:'flex', alignItems:'center', justifyContent:'center', borderRight: 'solid #DFDFDF 1px'}}>
                            <button onClick={() => setActiveMaterials(true)} className={style.flexFilter}>
                                <p>Материал</p>
                                <p className={style.filter}>{Materials.length === 0 ? "нет" : Materials.length === 1 ? Materials[0] : Materials.length}  {activeMaterials ? <IoIosArrowUp size={16} color='black'/> : <IoIosArrowDown size={16} color='black'/>}</p>
                            </button>
                            {activeMaterials ?
                                <div ref={AddTaskDownRef} className={style.downBlock}>
                                    {materials.map((item) => 
                                        <button key={item} onClick={() => addMaterials(item)} className={style.sizeBox}>
                                            <span className={style.check}>{Materials.map((i) => i === item ? <FaCheck key={i} size={8}/> : '')} </span>
                                            {item}
                                        </button>
                                    )}
                                </div> :''
                            }
                        </div>
                        <button onClick={() => ResetFilter()} className={style.defoultBtn}><RxCross1/> СБРОСИТЬ ВСЁ</button>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.filterFlex}>
                        <div className={style.pagination}>
                                <button onClick={() => setFilterActive(true)} className={style.paginationFilter}>{filterFop}  <IoIosArrowDown size={16} color='black'/></button>
                                {filterActive ?
                                    <div ref={AddTaskDownRef} className={style.paginationDopdrown}>
                                        <button onClick={() => setFilterFop('По популярности')} className={style.btnPagit}><span className={style.circlePagination}>{filterFop === 'По популярности' ? <span className={style.point}></span> : ''}</span> По популярности</button>
                                        <button onClick={() => setFilterFop('Сначала дороже')} className={style.btnPagit}><span className={style.circlePagination}>{filterFop === 'Сначала дороже' ? <span className={style.point}></span> : ''}</span> Сначала дороже</button>
                                        <button onClick={() => setFilterFop('Сначала дешевле')} className={style.btnPagit}><span className={style.circlePagination}>{filterFop === 'Сначала дешевле' ? <span className={style.point}></span> : ''}</span> Сначала дешевле</button>
                                    </div> : ''
                                }
                        </div>
                        <div onClick={() => setModal(true)} className={style.filterIcon}>
                            <GiSettingsKnobs size={32}/>
                        </div>
                        
                    </div>
                </div>
            <div className={style.container}>
                <div className={style.store}>
                    {!loading ? <div style={{height:'4000px'}}>Загрузка</div>
                        :
                        catalog !== undefined ?
                            catalog.filter((i) => i.price > num[0] && i.price < num[1]).map((sneakers) => 
                                <Link key={sneakers.id} to={`/store/sneakers/${sneakers.id}`}>
                                    <div className={style.product}>
                                        <button onClick={(event) => addFavorite(sneakers, event)} className={style.heart}>
                                            {Favorite.length > 0 ? Favorite.find((item) => item.id === sneakers.id) ? <FaHeart size={20}/> : <FaRegHeart size={20}/> : <FaRegHeart size={20}/>}
                                        </button>
                                        <img  className={style.productImg} src={sneakers.photo[0]} alt="" />
                                        {/* width={440} height={440} */}
                                        {/* <div className={style.textBox}> */}
                                            <p className={style.gender}>{sneakers.gender}</p>
                                            <p className={style.name}>{sneakers.name}</p>
                                            <div className={style.pricePosition}>
                                                <p className={style.name}>{sneakers.price} ₽</p>
                                                <button className={style.btnBag}><SlHandbag size={24}/></button>
                                            </div>
                                        {/* </div> */}
                                    </div>
                                </Link>
                            )
                            : ''
                    }
                </div>
            </div>
            <div className={modal ? style.grayBlack : style.grayBlackNone} onClick={() => setModal(false)}>
                <div className={style.downdrop} onClick={e => e.stopPropagation()}>
                    <div className={style.crossPosition}>
                        <button onClick={() => setModal(false)} className={style.cross}>
                            <RxCross1 size={20}/>
                        </button>
                    </div>
                    
                    <div style={{ height:'70px', display:'flex', alignItems:'center'}}>
                        <button onClick={() => setActiveSize(true)} className={style.flexFilter}>
                            <p>Размер</p>
                            <p className={style.filter}>{sizes.length < 2 ? sizes[0] : sizes.length} (EU) {activeSize ? <IoIosArrowUp size={16} color='black'/> : <IoIosArrowDown size={16} color='black'/>} </p>
                        </button>
                        {activeSize ?
                            <div ref={AddTaskDownRef} className={style.downBlock}>
                                {size.map((item) => 
                                    <button key={item} onClick={() => addSize(item)} className={style.sizeBox}>
                                        <span className={style.check}>{sizes.map((i) => i === item ? <FaCheck key={i} size={8}/> : '')} </span>
                                        {item}
                                    </button>
                                )}
                            </div> :''
                        }
                        
                    </div>
                    <div className={style.priceSliderDowndrop}>
                        <p>Цена:</p>
                        <Slider 
                            className={style.rangeStyle}
                            range 
                            min={0}
                            max={40000}
                            onChange={(val:any) => setNum(val)}
                            trackStyle={{backgroundColor:'black', height:'2px'}}
                            handleStyle={{border:'solid 2px black', boxShadow:'none', opacity:'1'}}
                            activeDotStyle={{boxShadow:'none'}}
                            railStyle={{height:'2px', width:'175px'}}
                            value={num}
                            step={500}
                        />
                        <div className={style.priceFlex}>
                            <input value={num[0]} maxLength={5} onChange={(event) => {setNum([event.target.value, two]);setFirst(event.target.value)}} className={style.priceInput} placeholder='0' type="text" name="" id="" />
                            <input value={num[1]} maxLength={5} onChange={(event) => {setTwo(event.target.value);setNum([first, event.target.value])}} className={style.priceInput} placeholder='40000' type="text" name="" id="" />
                        </div>
                    </div>
                    <div style={{ height:'70px', display:'flex', alignItems:'center'}}>
                        <button onClick={() => setActiveColor(!activeColor)} className={style.flexFilter}>
                            <p>Цвет</p>
                            <p className={style.filter}>{colors.length === 0 ? "нет" : colors.length === 1 ? colors[0] : colors.length}  {activeColor ? <IoIosArrowUp size={16} color='black'/> : <IoIosArrowDown size={16} color='black'/>}</p>
                        </button>
                        {activeColor ?
                            <div ref={AddTaskDownRef} className={style.downBlock}>
                                {color.map((item) => 
                                    <button key={item} onClick={() => addColor(item)} className={style.sizeBox}>
                                        <span className={style.check}>{colors.map((i) => i === item ? <FaCheck key={i} size={8}/> : '')} </span>
                                        {item}
                                    </button>
                                )}
                            </div> :''
                        }
                    </div>
                    <div style={{ height:'70px', display:'flex', alignItems:'center'}}>
                        <button onClick={() => setActiveMaterials(true)} className={style.flexFilter}>
                            <p>Материал</p>
                            <p className={style.filter}>{Materials.length === 0 ? "нет" : Materials.length === 1 ? Materials[0] : Materials.length}  {activeMaterials ? <IoIosArrowUp size={16} color='black'/> : <IoIosArrowDown size={16} color='black'/>}</p>
                        </button>
                        {activeMaterials ?
                            <div ref={AddTaskDownRef} className={style.downBlock}>
                                {materials.map((item) => 
                                    <button key={item} onClick={() => addMaterials(item)} className={style.sizeBox}>
                                        <span className={style.check}>{Materials.map((i) => i === item ? <FaCheck key={i} size={8}/> : '')} </span>
                                        {item}
                                    </button>
                                )}
                            </div> :''
                        }
                    </div>
                    <button onClick={() => ResetFilter()} className={style.defoultBtn}><RxCross1/> СБРОСИТЬ ВСЁ</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Catalog