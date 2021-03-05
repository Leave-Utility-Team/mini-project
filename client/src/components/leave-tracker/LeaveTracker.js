import React, { useState, useEffect } from 'react';
import moment from 'moment'
import './leaveTracker.css'
import SingleCalendar from 'react-single-calendar';
import Calendar from '../calender/calender';
import '../calender/calender.css'
function LeaveTracker() {

    let [date, filterDate] = useState('');
    let [isOpen, setOpen] = useState(false)
    let [show, setData] = useState('')
    useEffect(() => {
        //  sendLeave() // Fetch games when component is mounted

    }, [])

    const sendLeave = async () => {

        await fetch('http://localhost:3001/saveLeave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date, // Use your own property name / key
                empId: 1,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                //setData(show = res.json())
                alert(res.answer)
                window.location.reload();
            })
            .catch((err) => console.log('error'))
    }

    const AddLeaveEvent = () => {
        sendLeave();
        setOpen(isOpen = false);
        //alert(show)
    }


    return (
        // <div className="LeaveTracker">
        // <Calendar></Calendar>
        <div className="main-outer">

            <Calendar />

            { console.log(date)}


            <div className="calendar-box">
                <h4>{date[0]} - {date[1]}</h4>
                {isOpen === false &&
                    <button className="date-picker-buttons" onClick={() => setOpen(isOpen = true)}>Add</button>
                }

                { /*{isOpen === true && */}
                {/* <button class="date-picker-buttons" onClick={() => setOpen(isOpen = false)}>close</button> */}
                {/* } */}

                {isOpen === true &&
                    // <button class="date-picker-buttons" onClick={() => setOpen(isOpen = false)}>add leave</button>
                    <button class="date-picker-buttons" onClick={() => setOpen(isOpen = false)}>Close  &nbsp;</button>
                }

                {isOpen === true &&
                    <button class="date-picker-buttons" onClick={() => AddLeaveEvent()}>Add Leave</button>
                }

                {isOpen === true &&
                    <SingleCalendar selectedDate={filterDate} range={true} />
                }

            </div>




        </div >
    );
}
export default LeaveTracker
