import SliderTop from "./components/sliderTop"
import BlockInfo from "./components/bloskInfo"
import CatalogLast from "./components/catalogLast"
import { useEffect, useState } from "react"
import HomeFooter from "./components/homeFooter"
import Hit from "./components/hit"
import Blog from "./components/blog/blog"
import Footer from "../footer/footer"
import style from './home.module.css'

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

const Home = () => {
    const [catalog, setCatalog] = useState<SneakersType[]>([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`https://66b4c4049f9169621ea44441.mockapi.io/store`)
        .then((res) => {
            return res.json()
        })
        .then((arr) => {
            setCatalog(arr)
            setLoading(true)
        })
    },[])

    const miniCatalog = catalog.slice(0,6)
    const text1 = 'Последние поступления'
    const miniCatalogLast = catalog.slice(6,12)
    const text2 = 'Самые продаваемые '

    return (
        <div>
            {loading ?
                <>
                    <SliderTop/>
                    <BlockInfo/>
                    <CatalogLast  text={text1} miniCatalog={miniCatalog}/>
                    <Hit/>
                    <Blog/>
                    <CatalogLast text={text2} miniCatalog={miniCatalogLast}/>
                    <HomeFooter/>
                    <Footer/>
                </>
                :
                <div className={style.container}>
                    Loading
                </div>
                
            }
            
        </div>
    )
}

export default Home