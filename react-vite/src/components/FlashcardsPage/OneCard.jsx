import { useState } from 'react';
import './FlashcardsPage.css';

const OneCard = ({card}) => {
    const [isFront, setIsFront] = useState('front');
    const [cardContent, setCardContent] = useState(card.question)


    const flip = () => {
        if(cardContent === card.question){
            setTimeout(()=>setCardContent(card.answer), 160)
        } else {
            setTimeout(()=>setCardContent(card.question), 160)
        }
    }

    const rotate = () => {
        if(isFront === 'front'){
            setIsFront('back')
        } else {
            setIsFront('front')
        }
        flip()
    }


    return (
        <div className={`one-card ${isFront}`} onClick={rotate}>
            <div className={`${isFront}`}>{cardContent}</div>
        </div>
    )
}
export default OneCard;
