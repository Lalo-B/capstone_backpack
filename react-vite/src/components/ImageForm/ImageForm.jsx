import { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import * as temporaryActions from '../../redux/images'
import { useDispatch } from "react-redux";
import { SubmitContext } from "../../context/SubmitContext";
import { useNavigate } from "react-router-dom";


const ImageForm = ({cardId, setId, questionId, testId}) => {
    // const history = useHistory(); // so that you can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    // const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()
    const { isSubmit } = useContext(SubmitContext);
    const navigate = useNavigate();


    const handleSubmit = async (id) => {
        const formData = new FormData();
        formData.append('image', image)
        formData.append('type', 'set')

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        // setImageLoading(true);
        if(setId){
            const temp = await dispatch(temporaryActions.addImageSetThunk(formData, id));
            navigate(`/flashcards/${setId}`)
            if (temp.errors) {
                // let errObj = {};
                // for (let er in temp.errors) {
                //     errObj[temp.errors[er]] = `there was a problem with ${temp.errors[er]}`;
                // }
                // setCardErrors(errObj)
            }
        }
        if(testId){
            const temp = await dispatch(temporaryActions.addImageTestThunk(formData, id));
            navigate(`/flashcards/${setId}`)
            if (temp.errors) {
                // let errObj = {};
                // for (let er in temp.errors) {
                //     errObj[temp.errors[er]] = `there was a problem with ${temp.errors[er]}`;
                // }
                // setCardErrors(errObj)
            }
        }

        // console.log(temp)
        // history.push("/images");
    }

    useEffect(() => {
        if (isSubmit && image && cardId) {
            handleSubmit(cardId)
        }
        if (isSubmit && image && questionId) {
            handleSubmit(questionId)
        }
    }, [isSubmit,image,cardId, questionId])

    return (
        // <form
        //     onSubmit={handleSubmit}
        //     encType="multipart/form-data"
        // >
        <label>Upload an Image:
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
        </label>
            // {/* <button type="submit">Submit</button>
            // {(imageLoading) && <p>Loading...</p>} */}
        // </form>
    )
}

export default ImageForm;
