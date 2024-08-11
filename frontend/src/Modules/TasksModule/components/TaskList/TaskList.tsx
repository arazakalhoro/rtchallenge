import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useAuth} from "../../../Context/AuthContext.tsx";
import Loading from "../../../SharedModule/components/Loading/Loading.tsx";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import {Paginator} from 'primereact/paginator';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import './TaskList.module.css'
import {Header} from "../../../SharedModule/components/Header/Header.tsx";
import {toast} from "react-toastify";

const TaskList = () => {
    const {baseUrl, requestHeaders} = useAuth();
    const [tasks, setTasks] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [dateFilter, setDateFilter] = useState(null);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const statuses = ['Pending', 'Completed'];

    const fetchData = async () => {
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/tasks", {
                headers: requestHeaders,
                params: {
                    start: first,
                    length: rows,
                    search: { value: globalFilter },
                    columns: [
                        { data: 'status', search: { value: statusFilter } },
                        { data: 'due_date', search: { value: dateFilter ? dateFilter.getFullYear()+'-'+(dateFilter.getMonth()+1)+'-'+dateFilter.getDate() : '' } }
                    ]
                }
            })
            setTasks(response.data.data);
            setTotalRecords(response.data.recordsTotal);
        } catch (error: any) {
            try{
                toast.error(error.response.data.message)
            }catch (e){
                console.log(error)
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, [first, rows, globalFilter, statusFilter, dateFilter, sortField, sortOrder]);

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
        fetchData();
    };

    const onStatusFilterChange = (e) => {
        setStatusFilter(e.value);
    };

    const onDateFilterChange = (e) => {
        setDateFilter(e.value);
    };

    const onPageChange = (e) => {
        setFirst(e.first);
        setRows(e.rows);
    };
    const onSort = (e) => {
        setSortField(e.sortField);
        setSortOrder(e.sortOrder);
    };

    return (
        <>
            <Header title='Task List' />
            {isLoading ? (
                <Loading/>
            ) : (
                <div>
                    <div className="p-datatable-globalfilter-container">
                        <InputText
                            type="search"
                            onInput={onGlobalFilterChange}
                            placeholder="Global Search"
                            style={{marginBottom: '10px'}}
                        />
                        <Dropdown
                            value={statusFilter}
                            options={statuses}
                            onChange={onStatusFilterChange}
                            placeholder="Filter by Status"
                            style={{marginLeft: '10px', marginBottom: '10px'}}
                        />
                        <Calendar
                            value={dateFilter}
                            onChange={onDateFilterChange}
                            placeholder="Filter by Due Date"
                            showIcon="true"
                            style={{marginLeft: '10px', marginBottom: '10px'}}
                        />
                    </div>
                    <DataTable
                        value={tasks}
                        rows={rows}
                        totalRecords={totalRecords}
                        first={first}
                        onPage={onPageChange}
                        globalFilter={globalFilter}
                        emptyMessage="No tasks found."
                    >
                        <Column field="id" header="ID" sortable/>
                        <Column field="title" header="Title" sortable/>
                        <Column field="status" header="Status" sortable/>
                        <Column field="due_date" header="Due Date" sortable/>
                    </DataTable>
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={totalRecords}
                        rowsPerPageOptions={[5, 10, 20]}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </>
    );
};

export default TaskList;
