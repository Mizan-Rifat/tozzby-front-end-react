import React, { useState, useContext } from 'react';
import ProductExpansionPanel from './ProductExpansionPanel';
import Rating from '@material-ui/lab/Rating';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { AppContext } from '../../App';

export default function CreateReviewExpansionPanel({ id }) {



    return (

        <ProductExpansionPanel
            summary='Write Your Review'
            rich={false}
            details={<CreateReview id={id} />}
        />
    )

}

function CreateReview({ id }) {

    const { user, setAuthOpen } = useContext(AppContext);

    const [data, setData] = useState({
        rating: 1,
        comment: ''
    })

    const handleSubmit = () => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/reviews/${id}/create?token=true`,

            {
                rating: data.rating,
                comment: data.comment
            }

            , {
                withCredentials: true
            }).then(response => {
                console.log(response)
            })
    }
    const handleRatingChange = (e, value) => {
        setData({
            ...data,
            rating: value
        })
    }
    const handleCommentChange = (e) => {
        setData({
            ...data,
            comment: e.target.value
        })
    }
    return (
        <div>
            {
                (Object.entries(user).length == 0) ?
                    <div>
                        <p>You Need To Login To Complete This Action.</p>
                        <Button variant='contained' color='primary' size='small' className='butn' onClick={() => setAuthOpen({
                            state: true,
                            comp: 1
                        })}>Login</Button>
                    </div>
                    :
                    <>
                        <div className="text-center">
                            <h5>Give A Rating...</h5>
                            <Rating name="size-medium" defaultValue={1} onChange={handleRatingChange} value={data.rating} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1" style={{ fontWeight: 700 }}>Review</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} onChange={handleCommentChange} value={data.comment} />
                        </div>
                        <Button variant='contained' color='primary' className='butn' onClick={handleSubmit}>Submit</Button>
                    </>
            }

        </div>
    )
}


