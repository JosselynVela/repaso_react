import React,{Component} from "react";
import {Table, Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';





class Usuario extends Component{
    state = {
        searchText: '',
        searchedColumn: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
     

    render(){
        const {usuario}= this.props;

        const columns=[
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                ...this.getColumnSearchProps('age'),
            },
            {
                title: 'Task',
                dataIndex: 'task',
                key: 'task',
                render:(text, record) => (
                    <span>
        <Button type="ghost" value={this.props.usuario.id} onClick={this.onClick} >Ver Tarea</Button>
      </span>
                ),

            }
        ];
        //console.log(this.props.usuario);

        //lenguaje jsx
        return <div>
            <h1>LISTA DE USUARIOS</h1>
            {/*{
                usuario.map(usuario=> <div key={usuario.id}>


                    ID:{usuario.id}<br/>
                    Nombre:{usuario.name}<br/>
                    Edad:{usuario.age}<hr/>

                </div>)
            }*/}
            <Table rowKey={usuario.id} dataSource={usuario} columns={columns}

            />
        </div>
    }

}



export default Usuario;