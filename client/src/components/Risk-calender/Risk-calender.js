import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Axios from 'axios';
import ReactTooltip from 'react-tooltip'

class RCalendar extends React.Component {

    state = {
        deptID: 0,
    }

    render() {
        return (
            <div className='calendar'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next,today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={this.state.data}
                    initialView='dayGridMonth'
                    editable={true}
                    selectMirror={true}
                    select={this.handleDateSelect}
                    eventContent={() => {
                        return (
                            <ReactTooltip place="bottom" effect="float" backgroundColor="black" textColor="white" >
                            </ReactTooltip>
                        );
                    }}
                    eventMouseEnter={this.hover}
                    weekends={false}
                    events={this.state.data}
                />
            </div>
        )
    }

    componentDidMount() {
        this.handleDateSelect(this.props.id)
    }

    componentDidUpdate(prevProps) {
        if (this.props.id != 0 && this.props.id != prevProps.id)
            this.handleDateSelect(this.props.id)
    }

    hover(info) {
        info.el.setAttribute("data-tip", "High Risk, Employee Shortage : " + info.event.title)
        ReactTooltip.rebuild();
    }

    setDataToNull() {
        this.setState({
            data: [],
        })
    }

    handleDateSelect = (id) => {
        var flag = 0
        Axios.get("http://localhost:3001/api/getAllRisk")
            .then(response => {
                var res = response.data.data;
                res.map((value) => {
                    if (value.risk.length != 0 && value.teamId == id) {
                        value.risk.map((value1) => {
                            this.getEmpNames(value1.employeeshortage, value1.date);
                            flag = 1;
                        })
                    }
                })
                if (flag == 0) {
                    this.setDataToNull()
                }
            })
    }

    async getEmpNames(value, dateS) {
        await Axios.post('http://localhost:3001/getEmpNamesFromId', {
            idArray: value,
        }).then(response => {
            var res = response.data;
            var title = res.toString();
            var start = dateS;
            var end = dateS;
            var array = []
            array.push({ title: title, start: start, end: end, backgroundColor: "red", display: "background" })
            this.setState({
                data: array,
            })
        })
    }
}

export default RCalendar;