import "./HomePage.css";
import '/flashcards.png';
import '/tests.png';
import '/signup.png';
import '/lalocard2.png';

const HPCards = () => {

    const email = (e) => {
        e.preventDefault
        window.location = 'mailto:gerardobonillajr.dev@gmail.com';
    }

    return (
        <div className="hp-cards-container">
            <div className='hp-card'>
                <p>card title</p>
                <img src='./flashcards.png' className='hp-card-imgs' />
            </div>
            <div className='hp-card'>
                <p>card title</p>
                <img src='./tests.png' className='hp-card-imgs' />
            </div>
            <div className='hp-card'>
                <p>card title</p>
                <img src='./signup.png' className='hp-card-imgs' />
            </div>
            <div className='hp-card'>
                <p>card title</p>
                <img src='./lalocard2.png' onClick={email} className='hp-card-imgs' />
            </div>
        </div>
    )
}
export default HPCards;
