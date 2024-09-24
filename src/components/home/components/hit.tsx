import style from '../home.module.css'
import { GoArrowRight} from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { Link } from 'react-router-dom';

const Hit = () => {

    return (
        <div className={style.container}>
            <div className={style.hitBlock}>
                <div className={style.hitBlockTextBlock}>
                    <div>
                        <p className={style.hitMaxBlock}>Хит сезона от Nike</p>
                        <p className={style.hitBlockText}>Nike Air Max Alpha Trainer 5</p>
                        <p className={style.hitBlockPrice}><span style={{fontSize:'16px'}}>от</span> 12 069 ₽</p>
                        <Link to={`/store/sneakers/21`} style={{backgroundColor:"rgb(255, 105, 21)"}} className={style.moreDetailed}>Подробнее <span style={{backgroundColor:"rgb(251, 90, 0)"}} className={style.moreDetailedVektor}><GoArrowRight size={18}/></span></Link>
                    </div>
                    <div className={style.hitBlock2Text}>
                        <div><GoPlus size={24}/></div>
                        <span>Уникальная технология структуры стельки позволяет забыть про обувь на ноге.</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Hit