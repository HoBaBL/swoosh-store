import style from '../home.module.css'
import block from '../img/Frame 29.png'
import star from '../img/Frame 29 (1).png'
import basket from '../img/Frame 29 (2).png'
import 'animate.css';

const BlockInfo = () => {

    return (
        <div className={style.blockInfo}>
                <div className={style.container}>
                    <div className={style.blockInfoInfo}>
                        <div className={style.blockInfoTextBlock}>
                            <div>
                                <img src={block} alt="" />
                            </div>
                            <div>
                                <p className={style.blockInfoTextBig}>Только оригинальные товары</p>
                                <p className={style.blockInfoText}>Гарантированная подлинность Nike и высокое качество кроссовок.</p>
                            </div>
                        </div>
                        <div className={style.blockInfoTextBlock}>
                            <div>
                                <img src={star} alt="" />
                            </div>
                            <div>
                                <p className={style.blockInfoTextBig}>Профессиональный сервис</p>
                                <p className={style.blockInfoText}>Команда экспертов, готовых помочь с выбором размера ответить на все вопросы.</p>
                            </div>
                        </div>
                        <div className={style.blockInfoTextBlock}>
                            <div>
                                <img src={basket} alt="" />
                            </div>
                            <div>
                                <p className={style.blockInfoTextBig}>Эксклюзивный выбор</p>
                                <p className={style.blockInfoText}>Богатый ассортимент оригинальных моделей Nike, включая редкие выпуски.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default BlockInfo