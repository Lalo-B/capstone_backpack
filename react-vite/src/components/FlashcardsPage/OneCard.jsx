import { useState } from 'react';
import './FlashcardsPage.css';

const OneCard = ({ card, image }) => {
    const [isFront, setIsFront] = useState('front');
    const [cardContent, setCardContent] = useState(card.question)



    const flip = () => {
        if (cardContent === card.question) {
            setTimeout(() => setCardContent(card.answer), 160)
        } else {
            setTimeout(() => setCardContent(card.question), 160)
        }
    }

    const rotate = () => {
        if (isFront === 'front') {
            setIsFront('back')
        } else {
            setIsFront('front')
        }
        flip()
    }


    return (
        <div className={`one-card ${isFront}`} onClick={rotate}>
            {isFront !== 'front' ? null : <img className={`${isFront} card-image`} src={image?.url} />}
            {/* quizlet has it already on the propper side of the card */}

            <div style={{userSelect: 'none'}} className={`${isFront}`}>{cardContent}</div>
        </div>
    )
}
export default OneCard;
