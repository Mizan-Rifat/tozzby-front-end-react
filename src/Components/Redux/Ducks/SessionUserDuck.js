import { postAction, getAction } from "./actions";

//urls

const fetch_user_url = (id)=>`/api/`;
const add_user_url = `/api/`;
const delete_user_url =(id)=> `/api/`;
const update_user_url = (id)=>`/api/`;


//actions

const USER_FETCHED = 'pes/user/user_fetched';
const USER_ADDED = 'pes/user/user_added';
const USER_DELETED = 'pes/user/user_deleted';
const USER_UPDATED = 'pes/user/user_updated';

const LOADING_TRUE = 'pes/user/loading_true';
const LOADING_FALSE = 'pes/user/loading_false';
const FETCHING_TRUE = 'pes/user/fetching_true';
const FETCHING_FALSE = 'pes/user/fetching_false';
const SET_ERRORS = 'pes/user/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    user:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case USER_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                user:action.payload,
                
            }

        case USER_ADDED:
            
            return {
                ...state,
                loading:false,
                user:[...state.user,action.payload],
                
            }
        case USER_UPDATED:
            
            return {
                ...state,
                loading:false,
                user:state.user.map(item=>item.id == action.payload.id ? action.payload : item),
                
            }
        case USER_DELETED:
            
            return {
                ...state,
                loading:false,
                user:state.user.filter(item => item.id != action.payload),
                
            }
        case LOADING_TRUE:
            
            return {
                ...state,
                loading:true
            }
        case LOADING_FALSE:
            
            return {
                ...state,
                loading:false
            }
        case FETCHING_TRUE:
            
            return {
                ...state,
                fetching:true
    
            }
        case FETCHING_FALSE:
            
            return {
                ...state,
                fetching:false,
            }
        case SET_ERRORS:
            
            return {
                ...state,
                loading:false,
                fetching:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}

// action_creators

export const userFetched = (data) =>{
    return {
        type:USER_FETCHED,
        payload:data
    }
}

export const userUpdated = (data) =>{
    return {
        type:USER_UPDATED,
        payload:data
    }
}
export const userDeleted = (id) =>{
    return {
        type:USER_DELETED,
        payload:id
    }
}
export const userAdded = (data) =>{
    return {
        type:USER_ADDED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchUser = () => (dispatch) => {
    
    const url = fetch_user_url;
    const actions={
        loading:{type:FETCHING_TRUE},
        success:userFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const addUser = (newData) => (dispatch) => {
    
    const url = add_user_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:userAdded,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updateUser = (newData) => (dispatch) => {

    const url = update_user_url();
    const actions={
        loading:{type:LOADING_TRUE},
        success:userUpdated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch,'put');
}

export const deleteUser = (id) => (dispatch) => {

    const url = delete_user_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:userDeleted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}
