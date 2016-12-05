import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SideBar from '../../NavigationPane/SideBar';
import Loading from '../../Loading';
import {makeAjaxRequest} from '../../Ajax';

const loader = (
    <div key="loader" style={{
                borderRadius: '2px',
                border: 'none',
                maxWidth: '400px',
                display: 'block',
                margin: 'auto',
                padding: '3em'
            }}>
        <Loading height={50} />
    </div>
);

class CourseFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [<MenuItem key={0} value={0} primaryText='Loading...' />],
            value: 0,
            update: 0
        };
    }

    fetch() {
        if (this.props.departmentId === 'NUL')
            return;
        fbApi.getCoursesByDepartmentId(this.props.departmentId,
            (list) => {
                let newList = [<MenuItem key={0} value={0} primaryText='Select a Course' />];
                list.forEach(item => newList.push(item));
                this.setState((prevState, props) => ({ items: newList, update: prevState.update + 1 }));
            }, console.log);
    }

    componentDidMount() {
        this.fetch();
    }

    handleChange(event, index, value) {
        if (index === 0)
            return;
        this.setState({value: value});
        this.props.onChange(event, index, value);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.update === prevState.update)
            this.fetch();
    }

    render() {
        console.log("Rendering");
        const items = this.state.items.map((item, key) => {
            if (key === 0)
                return item;
            return (
                <MenuItem value={item.courseId} key={key} primaryText={item.name} />
            );
        });

        return (
            <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
                {items}
            </DropDownMenu>
        );
    }
}

class DepartmentFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'NUL'
        };
    }

    handleChange(event, index, value) {
        this.setState({value});
        this.props.onChange(event, index, value);
    }

    render() {
        const departments = [
            {
                id: 'NUL',
                name: 'Select department'
            },
            {
                id: 'AER',
                name: 'Aerospace Engineering'
            },
            {
                id: 'CIV',
                name: 'Civil Engineering'
            },
            {
                id: 'CSE',
                name: 'Computer Science and Engineering'
            },
            {
                id: 'EEE',
                name: 'Electrical Engineering'
            },
            {
                id: 'ECE',
                name: 'Electronics and Communication Engineering'
            },
            {
                id: 'MEC',
                name: 'Mechanical Engineering'
            },
            {
                id: 'MET',
                name: 'Metallurgy Engineering'
            },
            {
                id: 'PRO',
                name: 'Production Engineering'
            },
        ].map((department, key) => {
            return (
                <MenuItem key={department.id} value={department.id} primaryText={department.name} />
            );
        });

        return (
            <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
                {departments}
            </DropDownMenu>
        );
    }
}

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departmentId: 'NUL'
        };
    }

    handleDepartmentChange(event, index, value) {
        console.log(value);
        this.setState({departmentId: value});
    }

    handleCourseChange(event, index, value) {
        this.props.onCourseSelect(value);
    }

    render() {
        return (
            <div className='panel panel-default'>
                <div className='row'>
                    <div className='col-xs-6 col-sm-6'>
                        <DepartmentFilter onChange={this.handleDepartmentChange.bind(this)} />
                    </div>
                    <div className='col-xs-6 col-sm-6'>
                        {this.state.departmentId === 'NUL' ? <div />
                                : <CourseFilter key={this.state.departmentId} onChange={this.handleCourseChange.bind(this)} departmentId={this.state.departmentId} />}
                    </div>
                </div>
            </div>
        );
    }
}

class StudentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            fetched: false,
        };
    }

    fetch() {
        if (this.props.courseId === 'NUL')
            return;
        let courseId = this.props.courseId;
        fbApi.getStudentsByCourseId(this.props.courseId,
            (list) => {
                if (courseId !== this.props.courseId)
                    return;
                this.setState((prevState, props) => ({ items: list, fetched: true }));
            }, console.log);
    }

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextProps.courseId !== this.props.courseId || !this.state.fetched)
            this.fetch();
    }

    render() {
        if (this.props.courseId === 'NUL') {
            return (
                <div className='jumbotron' style={{background: 'none'}}>
                    <p style={{color: 'lightgray'}}>Select department and course from the dropdown.</p>
                </div>
            );
        }
        if (!this.state.fetched) {
            return loader;
        }

        const sortedList = this.state.items.sort((left, right) => {
            if (left.common.userName < right.common.userName) {
                return -1;
            } else if (left.common.userName > right.common.userName) {
                return 1;
            } else return 0;
        });
        window.list = sortedList;
        const items = sortedList.map((student, key) => {
            console.log(student);
            return (
                <div className="list-group-item" key={key}>
                    <div className="row">
                        <div className='col-xs-9 col-sm-9'>
                            {student.common.userName}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="list-group">
                {items}
            </div>
        );
    }
}

export default class StudentFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: 'NUL',
        };
    }

    handleChange(courseId) {
        this.setState({courseId: courseId});
    }

    render() {
        return (
            <div className="row"  style={{margin: 0}}>
                <div className="sidebar col-sm-2" style={{margin: 0}}>
                    <SideBar />
                </div>
                <div className="rest col-sm-10" style={{margin: 0, padding: 0}}>
                    <nav className="navbar navbar-default" style={{
                        border: 0,
                        borderRadius: '2px',
                    }}>
                        <div className="row" style={{
                            margin: 0,
                            maxWidth: '800px',
                            display: 'flex',
                            margin: 'auto',
                            alignItems: 'center'
                        }}>
                            <h4>List of students who haven't yet filled feedback.</h4>
                        </div>
                    </nav>
                    <div className='container-fluid'>
                        <Filters onCourseSelect={this.handleChange.bind(this)} />
                        <StudentList key={this.state.courseId} courseId={this.state.courseId} />
                    </div>
                </div>
            </div>
        );
    }
}

export { StudentList };