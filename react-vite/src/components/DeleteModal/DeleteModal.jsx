import { useDispatch } from 'react-redux';
import './DeleteModal.css';
import * as matActions from '../../redux/studyMats';
import { useModal } from '../../context/Modal';



const DeleteModal = ({setId,testId}) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const handleClick = () => {
        if(testId){
            dispatch(matActions.deleteTestThunk(testId))
        }
        if(setId){
            dispatch(matActions.deleteSetThunk(setId))
        }
        closeModal()
    }
    return (
        <div>
            <h1>delete modal</h1>
            <p>are you sure you want to delete your study material?</p>
            <button onClick={handleClick}>Yes (delete material)</button>
            <button>No (keep material)</button>
        </div>
    )
}
export default DeleteModal;
