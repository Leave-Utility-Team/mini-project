import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './evenUtils'
import Axios from 'axios';
import ReactTooltip from 'react-tooltip'

class CalendarLeaves extends React.Component {


    state = {
        weekendsVisible: true,
        currentEvents: []
    }
    // componentDidMount() {
    //     this.handleDateSelect()
    // }


    render() {
        return (
            <div className='calendar'>
                <FullCalendar
                    //height={650}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next,today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={this.state.weekendsVisible}
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={this.handleDateSelect}
                    eventChange={this.handleDateSelect}
                    eventContent={() => {
                        return (
                            <ReactTooltip place="bottom" effect="float" backgroundColor="black" textColor="white" >
                            </ReactTooltip>
                        );
                    }}
                    eventMouseEnter={this.hover}
                    eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    weekends={false}
                />
            </div>
        )
    }

    hover(info) {
        //console.log(events)
        info.el.setAttribute("data-tip", "ON LEAVE")
        ReactTooltip.rebuild();
    }

    handleDateSelect = (selectInfo) => {
        //console.log("Anish")
        Axios.post("http://localhost:3001/getLeaves", {
            eno: 1,
        }).then(response => {
            var res = response.data;
            res.map((value) => {
                var title = value.emp_name;
                var start = value.start_date;
                var end = value.end_date;
                var t = new Date(end);
                t.setDate(t.getDate() + 1);
                let calendarApi = selectInfo.view.calendar
                if (res) {
                    calendarApi.addEvent({
                        title: title,
                        start: start,
                        end: t,
                        backgroundColor: "blue",
                        display: "background",
                        allDay: selectInfo.allDay
                    })
                }
            })

        })

    }
    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

}



export default CalendarLeaves;


// import React from 'react'
// import FullCalendar, { formatDate } from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import Axios from 'axios';
// import ReactTooltip from 'react-tooltip'
// import './calender.css'

// class CalendarLeaves extends React.Component {
//     state = {
//         count: 0,
//     }

//     render() {
//         return (
//             <div className='calendar'>
//                 <FullCalendar
//                     plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                     headerToolbar={{
//                         left: 'prev,next,today',
//                         center: 'title',
//                         right: 'dayGridMonth,timeGridWeek,timeGridDay'
//                     }}
//                     events={this.state.data}
//                     initialView='dayGridMonth'
//                     editable={true}
//                     selectMirror={true}
//                     select={this.handleDateSelect}
//                     eventContent={() => {
//                         return (
//                             <ReactTooltip place="bottom" effect="float" backgroundColor="black" textColor="white" >
//                             </ReactTooltip>
//                         );
//                     }}
//                     eventMouseEnter={this.hover}
//                     weekends={false}
//                     events={this.state.data}
//                 />
//             </div>
//         )
//     }


//     componentDidMount() {
//         this.handleDateSelect()
//     }

//     componentDidUpdate(prevState) {
//         // if (this.state.count != prevState.count) {
//         // this.handleDateSelect()
//         console.log(prevState.count)
//         console.log("Update")
//     }

//     hover(info) {
//         info.el.setAttribute("data-tip", "YOU ARE ON LEAVE HERE!")
//         ReactTooltip.rebuild();
//     }

//     handleDateSelect = () => {
//         console.log(this.state.count)
//         var array;
//         Axios.post("http://localhost:3001/getLeaves", {
//             eno: 1,
//         }).then(response => {

//             if (this.state.count == 0)
//                 array = []
//             else
//                 array = this.state.data

//             var res = response.data;

//             res.map((value) => {
//                 var title = value.emp_name;
//                 var start = value.start_date;

//                 var end = value.end_date;
//                 var t = new Date(end);
//                 t.setDate(t.getDate() + 1);
//                 console.log(end)
//                 array.push({ title: title, start: start, end: t, backgroundColor: "blue", display: "background" })
//             })
//             this.setState({
//                 data: array,
//                 count: this.state.count + 1,
//             })
//         })

//     }

// }
// export default CalendarLeaves;