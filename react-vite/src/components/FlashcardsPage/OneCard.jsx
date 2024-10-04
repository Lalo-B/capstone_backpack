import './FlashcardsPage.css';

const OneCard = ({card}) => {
    return (
        <div className="single-card">
            <div>{card.question}</div>
            <div>{card.answer}</div>
        </div>
    )
}
export default OneCard;
