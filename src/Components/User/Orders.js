import React, { useState, useContext, useEffect } from 'react'
import { Paper, IconButton, Tooltip, Chip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import ProfileEdit from './ProfileEdit';
import PersonIcon from '@material-ui/icons/Person';
import { AppContext } from '../../App';
import MaterialTable from 'material-table'
import axios from 'axios';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        border: 0
    },
    tag: {
        fontWeight: 'bold',
        marginRight: '20px',
        fontSize: '16px',
        flex: 1
    },
    name: {
        fontSize: '16px',
        flex: 4
    }
}))


export default function Orders() {

    const history = useHistory();
    const classes = useStyles();

    const [orders, setOrders] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const statusColor = (param) => {
        switch (param) {
            case 'pending':
                return { background: '#0041FF' }
            case 'processing':
                return { background: '#FFC107' }
            case 'completed':
                return { background: '#43A047' }
                
        }
    }

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_DOMAIN}/api/orders?token=true`,
            {
                withCredentials: true
            }
        ).then(response => {
            setOrders(response.data.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setData(orders.map((item) => (
            {
                order_id: item.id,
                date: dateFormat(item.created_at, 'd mmmm, yyyy h:M TT'),
                total: item.formated_grand_total,
                status: item.status_label,
                id: item.id
            }
        )))
    }, [orders])

    return (
        <Paper variant='outlined' square className={classes.paper}>
            <h5>Orders</h5>

            <MaterialTable
                style={{ boxShadow: 'unset' }}
                title=""
                isLoading={loading}
                columns={[
                    {
                        title: 'Order ID',
                        field: 'order_id',
                        cellStyle: {
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Date',
                        field: 'date',
                        cellStyle: {
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Total',
                        field: 'total',
                        cellStyle: {
                            textAlign: 'center',
                            marginLeft: '5px'
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Status',
                        field: 'status',
                        cellStyle: {
                            padding: '20px',
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                        render: (rowdata) =>
                            <Chip
                                label={rowdata.status}
                                color='primary'
                                className={rowdata.status != '' && rowdata.status}
                                // style=
                            />
                    },

                ]}
                data={data}

                actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'View Order',
                        onClick: (event, rowData) => history.push(`/account/order/view/${rowData.id}`)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    headerStyle: { backgroundColor: '#F1CB29', fontWeight: 'bold' },
                    pageSize:10
                }}
            />

        </Paper>
    )
}

